import { PlayerGrade } from "./game"

export interface GameWord {
  word: string
  points: number
}

export interface GameWordRepository {
  init: () => Promise<void>
  random: () => Promise<GameWord>
  count: () => Promise<Number>
  getByIndex: (index: Number) => Promise<GameWord>
  delete: (word: GameWord) => Promise<void>
}

/**
 * Builds a words repository with hardcoded words for testing
 * @returns {GameWordRepository}
 */
export const inMemoryGameWordRepository = (): GameWordRepository => {
  let words = [
    "cat", "dog", "human", "monkey"
  ]

  const point = 10

  return {
    async init() {
      // Nothing required
    },
    async random() {
      return {
        word: words[Math.floor(Math.random() * words.length)],
        points: point
      }
    },
    async count() {
      return words.length
    },
    async getByIndex(index) {
      return {
        word: words[index.valueOf() % words.length],
        points: point
      }
    },
    async delete(word) {
      words = words.filter((w) => w !== word.word)
    }
  }
}