import React from "react";
import Main from "./Components/Main";
import "./Components/style.css";
import {
  BrowserRouter as Router,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <>
        <Main />
      </>
    </Router>
  );
}

export default App;