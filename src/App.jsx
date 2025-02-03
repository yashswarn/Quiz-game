import React, { createContext, useEffect, useState } from "react";
import quizData from "./constant";
import StartingScreen from "./components/StartingScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";

export const gameContext = createContext();
export default function App() {
  // Provided api is not working for local host giving cors error

  // useEffect(()=>{
  //   fetch('https://api.jsonserve.com/Uw5CrX')
  //      .then(res=>res.json())
  //      .then(data=>console.log(data))
  // }, [])

  // game context

  const [gameStatus, setGameStatus] = useState("Not Started");
  const [score, setScore] = useState(0);
  return (
    <gameContext.Provider value={{ gameStatus, setGameStatus, score, setScore}}>
      <section className="flex items-center justify-center h-screen bg-neutral-100">
        <main className="w-[90%] bg-white mx-auto sm:w-[550px] rounded shadow-[17px_17px_6px_0px_rgba(0,_0,_0,_0.1)] border border-neutral-200 py-4 px-6">
        <StartingScreen data={quizData} />
        <GameScreen data={quizData}/>
        <ResultScreen/>
        </main>
      </section>
    </gameContext.Provider>
  );
}