import React, { useState } from "react";
import { CellData } from "../classes/CellData";
import "./Cell.css";

interface ICell {
  id: string;
  cellData: CellData;
  updater: (data: CellData) => void;
  autoshot?: () => void;
}
function Cell(props: ICell) {
  const [miss, setMiss] = useState(false);

  const clickHandler = () => {
    if (!props.cellData.isHit) {
      if (props.cellData.isShip) {
        props.cellData.shipRef?.takeDamage();
        props.updater(props.cellData);
      } else setMiss(true);
      props.cellData.isHit = true;
      props.autoshot?.(); //execute automatic shot in response if function is defined
    }
  };

  const shipRef = props.cellData.shipRef;
  let sink = false;
  let damaged = props.cellData.isHit;
  if (shipRef !== undefined) {
    sink = shipRef.hp === 0;
  }
  return (
    <div
      id={props.id}
      data-testid={props.id}
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
    ></div>
  );
}

export default Cell;
