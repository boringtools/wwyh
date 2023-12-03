import { GameWordRepository, inMemoryGameWordRepository } from "./repository"

export enum PlayerGrade {
  Elementary = "Elementary",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Ninja = "Ninja",
}

export interface Player {
  name: string
  grade: PlayerGrade
}

export interface GameInput {
  player: Player
}

interface GameWordVerificationResult {
  match: boolean
  original: string
  validated: string
}

// The game engine returns this contract for a word
export interface GameVerifiableWord {
  wordAsString(): string
  point(): number
  wordValidate(input: string): GameWordVerificationResult
}

/**
 * The GAME!
 * 
 * The game is simple, it is initialized by fetching a list of words from a remote
 * source based on {PlayerGrade}. Subsequently it provides a "word" and takes an input
 * verifying if the output and the subsequent input words match without case sensitivity.
 * 
 * Game algorithm:
 * 
 * 1. Every word has an associated point
 * 2. Spelled correctly first time will get full point
 * 3. Every wrong spelling will reduce points by pentalty points
 * 4. Game will continue till a player correctly spells all words (learning is the objective)
 * 5. Highest score is when all words are spelled correctly in the first attempt
 */
export class GameEngine {
  private gameInput: GameInput
  private gameRepository: GameWordRepository
  
  constructor(input: GameInput) {
    this.gameInput = input
    this.gameRepository = inMemoryGameWordRepository()
  }

  async init(): Promise<void> {
    await this.gameRepository.init()
  }

  async isFinished(): Promise<boolean> {
    return (await this.gameRepository.count()) === 0
  }

  async nextWord(): Promise<GameVerifiableWord | null> {
    if (await this.isFinished()) {
      return null
    }

    const word = await this.gameRepository.random()
    console.log(`Game repository loaded: ${JSON.stringify(word)}`)

    return {
      wordAsString: () => word.word,
      point: () => word.points,
      wordValidate: (input): GameWordVerificationResult => {
        if (input === word.word) {
          this.gameRepository.delete(word)

          return {
            match: true,
            original: word.word,
            validated: input
          }
        } else {
          return {
            match: false,
            original: word.word,
            validated: input
          }
        }
      }
    }
  }
}