export enum PlayerGrade {
  Elementary,
  Intermediate,
  Advanced,
  Ninja,
}

export interface Player {
  name: string
  grade: PlayerGrade
}
