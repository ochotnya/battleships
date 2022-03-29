import React, { useEffect, useState } from "react";
import { CellData } from "./classes/CellData";
import Board from "./components/Board";
import { Ship } from "./classes/Ship";
import { createCells, placeShip } from "./utils/logic";

const p1Ships = [new Ship(4), new Ship(4), new Ship(5)];
const p2Ships = [new Ship(4), new Ship(4), new Ship(5)];

function App() {
  const [playerBoard, setPlayerBoard] = useState<CellData[]>([]);
  const [enemyBoard, setEnemyBoard] = useState<CellData[]>([]);
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);

  const destroyedShips1 = p2Ships.filter((ship) => ship.hp === 0).length;
  const destroyedShips2 = p1Ships.filter((ship) => ship.hp === 0).length;

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
    setPlayerBoard(placeShips(createCells(), p1Ships));
    setEnemyBoard(placeShips(createCells(), p2Ships));
  };

  useEffect(() => {
    initializeBoards();
  }, []);

  //update points
  useEffect(() => {
    setP1Score(destroyedShips1);
    setP2Score(destroyedShips2);
  }, [destroyedShips1, destroyedShips2]);

  return (
    <div>
      <p>My board. My score: {p1Score}</p>
      <Board cells={playerBoard} hideShips={false} update={updatePlayerCell} />
      <hr />
      <p>Enemy board. Enemy score: {p2Score}</p>
      <Board cells={enemyBoard} hideShips={true} update={updateEnemyCell} />
    </div>
  );
}

export default App;
