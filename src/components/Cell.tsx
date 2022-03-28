import React, { useState } from "react";
import { CellData } from "../classes/CellData";
import "./Cell.css";

interface ICell {
  cellData: CellData;
  updater: (data: CellData) => void;
}
function Cell(props: ICell) {
  const [miss, setMiss] = useState(false);
  const clickHandler = () => {
    if (props.cellData.isShip) {
      props.cellData.shipRef?.takeDamage();
      props.cellData.isHit = true;
      props.updater(props.cellData);
    } else setMiss(true);
  };

  const shipRef = props.cellData.shipRef;
  let sink = false;
  let damaged = props.cellData.isHit;
  if (shipRef !== undefined) {
    sink = shipRef.hp === 0;
  }
  return (
    <div
      onClick={clickHandler}
      className={
        "cell" +
        (props.cellData.isShip && !props.cellData.hideShip
          ? " cell-with-boat"
          : "") +
        (damaged ? " cell-hit" : "") +
        (miss ? " cell-miss" : "") +
        (sink ? " cell-sink" : "")
      }
    >
      {}
    </div>
  );
}

export default Cell;
