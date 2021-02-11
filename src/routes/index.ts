import express from "express";
import userRouter from "./user";

export default function initRoutes(app: express.Application) {
  app.use("/users", userRouter);
}
