import * as path from 'path';
import * as fs from 'fs';

import { DEFAULT_LOG_PATH } from '../config';

/**
 * Create a log entry in the specified log file.
 * @param message - The message to log.
 * @param logPath - The path to the log file.
 */
export function createLog(
  message: string,
  opts = { logPath: DEFAULT_LOG_PATH },
) {
  const logFilePath = path.join(process.cwd(), opts.logPath);

  // Check if the log file exists
  if (!fs.existsSync(logFilePath)) {
    const logDir = path.dirname(logFilePath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Create the log file
    fs.writeFileSync(logFilePath, '', 'utf8');
  }

  fs.appendFileSync(logFilePath, message, 'utf8');
}

/**
 * Log the user's input message to a file.
 * @param userId - The user ID.
 * @param userInput - The user's input message.
 */
export function logUserInput(
  userId: string,
  userInput: string,
  opts = { logPath: DEFAULT_LOG_PATH },
) {
  const logEntry = `${new Date().toISOString()} | user-id:${userId} | input: ${userInput}\n`;
  createLog(logEntry, opts);
}

/**
 * Log the chatbot's response to a file.
 * @param userId - The user ID.
 * @param response - The chatbot's response.
 */
export function logBotResponse(
  userId: string,
  response: string,
  opts = { logPath: DEFAULT_LOG_PATH },
) {
  const logEntry = `${new Date().toISOString()} | user-id:${userId} | response: ${response}\n`;
  createLog(logEntry, opts);
}
