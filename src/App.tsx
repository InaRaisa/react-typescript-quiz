// Author: Ina Räisänen
// 12.4.2024
// Following a FreeCodeCamp tutorial by Thomas Weibenfalk.

import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
// Components
import QuestionCard from "./components/QuestionCard";
// Types
import { QuestionState, Difficulty } from "./API";
// Styles
import { GlobalStyle, Wrapper } from "./App.styles";

// Creating a type AnswerObject
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  // Setting initial states using React Hooks
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]); // An array of the type "QuestionState" with an initial value of an empty array
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]); // An array of the type "AnswerObject" with an initial value of an empty array
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  // Starting the quiz
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false); // When the game starts, it's not game over yet

    // Fetching questions from the API endpoint with the difficulty of easy
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    // Setting the starting values
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false); // App is not loading anymore
  };

  // Checking if the answer is correct. This method takes in a parameter of type "MouseEvent" (a mouse event of type HTML Button element)
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Checking the user's answer against the correct answer
      const correct = questions[number].correct_answer === answer;
      // If the answer is correct, we add +1 to the score (prev here refers to the current state)
      if (correct) setScore((prev) => prev + 1);
      // Saving the user's answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  // If we're not at the last question, we're moving on to the next question
  const nextQuestion = () => {
    // The question we're currently at is equal to the value of "number"
    console.log(number);
    const nextQuestion = number + 1;
    // If the next question is equal to the value of total_questions, we are at the last question, as the initial value of number was 0
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      {/* Using a wrapper to link the styles from App.styles.ts*/}
      <Wrapper>
        <h1>REACT QUIZ</h1>

        {/* If the game is over, we show the start quiz button*/}
        {gameOver ? (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        ) : null}

        {/* If the user has answered all the questions, we show the start again button*/}
        {userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startQuiz}>
            Start Again
          </button>
        ) : null}

        {/* If the game is not over, we show the score*/}
        {!gameOver ? <p className="score">Score: {score}</p> : null}

        {/* If the game is loading, we show the loading text*/}
        {loading && <p>Loading Questions ...</p>}

        {/* If the game is not loading nor over, we show the question card*/}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {/* If the game is not over OR loading AND the user has given an answer
      AND we're not at the last question, we show the next question button*/}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
