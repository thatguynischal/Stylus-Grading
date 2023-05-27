import { useState } from "react";
import Questions from "./components/Questions";
import Answer from "./components/Answer";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Questions />
    </>
  );
}

export default App;
