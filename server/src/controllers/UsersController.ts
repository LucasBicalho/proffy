import { Request, Response } from "express";
import bcrypt from "bcrypt";

import database from "../database/connection";

export default class UsersController {
  async index(request: Request, response: Response) {}

  async create(request: Request, response: Response) {
    const { email, password, first_name, last_name } = request.body;

    const saltRounds = 10;

    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    console.log({ encryptedPassword, type: typeof encryptedPassword });
    console.log({ password, type: typeof password });

    const transaction = await database.transaction();

    try {
      await transaction("users").insert({
        email,
        password: encryptedPassword,
        first_name,
        last_name,
      });

      await transaction.commit();

      return response.status(201).send();
    } catch (error) {
      await transaction.rollback();

      return response.status(400).json({
        message: "Unexpected error while creating new user.",
        error,
      });
    }
  }
}
