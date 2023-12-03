import React, { useState } from "react";
import Player from "./Player";
import Game from "./Game";
import { PlayerGrade } from "../core/game";

const Start: React.FC = () => {
  const [isGameStarted, setGameStarted] = useState(false)
  const [playerName, setPlayerName] = useState("")
  const [playerGrade, setPlayerGrade] = useState(PlayerGrade.Elementary)
  const [playerScore, setPlayerScore] = useState(0)
  const [gameStartedAt, setGameStartedAt] = useState(new Date())

  const startGameFormSubmitHandler = () => {
    if (!playerName) {
      alert(`A player name is required`)
      return
    }

    if (!playerGrade) {
      alert(`Player grade is required`)
      return
    }

    console.log(`Starting game for ${playerName} at ${playerGrade}`)

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
