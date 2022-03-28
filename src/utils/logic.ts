import { CellData } from "../classes/CellData";
import { Point } from "../classes/Point";
import { IBoard } from "../interfaces/IBoard";
import { IDataCell } from "../interfaces/IDataCell";
import { IShip } from "../interfaces/IShip";

const createCells = () => {
  let cells: CellData[] = [];

  //automatically create array of 0-9 using Array, and increment every value by 1, so the rows start from 1
  const columnNames = Array.from(Array(10).keys()).map((item) => item + 1);
  const rowNames = Array.from(Array(10).keys()).map((item) => item + 1);

  for (let indexColumn = 0; indexColumn < columnNames.length; indexColumn++) {
    for (let indexRow = 0; indexRow < rowNames.length; indexRow++) {
      const newCell = new CellData({
        column: columnNames[indexColumn],
        row: rowNames[indexRow],
        isHit: false,
        isShip: false,
        hideShip: false,
      });
      cells.push(newCell);
    }
  }
  return cells;
};

const getNextCell = (
  board: CellData[],
  dirVertical: boolean,
  currentCell: CellData | undefined
) => {
  if (currentCell === undefined) return undefined;
  const previousIndex = board.findIndex((item) => item === currentCell);
  if (dirVertical) {
    //if previous index have last digit 9, it means it was the last cell in column so the next cell would be out of boundries
    if (previousIndex % 10 === 9) return undefined;
    else return board[previousIndex + 1];
  } else {
    //if previous index divided by 9 gives 10 (after flooring), it means it was the last cell in row so the next cell would be out of boundries
    if (Math.floor(previousIndex / 9) === 10) return undefined;
    else return board[previousIndex + 10];
  }
};

const placeShip = (ship: IShip, boardData: CellData[]) => {
  let shipCells = [];
  const maxAttempts = 20;

  for (let index = 0; index < maxAttempts; index++) {
    console.log("Starting");
    //initialize array of cells to assign
    shipCells = [];
    //get random cell which is not marked as ship
    let pointStart = boardData[Math.floor(Math.random() * 100)];
    while (pointStart.isShip) {
      pointStart = boardData[Math.floor(Math.random() * 100)];
    }
    shipCells.push(pointStart);

    //get random direction.
    const dirVertical = Math.random() < 0.5; //random true/false

    //check next cells depending on direction and ship size
    for (let index = 0; index < ship.size; index++) {
      const nextCell = getNextCell(
        boardData,
        dirVertical,
        shipCells[shipCells.length - 1]
      );
      if (!nextCell?.isShip) shipCells.push(nextCell);
      else shipCells.push(undefined);
    }

    console.log("test: ", shipCells);
    //if every item in shipCells is defined and there is no item that already is a ship, set isShip for every item. It will update board data by reference. Set index to max to exit the loop
    if (!shipCells.includes(undefined)) {
      index = maxAttempts;
      shipCells.forEach((item) => {
        if (item !== undefined) {
          item.isShip = true;
        }
      });
    }

    if (index === maxAttempts - 1) alert("Cannot place a boat!");
  }
};

export { placeShip, createCells };
