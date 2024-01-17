import React from "react";

export const Progress = ({
  index,
  questionLength,
  points,
  sumOfPoints,
  answer,
}) => {
  return (
    <header className="progress">
      <progress
        max={questionLength}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question {index + 1} / {questionLength}
      </p>
      <p>
        Points {points} / {sumOfPoints}
      </p>
    </header>
  );
};
