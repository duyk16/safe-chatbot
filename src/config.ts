export const DEFAULT_DISALLOWED_WORDS = [
  'hack',
  'hacking',
  'scam',
  'scamming',
  'cheat',
  'cheating',
  'plagiarism',
  'stupid',
];

export const DEFAULT_LOG_PATH = 'logs/chatbot_log.txt';

export const BOT_MESSAGES = {
  WELCOME_MESSAGE:
    "Welcome to the chatbot! Type 'exit' or 'quit' to end the session.",
  REQUEST_USER_ID: 'Enter your User ID: ',
  REQUEST_USER_INPUT: 'Message: ',

  RESPONSE_DISALLOWED_CONTENT: `Chatbot: I'm sorry, but I can't assist with that request.`,
  RESPONSE_ALLOWED_CONTENT: `Chatbot: I hear you say: `,

  END_SESSION_CODES: ['exit', 'quit'],
  END_SESSION: 'Chatbot session ended.',
};

export * as config from './config';
