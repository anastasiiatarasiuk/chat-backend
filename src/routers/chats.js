import { Router } from "express";
import {
  createChatController,
  deleteChatController,
  getChatByIdController,
  getChatsController,
  patchChatController,
} from "../controllers/chats.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get("/chats", ctrlWrapper(getChatsController));

router.get("/chats/:chatId", ctrlWrapper(getChatByIdController));

router.post("/chats", ctrlWrapper(createChatController));

router.delete("/chats/:chatId", ctrlWrapper(deleteChatController));

router.patch("/chats/:chatId", ctrlWrapper(patchChatController));

export default router;
