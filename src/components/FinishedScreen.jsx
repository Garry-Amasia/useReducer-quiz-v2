import React from "react";

export const FinishedScreen = ({
  points,
  sumOfPoints,
  highscore,
  dispatch,
}) => {
  const percentage = (points / sumOfPoints) * 100;
  return (
    <>
      <p className="result">
        You score {points} out of {sumOfPoints} || {Math.ceil(percentage)}%
      </p>
      <p className="highscore">highscore -{highscore}-</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        restart quiz
      </button>
    </>
  );
};
