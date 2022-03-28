import React from "react";
import { CellData } from "../classes/CellData";
import "./Board.css";
import Cell from "./Cell";

export interface IBoard {
  cells: CellData[];
  hideShips: boolean;
  update: (data: CellData) => void;
}
function Board(props: IBoard) {
  let cells = [];
  cells = props.cells.map((item, index) => {
    item.hideShip = props.hideShips;
    return <Cell cellData={item} key={index} updater={props.update} />;
  });
  return <div className="board">{cells}</div>;
}

export default Board;
