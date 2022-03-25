import React from "react";
import "./Cell.css";

interface ICell {
  name: string;
}
function Cell(props: ICell) {
  return <div className="cell">{props.name}</div>;
}

export default Cell;
