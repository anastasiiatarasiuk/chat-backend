import { Router } from "express";
import {
  createChatController,
  deleteChatController,
  getChatByIdController,
  getChatsController,
  patchChatController,
} from "../controllers/chats.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createChatsSchema, updateChatsSchema } from "../validation/chats.js";
import { isValidId } from "../middlewares/isValidId.js";
import { sendMessageController } from "../controllers/messages.js";
import { createMessageSchema } from "../validation/messages.js";

const router = Router();

router.get("/chats", ctrlWrapper(getChatsController));

router.get("/chats/:chatId", isValidId, ctrlWrapper(getChatByIdController));

router.post(
  "/chats",
  validateBody(createChatsSchema),
  ctrlWrapper(createChatController)
);

router.delete(
  "/chats/:chatId",
  isValidId,
  validateBody(updateChatsSchema),
  ctrlWrapper(deleteChatController)
);

router.patch("/chats/:chatId", isValidId, ctrlWrapper(patchChatController));

router.post(
  "/chats/:chatId/messages",
  isValidId,
  validateBody(createMessageSchema),
  ctrlWrapper(sendMessageController)
);

export default router;
