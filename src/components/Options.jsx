import React from "react";

export const Options = ({ question }) => {
  return (
    <div className="options">
      {question.options.map((singleOption) => (
        <button className="btn btn-option" key={singleOption}>
          {singleOption}
        </button>
      ))}
    </div>
  );
};
