import React from "react";
import Board from "./components/Board";

function App() {
  const columnNames = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  //automatically create array of 0-9 using Array, and increment every value by 1, so the rows start from 1
  const rowNames = Array.from(Array(10).keys()).map((item) => item + 1);
  return (
    <div>
      <Board columns={columnNames} rows={rowNames} />
    </div>
  );
}

export default App;
