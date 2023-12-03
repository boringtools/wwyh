import React, { useEffect, useState } from "react";
import { PlayerGrade } from "../core/game";
import { formatDistance, intervalToDuration } from "date-fns";

interface GameInput {
  name: string
  grade: PlayerGrade
  startedAt: Date
  score: number
}

const Game: React.FC<GameInput> = (input) => {
  const [timeElapsedAsString, setTimeElaspsedAsString] = useState("00:00:00")
  const [spelledWord, setSpelledWord] = useState("")

  const sayWord = () => {
    console.log(`Time to say the word`)

    let speech = new SpeechSynthesisUtterance()

    speech.text = "Sea"
    speech.volume = 1
    speech.rate = 0.2
    speech.pitch = 1

    window.speechSynthesis.speak(speech)
  }

  const checkSpelling = () => {
    console.log(`Checking spelling: ${spelledWord}`)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const intervalDuration = intervalToDuration({
        start: input.startedAt,
        end: Date.now()
      })

      setTimeElaspsedAsString(`
        ${intervalDuration.hours?.toString().padStart(2, "0")}:
        ${intervalDuration.minutes?.toString().padStart(2, "0")}:
        ${intervalDuration.seconds?.toString().padStart(2, "0")}
      `)
    }, 1000)

    return () => clearInterval(interval)
  }, [timeElapsedAsString])

  return (
    <>
      {/* Top player info and scope */}
      <div className="flex h-32 p-5 flex-row mt-20 items-center bg-white shadow-lg">
        <div className="basis-1/4 text-left">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-400 rounded-full mr-4">
              <img src="/user-icon.png"></img>
            </div>
            <div>
              <p className="text-xl font-semibold mr-5">{input.name}</p>
              <p className="text-sm text-grady-500 font-semibold">{input.grade}</p>
            </div>
          </div>
        </div>

        <div className="basis-1/2 text-right hidden md:block">
          <strong className="text-2xl mr-2">Time Elapsed</strong>
          <span className="basis-1/4 text-5xl text-right bg-gray-300 p-5 shadow-md">{timeElapsedAsString}</span>
        </div>

        <div className="basis-1/4 text-right">
          <strong className="text-2xl mr-2">Score</strong>
          <span className="basis-1/4 text-5xl text-right bg-gray-300 p-5 shadow-md">{input.score}</span>
        </div>
      </div>

      {/* Feedback area */}
      <div className="flex h-32 p-5 flex-row mt-5 items-center bg-white shadow-lg">

      </div>

      {/* Game area */}
      <div className="flex items-center flex-col bg-white shadow-lg mt-10 p-10 w-full">
        <div className="w-48 h-48 mb-5">
          <a href="#" onClick={sayWord}>
            <img src="/play-icon.png" alt="" />
          </a>
        </div>
        <div className="w-1/2 items-center">
          <form onSubmit={(e) => {
            checkSpelling()
            e.preventDefault()
          }}>
            <input type="text"
              className="text-3xl text-center shadow-lg w-full border-2 border-indigo-200"
              name="answer"
              onChange={(e) => setSpelledWord(e.target.value)}
              placeholder="Type your answer here.."
            />
            <div className="flex flex-col items-center">
              <button className="bg-indigo-700 text-white font-semi-bold p-2 mt-5 w-1/2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Game