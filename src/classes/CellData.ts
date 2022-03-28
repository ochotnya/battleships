import { IDataCell } from "../interfaces/IDataCell";
import { Ship } from "./Ship";

export class CellData {
  isShip: boolean;
  isHit: boolean;
  hideShip: boolean;
  shipRef?: Ship;
  readonly column: number;
  readonly row: number;

  constructor(props: IDataCell) {
    this.isShip = props.isShip;
    this.isHit = props.isHit;
    this.hideShip = props.hideShip;
    this.column = props.column;
    this.row = props.row;
  }
}
