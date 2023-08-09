enum PlayerGrade {
  Elementary,
  Intermediate,
  Advanced,
  Ninja,
}

interface Player {
  name: string
  grade: PlayerGrade
}

enum ScoreExtraType {
  Brownie
}

interface Score {
  addPoint(point:number)
  addExtra(type:ScoreExtraType, point:number)
  getPoints(): number
  getExtas(): Record<ScoreExtraType, number>
}

interface WordRepository {
  findWordsByGrade(grade:PlayerGrade): Array<string>
}

interface Game {
  async Start()
  async Stop()

  async NextWord(): string
  async Evaluate(word:string)
}
