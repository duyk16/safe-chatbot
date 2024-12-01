import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import * as message from '../message';

describe('message module', () => {
  beforeEach(() => {});

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe.only('updateUserId', () => {
    test('should update the userId', () => {
      const spy = vi.spyOn(message, 'updateUserId');

      message.updateUserId('newUserId');

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  // describe('createMessage', () => {
  //   it('should log user input and bot response', () => {
  //     isDisallowedContentStub.returns(false);
  //     const response = message.createMessage('hello');

  //     expect(logUserInputStub.calledOnce).to.be.true;
  //     expect(logBotResponseStub.calledOnce).to.be.true;
  //     expect(response).to.equal(
  //       `${BOT_MESSAGES.RESPONSE_ALLOWED_CONTENT}hello`,
  //     );
  //   });

  //   it('should return disallowed content message if message contains disallowed content', () => {
  //     isDisallowedContentStub.returns(true);
  //     const response = createMessage('badword');
  //     expect(logUserInputStub.calledOnce).to.be.true;
  //     expect(logBotResponseStub.calledOnce).to.be.true;
  //     expect(response).to.equal(BOT_MESSAGES.RESPONSE_DISALLOWED_CONTENT);
  //   });
  // });

  // describe('handleMessage', () => {
  //   it('should call updateUserId when message type is UpdateUserId', () => {
  //     const updateUserIdSpy = sinon.spy(updateUserId);
  //     handleMessage(MessageType.UpdateUserId, 'newUserId');
  //     expect(updateUserIdSpy.calledOnce).to.be.true;
  //   });

  //   it('should call createMessage when message type is CreateMessage', () => {
  //     const createMessageSpy = sinon.spy(createMessage);
  //     handleMessage(MessageType.CreateMessage, 'hello');
  //     expect(createMessageSpy.calledOnce).to.be.true;
  //   });

  //   it('should throw an error for invalid message type', () => {
  //     expect(() =>
  //       handleMessage('InvalidType' as MessageType, 'payload'),
  //     ).to.throw('Invalid message type');
  //   });
  // });
});
