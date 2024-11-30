import * as path from "path";
import * as fs from "fs";

const DEFAULT_LOG_PATH = "logs/chatbot_log.txt"

/**
 * Create a log entry in the specified log file.
 * @param message - The message to log.
 * @param logPath - The path to the log file.
 */
export async function createLog(message: string, logPath: string = DEFAULT_LOG_PATH) {
  const logFilePath = path.join(__dirname, logPath);
  fs.appendFileSync(logFilePath, message, "utf8");
}


/**
 * Log the user's input message to a file.
 * @param userId - The user ID.
 * @param userInput - The user's input message.
 */
export async function logUserInput(userId: string, userInput: string) {
  const logEntry = `${new Date().toISOString()} | user-id:${userId} | input: ${userInput}\n`;
  await createLog(logEntry);
}

/**
 * Log the chatbot's response to a file.
 * @param userId - The user ID.
 * @param response - The chatbot's response.
 */
export async function logBotResponse(userId: string, response: string) {
  const logEntry = `${new Date().toISOString()} | user-id:${userId} | response: ${response}\n`;
  await createLog(logEntry);
}
