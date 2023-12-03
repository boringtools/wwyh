import React, { useState } from "react";
import Player from "./Player";
import Game from "./Game";
import { GameEngine, PlayerGrade } from "../core/game";

const Start: React.FC = () => {
  const [isGameStarted, setGameStarted] = useState(false)
  const [playerName, setPlayerName] = useState("")
  const [playerGrade, setPlayerGrade] = useState(PlayerGrade.Elementary)
  const [playerScore, setPlayerScore] = useState(0)
  const [gameStartedAt, setGameStartedAt] = useState(new Date())
  const [gameEngine, setGameEngine] = useState(new GameEngine({
    player: {
      name: playerName,
      grade: playerGrade
    }
  }))

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
        gameEngine={gameEngine}
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
