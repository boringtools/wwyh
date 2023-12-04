import { FireIcon } from "@heroicons/react/24/outline"
import { PlayerGrade } from "../core/game"

interface GameResultInput {
  name: string
  grade: PlayerGrade
  points: number
}

const GameResult: React.FC<GameResultInput> = (input) => {
  return (
    <>
      <div className="flex flex-col w-full mt-20 items-center">
        <div className="p-5 bg-indigo-300">
          <h1 className="text-5xl">Game Finished!</h1>
        </div>
        <div className="p-5">
          <button className="bg-indigo-600 p-5 text-2xl text-white" onClick={(e) => window.location.assign("/")}>Start Again</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-rows-2 w-1/2 items-center bg-white rounded-xl shadow-lg p-5">
          <div>
            <h1 className="text-4xl">{input.name}</h1>
            <h2 className="text-3xl">{input.grade}</h2>
            <div className="mt-10 bg-gray-400 rounded-full mr-4">
              <img src="/user-icon.png"></img>
            </div>
          </div>
          <div>
            <div className="text-right">
              <strong className="text-2xl mr-2">Score</strong>
              <span className="text-5xl text-right bg-green-300 p-5 shadow-md">{input.points}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GameResult