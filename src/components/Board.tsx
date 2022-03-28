import React from "react";
import { IBoard } from "../interfaces/IBoard";
import "./Board.css";
import Cell from "./Cell";

function Board(props: IBoard) {
  let cells = [];
  cells = props.cells.map((item, index) => (
    <Cell cellData={item} key={index} />
  ));
  return <div className="board">{cells}</div>;
}

export default Board;
