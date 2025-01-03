import express from "express";
import pino from "pino-http";
import cors from "cors";
import chatsRouter from "./routers/chats.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { swaggerDocs } from "./middlewares/swaggerDocs.js";

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

  app.use(chatsRouter);

  app.use("/api-docs", swaggerDocs());

  app.use("*", notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
