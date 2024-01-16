import React from "react";

export const NextButton = ({ dispatch, answer }) => {
  if (answer !== null) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        NextButton
      </button>
    );
  } else {
    return null;
  }
};
