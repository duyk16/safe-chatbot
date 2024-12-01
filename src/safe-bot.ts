import * as readline from 'readline/promises';

import * as message from './lib/message';
import { BOT_MESSAGES } from './config';

/**
 * Main chatbot function for handling user input and generating responses.
 */
export async function startSafeBot(): Promise<void> {
  const rl = readline.createInterface(process.stdin, process.stdout);

  console.log(BOT_MESSAGES.WELCOME_MESSAGE);
  const userId = await rl.question(BOT_MESSAGES.REQUEST_USER_ID);

  message.handleMessage(message.MessageType.UpdateUserId, userId);

  while (true) {
    const userInput = await rl.question(BOT_MESSAGES.REQUEST_USER_INPUT);
    if (BOT_MESSAGES.END_SESSION_CODES.includes(userInput.toLowerCase())) {
      break;
    }

    message.handleMessage(message.MessageType.CreateMessage, userInput);
  }

  console.log(BOT_MESSAGES.END_SESSION);
  rl.close();
}
