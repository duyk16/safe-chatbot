import { describe, test, expect, vi, afterEach, beforeEach } from 'vitest';
import * as readline from 'readline/promises';
import * as fs from 'fs';
import * as path from 'path';

import { startSafeBot } from '../src/safe-bot';
import { config } from '../src/config';

vi.mock('readline/promises');

describe('CLI Chatbot E2E Test', () => {
  const TEST_LOG_PATH = path.join(__dirname, `../${config.DEFAULT_LOG_PATH}`);

  const rl = {
    question: vi.fn(),
    close: vi.fn(),
  };

  beforeEach(() => {
    vi.spyOn(readline, 'createInterface').mockReturnValue(
      rl as unknown as readline.Interface,
    );

    // Ensure the log file is clean before each test
    if (fs.existsSync(TEST_LOG_PATH)) {
      fs.unlinkSync(TEST_LOG_PATH);
    }
  });

  afterEach(() => {
    // Clean up log file after each test
    if (fs.existsSync(TEST_LOG_PATH)) {
      fs.unlinkSync(TEST_LOG_PATH);
    }
  });

  describe('should handle valid user input and log interactions', async () => {
    test(`Input commands: '123456', 'Hello, chatbot!', 'quit'`, async () => {
      // Simulate user input
      const userInputs = ['123456', 'Hello, chatbot!', 'quit'];
      rl.question.mockImplementation(async () => {
        return userInputs.shift();
      });

      // Run the safe bot
      await startSafeBot();

      // Assert log file content
      const logContent = fs.readFileSync(TEST_LOG_PATH, 'utf8');
      expect(logContent).toContain(`user-id: 123456 | input: Hello, chatbot!`);
      expect(logContent).toContain(
        `user-id: 123456 | response: Chatbot: I hear you say: Hello, chatbot!`,
      );
    });

    test(`Input commands: '123456', 'Can you help me with my homework?', 'quit'`, async () => {
      // Simulate user input
      const userInputs = [
        '123456',
        'Can you help me with my homework?',
        'quit',
      ];
      rl.question.mockImplementation(async () => {
        return userInputs.shift();
      });

      // Run the safe bot
      await startSafeBot();

      // Assert log file content
      const logContent = fs.readFileSync(TEST_LOG_PATH, 'utf8');
      expect(logContent).toContain(
        `user-id: 123456 | input: Can you help me with my homework?`,
      );
      expect(logContent).toContain(
        `user-id: 123456 | response: Chatbot: I hear you say: Can you help me with my homework?`,
      );
    });
  });

  describe('should handle disallowed words and log appropriately', async () => {
    test(`Input commands: '123456', 'You're stupid', 'quit'`, async () => {
      // Simulate user input
      const userInputs = ['123456', `You're stupid`, 'quit'];
      rl.question.mockImplementation(async () => {
        return userInputs.shift();
      });

      // Run the safe bot
      await startSafeBot();

      // Assert log file content
      const logContent = fs.readFileSync(TEST_LOG_PATH, 'utf8');
      expect(logContent).toContain(`user-id: 123456 | input: You're stupid`);
      expect(logContent).toContain(
        `user-id: 123456 | response: Chatbot: I'm sorry, but I can't assist with that request.`,
      );
    });

    test(`Input commands: '123456', 'How to hack into an office network?', 'quit'`, async () => {
      // Simulate user input
      const userInputs = [
        '123456',
        'How to hack into an office network?',
        'quit',
      ];
      rl.question.mockImplementation(async () => {
        return userInputs.shift();
      });

      // Run the safe bot
      await startSafeBot();

      // Assert log file content
      const logContent = fs.readFileSync(TEST_LOG_PATH, 'utf8');
      expect(logContent).toContain(
        `user-id: 123456 | input: How to hack into an office network?`,
      );
      expect(logContent).toContain(
        `user-id: 123456 | response: Chatbot: I'm sorry, but I can't assist with that request.`,
      );
    });

    test(`Input commands: '123456', 'How to h@ck into an office network?', 'quit'`, async () => {
      // Simulate user input
      const userInputs = [
        '123456',
        'How to h@ck into an office network?',
        'quit',
      ];
      rl.question.mockImplementation(async () => {
        return userInputs.shift();
      });

      // Run the safe bot
      await startSafeBot();

      // Assert log file content
      const logContent = fs.readFileSync(TEST_LOG_PATH, 'utf8');
      expect(logContent).toContain(
        `user-id: 123456 | input: How to h@ck into an office network?`,
      );
      expect(logContent).toContain(
        `user-id: 123456 | response: Chatbot: I'm sorry, but I can't assist with that request.`,
      );
    });
  });

  describe('should exit chatbot when user types "quit" or "exit"', async () => {
    test(`Input commands: '123456', 'quit'`, async () => {
      // Simulate user input
      const userInputs = ['123456', 'quit'];
      rl.question.mockImplementation(async () => {
        return userInputs.shift();
      });

      const logSpy = vi.spyOn(console, 'log');

      // Run the safe bot
      await startSafeBot();

      expect(logSpy).toHaveBeenCalledWith('Chatbot session ended.');
    });

    test(`Input commands: '123456', 'exit'`, async () => {
      // Simulate user input
      const userInputs = ['123456', 'exit'];
      rl.question.mockImplementation(async () => {
        return userInputs.shift();
      });

      const logSpy = vi.spyOn(console, 'log');

      // Run the safe bot
      await startSafeBot();

      expect(logSpy).toHaveBeenCalledWith('Chatbot session ended.');
    });
  });
});
