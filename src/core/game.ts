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

type GameOnStartFn = () => Promise<void>
type GameOnNextWordFn = (word:string) => Promise<void>
type GameOnScoreChangeFn = (score:Number) => Promise<void>
type GameOnTimeElapsedChangeFn = (elapsed:Date) => Promise<void>

export interface Game {
  onStart: GameOnStartFn
  onNext: GameOnNextWordFn
  onScore: GameOnScoreChangeFn
  onTime: GameOnTimeElapsedChangeFn

  start: () => void
  submit: (word:string) => void
}

/**
 * The GAME!
 * 
 * The game is simple, it is initialized by fetching a list of words from a remote
 * source based on {PlayerGrade}. Subsequently it provides a "word" and takes an input
 * verifying if the output and the subsequent input words match without case sensitivity.
 */