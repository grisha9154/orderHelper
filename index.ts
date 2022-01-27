import axios from "axios";
import { fireStore } from "./src/db-connection/firestore";

export const helloBot = (req, res) => {
  function sendMessage(options) {
    console.log("Start Send");
    const token = process.env.telegram_token;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    axios
      .post(url, {
        chat_id: options.chatId,
        text: options.answer,
      })
      .then(() => {
        res.send({ status: "OK" });
        console.log("Succes Send");
      })
      .catch(() => {
        res.send({ status: "OK" });
        console.log("Error Send");
      });
  }
  fireStore.initializePayload("data", "payload").then(() => {
    console.log('init fireStore');
  });
  const TgMessage = req.body.message;

  try {
    const options = {
      answer: TgMessage.text,
      chatId: TgMessage.chat.id,
    };
    sendMessage(options);
  } catch (error) {
    sendMessage({
      answer: "Error",
      chatId: TgMessage.chat.id,
    });
  }
};
