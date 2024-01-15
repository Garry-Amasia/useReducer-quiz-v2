import React from "react";

const StartScreen = ({ questionsLength, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome to React Quiz</h2>
      <h3>{questionsLength} questions to test your React skills</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "active" })}
      >
        lets begin
      </button>
    </div>
  );
};

export default StartScreen;
