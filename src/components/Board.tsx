import React from "react";
import { CellData } from "../classes/CellData";
import "./Board.css";
import Cell from "./Cell";

export interface IBoard {
  id: string;
  cells: CellData[];
  hideShips: boolean;
  update: (data: CellData) => void;
  autoshot?: () => void;
}
function Board(props: IBoard) {
  let cells = [];
  cells = props.cells.map((item, index) => {
    item.hideShip = props.hideShips;
    return (
      <Cell
        autoshot={props.autoshot}
        cellData={item}
        key={index}
        updater={props.update}
        id={props.id + index}
      />
    );
  });
  return <div className="board">{cells}</div>;
}

export default Board;
