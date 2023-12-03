import { PlayerGrade } from "./game"

export interface GameWordRepository {
  init: () => Promise<void>
  random: () => Promise<string>
  count: () => Promise<Number>
  getByIndex: (index: Number) => Promise<string>
}

/**
 * Builds a words repository with hardcoded words for testing
 * @returns {GameWordRepository}
 */
export const inMemoryGameWordRepository = (): GameWordRepository => {
  const words = [
    "cat", "dog", "human", "monkey"
  ]

  return {
    async init() {
      // Nothing required
    },
    async random() {
      return words[(Math.random() * 1000) % words.length]
    },
    async count() {
      return words.length
    },
    async getByIndex(index) {
      return words[index.valueOf() % words.length]
    },
  }
}