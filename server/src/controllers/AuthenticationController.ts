import { Request, Response } from "express";
import bcrypt from "bcrypt";

import database from "../database/connection";
import * as jwt from "../config/jwt";

interface User {
  id: number;
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  whatsapp?: string;
  bio?: string;
}

interface RequestWithUser extends Request {
  user?: User;
}

export default class UsersController {
  async login(request: Request, response: Response) {
    const credentials = request.headers.authorization;

    if (!credentials) {
      return response.send();
    }

    const [, hash] = credentials.split(" ");

    const [email, plainTextPassword] = Buffer.from(hash, "base64")
      .toString()
      .split(":");

    try {
      const user = await database("users").where({ email }).first();

      const isSamePassword =
        user && (await bcrypt.compare(plainTextPassword, user.password));

      if (!user || !isSamePassword) {
        return response.status(401).json({
          message: "Wrong email or password.",
        });
      }

      delete user.password;

      const token = jwt.sign({ user: user.id });

      return response.status(200).json({ user, token });
    } catch (error) {
      return response.status(400).json({
        message: "Unexpected error while logging in.",
      });
    }
  }

  async register(request: Request, response: Response) {
    const user = request.body;

    const saltRounds = 10;

    const encryptedPassword = await bcrypt.hash(user.password, saltRounds);

    user.password = encryptedPassword;

    try {
      const [createdUserId] = await database("users").insert(user);

      const createdUser = await database("users")
        .where({ id: createdUserId })
        .first();

      delete createdUser.password;

      const token = jwt.sign({ user: createdUser.id });

      return response.status(201).json({ createdUser, token });
    } catch (error) {
      if (error.errno === 19) {
        return response.status(409).json({
          message: "Email already registered.",
        });
      }

      return response.status(400).json({
        message: "Unexpected error while creating new user.",
      });
    }
  }

  async authentication(
    request: RequestWithUser,
    response: Response,
    next: Function
  ) {
    if (request.path !== "/register" && request.path !== "/login") {
      const credentials = request.headers.authorization;

      const [, token] = credentials ? credentials.split(" ") : [, ""];

      try {
        const userId = jwt.verify(token);

        const user = await database("users").where({ id: userId.user }).first();

        if (!user) {
          return response.status(401).send();
        }

        delete user.password;

        request.user = user;
      } catch (error) {
        return response.status(401).send();
      }
    }

    next();
  }

  me(request: RequestWithUser, response: Response) {
    return response.status(200).send(request.user);
  }
}
