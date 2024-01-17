import React from "react";

export const Options = ({ question, dispatch, answer }) => {
  //   console.log(answer);
  const hasAnswer = answer !== null;

  //information
  //"answer" class => is button move to the right
  //"correct" class" => blue background
  //"wrong" class => orange background

  return (
    <div className="options">
      {question.options.map((singleOption, i) => (
        <button
          className={`btn btn-option ${answer === i ? "answer" : ""} ${
            hasAnswer
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswer}
          key={singleOption}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
        >
          {singleOption}
        </button>
      ))}
    </div>
  );
};
