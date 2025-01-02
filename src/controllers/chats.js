import {
  createChat,
  deleteChat,
  getAllChats,
  getChatById,
  searchChatsByNameOrLastName,
  updateChat,
} from "../services/chats.js";
import createHttpError from "http-errors";

export const getChatsController = async (req, res) => {
  const { search } = req.query;

  let chats;
  if (search) {
    chats = await searchChatsByNameOrLastName(search);

    if (chats.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No chats found matching the search criteria.",
      });
    }
  } else {
    chats = await getAllChats();
  }

  res.json({
    status: 200,
    message: "Successfully found chats!",
    data: chats,
  });
};

export const getChatByIdController = async (req, res) => {
  const { chatId } = req.params;
  const chat = await getChatById(chatId);

  if (!chat) {
    throw createHttpError(404, "Chat not found");
  }

  res.json({
    status: 200,
    message: `Successfully found chat with id ${chatId}!`,
    data: chat,
  });
};

export const createChatController = async (req, res) => {
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    throw createHttpError(
      400,
      "Missing required fields: firstName or lastName"
    );
  }

  const chat = await createChat({
    firstName,
    lastName,
  });

  res.status(201).json({
    status: 201,
    message: `Successfully created a chat!`,
    data: chat,
  });
};

export const deleteChatController = async (req, res, next) => {
  const { chatId } = req.params;
  const chat = await deleteChat(chatId);

  if (!chat) {
    next(createHttpError(404, "Chat not found"));
    return;
  }

  res.status(204).send();
};

export const patchChatController = async (req, res, next) => {
  const { chatId } = req.params;
  const result = await updateChat(chatId, req.body);

  if (!result) {
    next(createHttpError(404, "Chat not found"));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a chat!`,
    data: result.chat,
  });
};
