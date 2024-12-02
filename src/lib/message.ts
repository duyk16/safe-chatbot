import { config } from '../config';
import * as log from './log';
import * as profanity from './profanity';
import * as classifier from './classifier';

export enum MessageType {
  UpdateUserId = 'UpdateUserId',
  CreateMessage = 'CreateMessage',
}

// Use global variable to store user ID
let userId: string = '';

/**
 * Update the user ID for the chatbot session.
 * @param newUserId - The new user ID.
 */
export function updateUserId(newUserId: string) {
  userId = newUserId;
}

/**
 * Create a chatbot response based on the user's message.
 * @param message - The user's message.
 * @returns
 */
export function createMessage(message: string) {
  // Log user input
  log.logUserInput(userId, message);

  let response = '';
  const result = config.IS_ENABLED_CLASSIFIER
    ? classifier.isDisallowedContent(message)
    : profanity.isDisallowedContent(message);

  // Check for disallowed words
  if (result) {
    response = config.BOT_MESSAGES.RESPONSE_DISALLOWED_CONTENT;
  } else {
    response = `${config.BOT_MESSAGES.RESPONSE_ALLOWED_CONTENT}${message}`;
  }

  // Log chatbot response
  console.log(response);
  log.logBotResponse(userId, response);

  return response;
}

export function handleMessage(type: MessageType, payload: string) {
  switch (type) {
    case MessageType.UpdateUserId: {
      return updateUserId(payload);
    }
    case MessageType.CreateMessage:
      return createMessage(payload);
    default:
      throw new Error('Invalid message type');
  }
}
