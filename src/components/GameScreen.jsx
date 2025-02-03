import React, { useContext, useRef, useState } from "react";
import { gameContext } from "../App";
import Timer from "./Timer";
import ReactConfetti from "react-confetti";
import { rightSound, wrongSound } from "../constant";

export default function GameScreen({ data }) {
  const time = new Date();
  const timeoutRef = useRef(null);
  time.setSeconds(time.getSeconds() + 60 * data.duration);
  const { gameStatus, setGameStatus, score, setScore } =
    useContext(gameContext);
  const questions = data.questions;
  const questionCount = data.questions_count;
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [disableButtons, setDisableButtons] = useState(false);
  const [isSelectedAnswerRight, setIsSelectedAnswerRight] = useState(false);

  const clickHandler = (isCorrect, optionId) => {
    if (isCorrect) {
      setIsSelectedAnswerRight(true);
      rightSound.play();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      timeoutRef.current = setTimeout(() => {
        setIsSelectedAnswerRight(false);
      }, 4200);
      setScore((pre) => pre + 1);
    } else {
      wrongSound.play();
    }

    setDisableButtons(true);
    setSelectedOptionId(optionId);
  };

  const nextQuestionHandler = () => {
    // question 10 > 10
    setSelectedOptionId(null);
    setIsSelectedAnswerRight(false);
    setDisableButtons(false);
    if (questionIndex < questionCount - 1) {
      setQuestionIndex((pre) => pre + 1);
    } else {
      setQuestionIndex(0);
      setGameStatus("Finished");
    }
  };

  const customButtomClass = (option) => {
    if (!disableButtons) return "border-neutral-200";

    if (option.id === selectedOptionId) {
      if (option.is_correct) return "bg-green-300";
      return "bg-red-300 border-neutral-200";
    }

    if (option.is_correct) return "border-green-300 border-3";
    else return "border-neutral-200";
  };

  if (gameStatus !== "Started") return;
  return (
    <div className="w-full">
      {disableButtons && isSelectedAnswerRight && <ReactConfetti />}
      <p className="mb-3">
        <span className="text-3xl font-semibold">
          {questionIndex + 1 < 10
            ? "0" + (questionIndex + 1)
            : questionIndex + 1}
        </span>
        /{questionCount}
      </p>
      <h1 className="font-semibold mb-4 text-xl leading-7">
        {questions[questionIndex].description}
      </h1>

      <div className="space-y-3">
        {questions[questionIndex].options.map((option, index) => (
          <button
            className={`p-2 font-semibold text-neutral-800 italic border rounded-xl text-lg block w-full text-left ${
              disableButtons
                ? "cursor-not-allowed"
                : "cursor-pointer hover:shadow-lg"
            } ${customButtomClass(option)}`}
            key={option.id}
            disabled={disableButtons}
            onClick={(e) => clickHandler(option.is_correct, option.id)}
          >
            <span>{index + 1}</span>. {option.description}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 text-neutral-700 px-2">
        <Timer expiryTime={time} />

        <h2 className="text-right text-lg font-semibold">Score : {score}</h2>
      </div>
      {disableButtons && (
        <button
          className="text-lg py-3 bg-black text-white font-semibold w-full rounded-lg mt-3 cursor-pointer active:scale-95"
          onClick={nextQuestionHandler}
        >
          Next question
        </button>
      )}
    </div>
  );
}