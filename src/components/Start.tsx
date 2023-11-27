import React, { useState } from "react";
import Player from "./Player";
import Game from "./Game";
import { PlayerGrade } from "../core/game.d";

const Start: React.FC = () => {
  const [isGameStarted, setGameStarted] = useState(false)
  const [playerName, setPlayerName] = useState("Jane Smith")
  const [playerGrade, setPlayerGrade] = useState(PlayerGrade.Elementary)

  const startGameFormSubmitHandler = () => {
    setGameStarted(true)
  }

  if (isGameStarted) {
    return <Game/>
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
