import { wordList } from './wordlist';

/**
 * Generates a memorable phrase from a hash
 * The phrase consists of two words
 * @param hash - The hash to generate a phrase from
 * @returns A two-word phrase
 */
export function generatePhrase(hash: string): string {
  const index1 = Number.parseInt(hash.substring(0, 4), 16) % wordList.length;
  const index2 = Number.parseInt(hash.substring(4, 8), 16) % wordList.length;
  return `${wordList[index1]} ${wordList[index2]}`;
}