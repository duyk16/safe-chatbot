import { expect } from 'chai';
import * as fs from 'fs';

import * as log from '../log';
import path from 'path';

const TEST_LOG_PATH = 'test-log/test.log';

describe('log library', () => {
  after(async () => {
    // remove the test log file
    if (fs.existsSync(TEST_LOG_PATH)) {
      fs.unlinkSync(TEST_LOG_PATH);
    }

    // remove the test log directory
    if (fs.existsSync(path.dirname(TEST_LOG_PATH))) {
      fs.rmdirSync(path.dirname(TEST_LOG_PATH));
    }
  });

  describe('createLog', () => {
    it('should create log directory and file if they do not exist', () => {
      const message = 'Hello, world!';

      log.createLog(message, { logPath: TEST_LOG_PATH });

      expect(fs.existsSync(TEST_LOG_PATH)).to.eq(true);
    });

    it('should append to the log file if it already exists', () => {
      const message1 = 'Hello, world!';
      const message2 = 'How are you?';

      log.createLog(message1, { logPath: TEST_LOG_PATH });
      log.createLog(message2, { logPath: TEST_LOG_PATH });

      const logContent = fs.readFileSync(TEST_LOG_PATH, 'utf8');
      expect(logContent).to.include(`${message1}`);
      expect(logContent).to.include(`${message2}`);
    });
  });

  describe('logUserInput', () => {
    it('should create a log entry for user input', async () => {
      const userId = 'test-user';
      const userInput = 'Hello, world!';
      log.logUserInput(userId, userInput, { logPath: TEST_LOG_PATH });

      const logContent = fs.readFileSync(TEST_LOG_PATH, 'utf8');
      expect(logContent).to.include(`user-id:${userId}`);
      expect(logContent).to.include(`input: ${userInput}`);
    });
  });

  describe('logBotResponse', () => {
    it('should create a log entry for bot response', async () => {
      const userId = 'test-user';
      const response = 'Hello, human!';
      log.logBotResponse(userId, response, { logPath: TEST_LOG_PATH });

      const logContent = fs.readFileSync(TEST_LOG_PATH, 'utf8');
      expect(logContent).to.include(`user-id:${userId}`);
      expect(logContent).to.include(`response: ${response}`);
    });
  });
});
