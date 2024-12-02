import * as readline from 'readline/promises';

import * as message from './lib/message';
import { config } from './config';

/**
 * Main chatbot function for handling user input and generating responses.
 */
export async function startSafeBot(): Promise<void> {
  const rl = readline.createInterface(process.stdin, process.stdout);

  console.log(config.BOT_MESSAGES.WELCOME_MESSAGE);
  const userId = await rl.question(config.BOT_MESSAGES.REQUEST_USER_ID);

  // Update the user ID in the message module
  message.handleMessage(message.MessageType.UpdateUserId, userId);

  while (true) {
    const userInput = await rl.question(config.BOT_MESSAGES.REQUEST_USER_INPUT);
    if (
      config.BOT_MESSAGES.END_SESSION_CODES.includes(userInput.toLowerCase())
    ) {
      break;
    }

    // Handle the user input
    message.handleMessage(message.MessageType.CreateMessage, userInput);
  }

  console.log(config.BOT_MESSAGES.END_SESSION);
  rl.close();
}
