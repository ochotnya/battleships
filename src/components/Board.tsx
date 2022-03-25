import React from "react";
import "./Board.css";
import Cell from "./Cell";

interface IBoard {
  columns: string[];
  rows: number[];
}
function Board(props: IBoard) {
  let cells = [];
  for (let indexColumn = 0; indexColumn < props.columns.length; indexColumn++) {
    for (let indexRow = 0; indexRow < props.rows.length; indexRow++) {
      const id = props.columns[indexColumn] + props.rows[indexRow];
      cells.push(<Cell key={id} name={id} />);
    }
  }
  return <div className="board">{cells}</div>;
}

export default Board;
