import React from "react";
import { CellData } from "../classes/CellData";
import "./Cell.css";

interface ICell {
  cellData: CellData;
}
function Cell(props: ICell) {
  return (
    <div
      className={
        "cell" +
        (props.cellData.isShip ? " cell-with-boat" : "") +
        (props.cellData.isHit ? " cell-hit" : "")
      }
    ></div>
  );
}

export default Cell;
