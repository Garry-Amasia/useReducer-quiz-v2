import React from "react";

export const NextButton = ({
  dispatch,
  answer,
  currentIndex,
  questionLength,
}) => {
  if (answer === null) return null;

  if (currentIndex < questionLength - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        NextButton
      </button>
    );
  }

  if (currentIndex === questionLength - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        finish
      </button>
    );
  }

  //   if (answer !== null && currentIndex < questionLength) {
  //     return (
  //       <button
  //         className="btn btn-ui"
  //         onClick={() => dispatch({ type: "nextQuestion" })}
  //       >
  //         NextButton
  //       </button>
  //     );
  //   } else if (answer === null) {
  //     return null;
  //   } else {
  //     return <p>haha</p>;
  //   }
};
