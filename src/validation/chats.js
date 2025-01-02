import Joi from "joi";

export const createChatsSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
});

export const updateChatsSchema = Joi.object({
  firstName: Joi.string().min(3).max(30),
  lastName: Joi.string().min(3).max(30),
});
