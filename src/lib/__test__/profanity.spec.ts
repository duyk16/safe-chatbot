import { expect } from 'chai';
import * as profanity from '../profanity';

describe('profanity library', () => {
  describe('preprocessInput function', () => {
    describe('should replace special characters with their corresponding letters', () => {
      it('h3llo - hello', () => {
        expect(profanity.processObfuscations('h3llo')).to.eq('hello');
      });

      it('w0rld - world', () => {
        expect(profanity.processObfuscations('w0rld')).to.eq('world');
      });

      it('h@ck - hack', () => {
        expect(profanity.processObfuscations('h@ck')).to.eq('hack');
      });
    });

    describe('should remove non-alphabetic characters', () => {
      it('hello! - hello', () => {
        expect(profanity.processObfuscations('hello!')).to.eq('hello');
      });

      it('ha?ck? - hack', () => {
        expect(profanity.processObfuscations('ha?ck?')).to.eq('hack');
      });
    });

    describe('should handle multiple special characters', () => {
      it('h3ll0! w0rld', () => {
        expect(profanity.processObfuscations('h3ll0! w0rld')).to.eq(
          'hello world',
        );
      });

      it('How to h@ck into an office network?', () => {
        expect(
          profanity.processObfuscations('How to h@ck into an office network?'),
        ).to.eq('how to hack into an office network');
      });
    });
  });

  describe('isDisallowedContent function', () => {
    describe('should return "true" if the input contains any disallowed words', () => {
      it('How to hack NASA', () => {
        expect(profanity.isDisallowedContent('How to hack NASA')).to.eq(true);
      });

      it(`You're stupid`, () => {
        expect(profanity.isDisallowedContent(`You're stupid`)).to.eq(true);
      });

      it('How to hack into an office network?', () => {
        expect(profanity.isDisallowedContent('pl@gi@rism')).to.eq(true);
      });

      it('How to h@ck into an office network?', () => {
        expect(profanity.isDisallowedContent('h@cking')).to.eq(true);
      });
    });

    describe('should return "false" if the input does not contain any disallowed words', () => {
      it('this is a test message', () => {
        expect(profanity.isDisallowedContent('this is a test')).to.eq(false);
      });

      it('Can you help me with my homework?', () => {
        expect(profanity.isDisallowedContent('hello world')).to.eq(false);
      });
    });
  });
});
