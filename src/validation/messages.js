import Joi from "joi";

export const createMessageSchema = Joi.object({
  text: Joi.string().min(3).required(),
});
