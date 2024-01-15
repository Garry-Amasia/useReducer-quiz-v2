import { useEffect, useReducer } from "react";
import Header from "./Header";
import { Main } from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  status: "loading", //loading,error,ready,active,finished
  currentIndex: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "active":
      return { ...state, status: "active" };
    default:
      throw new Error("unknown action");
  }
};

//-------------------COMPONENT----------------------------------
function App() {
  const [{ questions, status, currentIndex }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const questionsLength = questions.length;

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
        {status === "active" && <Question question={questions[currentIndex]} />}
      </Main>
    </div>
  );
}

export default App;
