// Author: Ina Räisänen
// 12.4.2024
// Following a FreeCodeCamp tutorial by Thomas Weibenfalk.

import React from "react";
// Types
import { AnswerObject } from "../App";
// Styles
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

// Defining the props that this component will be expecting
// The type doesn't have to be named "Props"
type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

// Using React FC defines this constant with the type of a functional component
// The component will accept props of type "Props"
// The content of the constant is in JSX
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <Wrapper>
    {/* In JSX, the JavaScript variables are put inside curly brackets */}
    <p className="number">
      Question: {questionNr} / {totalQuestions}
    </p>
    {/* Rendering the question: We are using two curly brackets because "__html: question" is an object */}
    <p dangerouslySetInnerHTML={{ __html: question }} />
    {/* Wrapping the answers inside a div */}
    <div>
      {/* Mapping through the answers */}
      {answers?.map((answer) => (
        <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        >
          {/* If we have a UserAnswer, this button will be disabled*/}
          <button
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={callback}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default QuestionCard;
