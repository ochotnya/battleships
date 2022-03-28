import { IDataCell } from "../interfaces/IDataCell";

export class CellData {
  isShip: boolean;
  isHit: boolean;
  hideShip: boolean;
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
