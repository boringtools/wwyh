import React, { useState } from "react";

const Start: React.FC = () => {
  const [name, setName] = useState("Jane Smith")
  const [grade, setGrade] = useState("")

  const handleStartGame = async (event: any) => {
    event.preventDefault()

    if ((!name) || (!grade)) {
      alert(`Name and Grade is required`)
    }

    console.log(`Starting game: ${name} ${grade}`)
  }

  return (
    <>
      <div className="p-6 mt-20 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <form onSubmit={handleStartGame}>
          <div className="space-y-12">
            <h1 className="text-4xl font-bold leading-7 text-gray-900">Ready Player One</h1>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="playerName" className="block text-2xl font-medium leading-6 text-gray-900">Player Name</label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="text" name="playerName" id="playerName"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-xl"
                      onChange={(e) => setName(e.target.value)}
                      placeholder={name} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="grade" className="block text-2xl font-medium leading-6 text-gray-900">Grade</label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <select name="grade" id="grade"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-xl"
                      onChange={(e) => setGrade(e.target.value)}>
                      <option value="grade-1">Grade-I</option>
                      <option value="grade-2">Grade-II</option>
                      <option value="grade-3">Grade-III</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid">
              <button type="submit"
                className="button p-6 bg-indigo-600 hover:bg-indigo-500 text-white text-2xl shadow-lg">
                Lets go!
              </button>
            </div>
          </div>
        </form>
      </div >
    </>
  )
}

export default Start
