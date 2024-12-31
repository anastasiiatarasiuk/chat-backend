import { ChatsCollection } from "../db/models/chat.js";

export const getAllChats = async () => {
  const chats = await ChatsCollection.find();
  return chats;
};

export const getChatById = async (chatId) => {
  const chat = await ChatsCollection.findById(chatId);
  return chat;
};
