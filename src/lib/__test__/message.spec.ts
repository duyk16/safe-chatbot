import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import * as log from '../log';
import * as message from '../message';
import * as profanity from '../profanity';

describe('message module', () => {
  beforeEach(() => {});

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('updateUserId', () => {
    test('should update the userId', () => {
      const spy = vi.spyOn(message, 'updateUserId');

      message.updateUserId('newUserId');

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('createMessage', () => {
    test('should return original content message if message not contains disallowed content', () => {
      const logUserInputSpy = vi
        .spyOn(log, 'logUserInput')
        .mockImplementation(() => {});
      const logBotResponseSpy = vi
        .spyOn(log, 'logBotResponse')
        .mockImplementation(() => {});
      const isDisallowedContentSpy = vi
        .spyOn(profanity, 'isDisallowedContent')
        .mockReturnValue(false);

      message.createMessage('hello');
      const response = message.createMessage('hello');

      expect(logUserInputSpy).toHaveBeenCalled();
      expect(logBotResponseSpy).toHaveBeenCalled();
      expect(isDisallowedContentSpy).toHaveBeenCalled();
      expect(response).toBe('Chatbot: I hear you say: hello');
    });

    test('should return disallowed content message if message contains disallowed content', () => {
      const logUserInputSpy = vi
        .spyOn(log, 'logUserInput')
        .mockImplementation(() => {});
      const logBotResponseSpy = vi
        .spyOn(log, 'logBotResponse')
        .mockImplementation(() => {});
      const isDisallowedContentSpy = vi
        .spyOn(profanity, 'isDisallowedContent')
        .mockReturnValue(true);

      message.createMessage('hello');
      const response = message.createMessage('hello');

      expect(logUserInputSpy).toHaveBeenCalled();
      expect(logBotResponseSpy).toHaveBeenCalled();
      expect(isDisallowedContentSpy).toHaveBeenCalled();
      expect(response).toBe(
        `Chatbot: I'm sorry, but I can't assist with that request.`,
      );
    });
  });
});
