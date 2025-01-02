import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

export const isValidId = (req, res, next) => {
  const { chatId } = req.params;

  if (!isValidObjectId(chatId)) {
    throw createHttpError(400, "Bad Request");
  }

  next();
};
