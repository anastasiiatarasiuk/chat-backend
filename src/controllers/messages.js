import { getQuote } from "../services/quote.js";
import { getChatById } from "../services/chats.js";

export const sendMessageController = async (req, res) => {
  const { chatId } = req.params;
  const { text } = req.body;

  const chat = await getChatById(chatId);
  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  const message = {
    text,
    sender: "user",
    createdAt: new Date(),
  };
  chat.messages.push(message);

  await chat.save();

  setTimeout(async () => {
    const quote = await getQuote();

    const autoResponse = {
      text: quote,
      sender: "bot",
      createdAt: new Date(),
    };
    chat.messages.push(autoResponse);

    await chat.save();
  }, 3000);

  res.status(201).json({ message: "Message sent successfully", data: chat });
};
