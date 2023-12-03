import React, { useState } from "react";
import { GameEngine, PlayerGrade } from "../core/game";
import Game from "./Game";
import GameResult from "./GameResult";
import Player from "./Player";

const Start: React.FC = () => {
  const [isGameStarted, setGameStarted] = useState(false)
  const [isGameFinished, setGameFinished] = useState(false)
  const [playerName, setPlayerName] = useState("")
  const [playerGrade, setPlayerGrade] = useState(PlayerGrade.Elementary)
  const [playerScore, setPlayerScore] = useState(0)
  const [gameStartedAt, setGameStartedAt] = useState(new Date())

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gameEngine, setGameEngine] = useState(new GameEngine({
    player: {
      name: playerName,
      grade: playerGrade
    }
  }))

  const gameFinishHandler = async () => {
    setGameFinished(true)
    setGameStarted(false)
  }

  const startGameFormSubmitHandler = async () => {
    if (!playerName) {
      alert(`A player name is required`)
      return
    }

    if (!playerGrade) {
      alert(`Player grade is required`)
      return
    }

    console.log(`Starting game for ${playerName} at ${playerGrade}`)
    await gameEngine.init()

    setGameStartedAt(new Date())
    setGameStarted(true)
  }

  if (isGameStarted) {
    return (
      <Game
        name={playerName}
        grade={playerGrade}
        startedAt={gameStartedAt}
        score={playerScore}
        setScore={setPlayerScore}
        gameEngine={gameEngine}
        finishGame={gameFinishHandler}
      />
    )
  } else if (isGameFinished) {
    return (
      <GameResult
        name={playerName}
        grade={playerGrade}
        points={playerScore}
      />
    )
  } else {
    return (
      <Player
        name={playerName}
        setName={setPlayerName}
        grade={playerGrade}
        setGrade={setPlayerGrade}
        startGame={startGameFormSubmitHandler}
      />
    )
  }
}

export default Start
