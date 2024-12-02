import natural from 'natural';

import { config } from '../config';

const classifier = new natural.BayesClassifier();

const TRAINING_DATA = [
  ["You're a stupid!", '1'],
  ["You're brilliant!", '0'],
  ['I admire your work', '0'],
  ['Hello', '0'],
  ['Good morning', '0'],
  ['Could you help me with my homework', '0'],
  ['How to apply to NASA', '0'],
];

config.DEFAULT_DISALLOWED_WORDS.forEach((word) => {
  // Examples with offensive intent
  TRAINING_DATA.push([word, '1']);
  TRAINING_DATA.push([`I ${word} you`, '1']);
  TRAINING_DATA.push([`I want to ${word} you`, '1']);
  TRAINING_DATA.push([`How to ${word} NASA`, '1']);

  // Examples with neutral or positive intent
  TRAINING_DATA.push([`Avoid ${word} in your work`, '0']);
  TRAINING_DATA.push([`You should avoid ${word}`, '0']);
  TRAINING_DATA.push([`I want to play with you`, '0']);
  TRAINING_DATA.push([`How to learn english`, '0']);

  // Example with a ofuscated word
  TRAINING_DATA.push([`${word.split('').join(' ')}`, '1']); // Spacing
  TRAINING_DATA.push([`I ${word.replace(/a/g, '@')} you`, '1']); // Replace 'a' with '@'
  TRAINING_DATA.push([`How to ${word.replace(/a/g, '@')} you`, '1']); // Replace 'a' with '@'
  TRAINING_DATA.push([`${word[0]}*${word.slice(2)}`, '1']); // Replace part of the word with '*'
  TRAINING_DATA.push([`${word.split('').join('.')}`, '1']); // Insert '.' between characters
});

TRAINING_DATA.forEach(([text, result]) => {
  classifier.addDocument(text, result);
});

classifier.train();

export function isDisallowedContent(text: string): boolean {
  return classifier.classify(text) === '1';
}

export default classifier;
