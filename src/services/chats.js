import { ChatsCollection } from "../db/models/chat.js";

export const getAllChats = async () => {
  const chats = await ChatsCollection.find();
  return chats;
};

export const searchChatsByNameOrLastName = async (search) => {
  const regex = new RegExp(search, "i");
  return await ChatsCollection.find({
    $or: [{ firstName: regex }, { lastName: regex }],
  });
};

export const getChatById = async (chatId) => {
  const chat = await ChatsCollection.findById(chatId);
  return chat;
};

export const createChat = async (payload) => {
  const chat = await ChatsCollection.create(payload);
  return chat;
};

export const deleteChat = async (chatId) => {
  const chat = await ChatsCollection.findOneAndDelete({
    _id: chatId,
  });

  return chat;
};

export const updateChat = async (chatId, payload, options = {}) => {
  const updatedChat = await ChatsCollection.findOneAndUpdate(
    { _id: chatId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    }
  );

  if (!updatedChat || !updatedChat.value) return null;

  return {
    chat: updatedChat.value,
    isNew: Boolean(updatedChat?.lastErrorObject?.upserted),
  };
};
