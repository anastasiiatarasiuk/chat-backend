import express from "express";
import pino from "pino-http";
import cors from "cors";
import { getAllChats, getChatById } from "./services/chats.js";

const PORT = 3000;

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );

  app.get("/chats", async (req, res) => {
    const chats = await getAllChats();

    res.status(200).json({
      data: chats,
    });
  });

  app.get("/chats/:chatId", async (req, res) => {
    const { chatId } = req.params;
    const chat = await getChatById(chatId);

    if (!chat) {
      res.status(404).json({
        message: "Chat not found",
      });
      return;
    }

    res.status(200).json({
      data: chat,
    });
  });

  app.use("*", (req, res) => {
    res.status(404).json({
      message: "Not found",
    });
  });

  app.use((err, req, res) => {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
