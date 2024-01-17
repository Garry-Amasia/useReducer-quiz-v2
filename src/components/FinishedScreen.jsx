import React from "react";

export const FinishedScreen = ({ points, sumOfPoints }) => {
  const percentage = (points / sumOfPoints) * 100;
  return (
    <p className="result">
      You score {points} out of {sumOfPoints} || {Math.ceil(percentage)}%
    </p>
  );
};
