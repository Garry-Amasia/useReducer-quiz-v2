import React, { useEffect } from "react";

export const Timer = ({ dispatch, timer }) => {
  // console.log("runs");
  const minute = Math.floor(timer / 60);
  const seconds = timer % 60;
  useEffect(() => {
    const time = setInterval(() => {
      //   console.log("tick");
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(time);
  }, [dispatch, timer]);
  return (
    <div className="timer">
      {minute < 10 && "0"}
      {minute}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};
