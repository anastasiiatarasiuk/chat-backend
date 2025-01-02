import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  text: { type: String, required: true },
  sender: { type: String, enum: ["user", "bot"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const chatsSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    messages: [messageSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ChatsCollection = model("chats", chatsSchema);
