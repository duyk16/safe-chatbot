import { WordTokenizer } from 'natural';
import { DEFAULT_DISALLOWED_WORDS } from '../config';

// Tokenizer to break input into words
const tokenizer = new WordTokenizer();

/**
 * Preprocess the input string by replacing special characters.
 * @param str - The input string.
 * @returns
 */
export function processObfuscations(input: string): string {
  const replacements: { [key: string]: string } = {
    '@': 'a',
    '4': 'a',
    '3': 'e',
    '1': 'i',
    '0': 'o',
    $: 's',
  };

  // Replace special characters
  return (
    input
      .toLowerCase()
      // Replace obfuscations
      .replace(/[@4310$]/g, (char) => replacements[char] || char)
      // Remove non-alphabetic characters, keep spaces
      .replace(/[^a-z\s]/g, '')
  );
}

/**
 * Check if the input contains any disallowed words.
 * @param input - The user's input message.
 * @param disallowedWords - An array of disallowed words.
 * @returns - True if the input contains any disallowed words, false otherwise.
 */
export function isDisallowedContent(
  input: string,
  disallowedWords: string[] = DEFAULT_DISALLOWED_WORDS,
): boolean {
  const str = processObfuscations(input);
  const tokens = tokenizer.tokenize(str.toLowerCase());

  return disallowedWords.some((word) => tokens.includes(word));
}
