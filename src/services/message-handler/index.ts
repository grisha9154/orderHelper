import analyzer from "../analyzer";
import tokenHandler from "../token-handler";

const handelMessage = async (text: string) => {
  try {
    const tokens = analyzer.readLine(text);
    const answer = await tokenHandler.handle(tokens);

    return answer;
  } catch (error: any) {
    const message = `Ошибка! ${error.message}`;
    console.error(message);

    return message;
  }
};

export const messageService = {
  handelMessage,
};
