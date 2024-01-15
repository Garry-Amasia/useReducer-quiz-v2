import { useEffect, useReducer } from "react";
import Header from "./Header";
import { Main } from "./Main";

const initialState = {
  questions: [],
  status: "loading", //loading,error,ready,active,finished
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    default:
      throw new Error("unknown action");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        console.error("ERROR HAPPENING");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}

export default App;
