import { intervalToDuration } from "date-fns";
import React, { useEffect, useState } from "react";
import { GameEngine, GameVerifiableWord, PlayerGrade } from "../core/game";
import GameWaitIcon from "./assets/wait-icon.png"
import GameUserIcon from "./assets/user-icon.png"
import GamePlayIcon from "./assets/play-icon.png"

interface GameInput {
  name: string
  grade: PlayerGrade
  startedAt: Date
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
  finishGame: () => Promise<void>
  gameEngine: GameEngine
}

enum InteractionState {
  NONE,
  WAITING_TO_SAY_WORD,
  WAITING_FOR_SPELLING_INPUT
}

const Game: React.FC<GameInput> = (input) => {
  const [timeElapsedAsString, setTimeElaspsedAsString] = useState("00:00:00")
  const [spelledWord, setSpelledWord] = useState("")
  const [word, setWord] = useState<GameVerifiableWord | null>()
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackSpelledWord, setFeedbackSpelledWord] = useState("")
  const [feedbackCorrectWord, setFeedbackCorrectWord] = useState("")
  const [interactionState, setInteractionState] = useState<InteractionState>(InteractionState.WAITING_TO_SAY_WORD)

  const finishGame = async() => {
    await input.finishGame()
  }

  const sayText = async (text: string) => {
    let speech = new SpeechSynthesisUtterance()

    speech.text = text
    speech.volume = 1
    speech.rate = 0.2
    speech.pitch = 1

    window.speechSynthesis.speak(speech)
  }

  const sayWord = async () => {
    console.log(`Time to say the word`)

    const word = await input.gameEngine.nextWord()
    if (word == null) {
      console.log(`No more words available`)
      await finishGame()

      return
    }

    setShowFeedback(false)
    setInteractionState(InteractionState.WAITING_FOR_SPELLING_INPUT)
    setWord(word!)
    sayText(word!.wordAsString())
  }

  const checkSpelling = async () => {
    if (word == null) {
      console.log(`No word available in state`)
      return
    }

    console.log(`Checking spelling: ${spelledWord}`)
    const result = word!.wordValidate(spelledWord)

    console.log(`Spelling verification: ${JSON.stringify(result)}`)
    if (result.match) {
      sayText("Correct")
      input.setScore(input.score + word!.point())
    } else {
      sayText("Incorrect")
      setShowFeedback(true)
      setFeedbackSpelledWord(spelledWord)
      setFeedbackCorrectWord(word!.wordAsString())
    }

    setSpelledWord("")
    setWord(null)
    setInteractionState(InteractionState.NONE)
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
              <img src={GameUserIcon}></img>
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
      {
        showFeedback ?
          <div className="flex h-32 p-5 flex-row mt-5 items-center bg-white shadow-lg">
            <div className="basis-1/2 text-left hidden md:block">
              <strong className="text-2xl mr-2">Correct Spelling</strong>
              <span className="basis-1/4 text-5xl text-right bg-green-300 p-5 shadow-md">{feedbackCorrectWord}</span>
            </div>
            <div className="basis-1/2 text-right hidden md:block">
              <strong className="text-2xl mr-2">Your Spelling</strong>
              <span className="basis-1/4 text-5xl text-right bg-red-300 p-5 shadow-md">{feedbackSpelledWord}</span>
            </div>
          </div> : null
      } 

      {/* Game area */}
      <div className="flex items-center flex-col bg-white shadow-lg mt-10 p-10 w-full">
        <div className="w-48 h-48 mb-5">
          <a href="#" onClick={sayWord}>
            { interactionState == InteractionState.NONE && <img src={GamePlayIcon} alt="Play Icon" /> }
            { interactionState == InteractionState.WAITING_TO_SAY_WORD && <img src={GamePlayIcon} alt="Play Icon" /> }
            { interactionState == InteractionState.WAITING_FOR_SPELLING_INPUT && <img src={GameWaitIcon} alt="Wait Icon" /> }
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
              value={spelledWord}
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