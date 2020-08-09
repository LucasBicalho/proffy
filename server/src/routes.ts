import express from "express";
import database from "./database/connection";
import convertHourToMinutes from "./utils/convertHourToMinutes";

const routes = express.Router();

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

routes.post("/classes", async (request, response) => {
  const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;

  const transaction = await database.transaction();

  try {
    const insertedUsersIds = await transaction("users").insert({
      name,
      avatar,
      whatsapp,
      bio,
    });

    const user_id = insertedUsersIds[0];

    const insertedClassesIds = await transaction("classes").insert({
      subject,
      cost,
      user_id,
    });

    const class_id = insertedClassesIds[0];

    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
      return {
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to),
        class_id,
      };
    });

    await transaction("class_schedule").insert(classSchedule);

    await transaction.commit();

    return response.status(201).send();
  } catch (error) {
    await transaction.rollback();

    return response.status(400).json({
      error: "Unexpected error while creating new class",
    });
  }
});

export default routes;
