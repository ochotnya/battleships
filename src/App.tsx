import React, { useEffect, useState } from "react";
import { CellData } from "./classes/CellData";
import Board from "./components/Board";
import { Ship } from "./classes/Ship";
import { createCells, placeShip } from "./utils/logic";

function App() {
  const [playerBoard, setPlayerBoard] = useState<CellData[]>([]);
  const [enemyBoard, setEnemyBoard] = useState<CellData[]>([]);

  const p1_ships = [new Ship(4), new Ship(4), new Ship(5)];
  const p2_ships = [new Ship(4), new Ship(4), new Ship(5)];

  const updateEnemyCell = (cell: CellData) => {
    const index = enemyBoard.findIndex(
      (item) => item.column === cell.column && item.row === cell.row
    );
    let boardCopy = [...enemyBoard];
    boardCopy[index] = cell;

    setEnemyBoard(boardCopy);
  };

  const updatePlayerCell = (cell: CellData) => {
    const index = playerBoard.findIndex(
      (item) => item.column === cell.column && item.row === cell.row
    );
    let boardCopy = [...playerBoard];
    boardCopy[index] = cell;

    setPlayerBoard(boardCopy);
  };
  const placeShips = (board: CellData[], ships: Ship[]) => {
    //make copy of board. Spread operator does not do deep copy
    const boardCopy = board.map((item) => JSON.parse(JSON.stringify(item)));
    ships.forEach((ship) => placeShip(ship, boardCopy));

    return boardCopy;
  };

  const initializeBoards = () => {
    setPlayerBoard(placeShips(createCells(), p1_ships));
    setEnemyBoard(placeShips(createCells(), p2_ships));
  };

  useEffect(() => {
    initializeBoards();
  }, []);

  return (
    <div>
      <p>My board</p>
      <Board cells={playerBoard} hideShips={false} update={updatePlayerCell} />
      <hr />
      <p>Enemy board</p>
      <Board cells={enemyBoard} hideShips={false} update={updateEnemyCell} />
    </div>
  );
}

export default App;
