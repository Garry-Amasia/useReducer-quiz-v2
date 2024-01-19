import { useEffect, useReducer } from "react";
import Header from "./Header";
import { Main } from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import { NextButton } from "./NextButton";
import { Progress } from "./Progress";
import { FinishedScreen } from "./FinishedScreen";

const initialState = {
  questions: [],
  status: "loading", //loading,error,ready,active,finished
  currentIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "active":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.currentIndex);
      console.log(question);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, currentIndex: state.currentIndex + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : StaticRange.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    default:
      throw new Error("unknown action");
  }
};

//-------------------COMPONENT----------------------------------
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  const { questions, status, currentIndex, answer, points, highscore } = state;

  //calculate question length
  const questionsLength = questions.length;

  //calculate all the points from all questions
  const pointsArray = questions.map((question) => question.points);
  const sumOfPoints = pointsArray.reduce(
    (accumulator, current) => accumulator + current,
    0
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        // console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        // console.error("ERROR HAPPENING");
        dispatch({ type: "dataFailed" });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsLength={questionsLength} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              questionLength={questionsLength}
              index={currentIndex}
              points={points}
              sumOfPoints={sumOfPoints}
              answer={answer}
            />
            <Question
              question={questions[currentIndex]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              currentIndex={currentIndex}
              questionLength={questionsLength}
            />
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            sumOfPoints={sumOfPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
