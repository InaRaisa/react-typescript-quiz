// Author: Ina Räisänen
// 12.4.2024
// Following a FreeCodeCamp tutorial by Thomas Weibenfalk.

import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

// Defining a type called QuestionState which uses the previously defined types from Question and adding a property to it (an array of strings)
export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

// Fetching the questions from the API
export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  // Awaiting the fetch itself, and then awaiting that it's converted to json
  const data = await (await fetch(endpoint)).json();
  // Mapping through the fetched data, and specifying that the question is of the previously defined type "Question"
  return data.results?.map((question: Question) =>
    // Using curly brackets as we are returning an object
    // The "..." is ES6 syntax called "spreading", it's used to gather all the elements of an array or an object
    ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    })
  );
};
