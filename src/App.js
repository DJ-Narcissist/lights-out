import React from "react";
import Board from "./Components/Board/Board";
import Title from "./Components/Title/Title";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

const App = () =>  {
  return (
      <div className="App">
        <Title />
        <Board nrows={5} ncols={5} chanceLightStartsOn={0.25} />
      </div>
  );
}

export default App;
