import React, { useEffect, useState } from "react";
import { CellData } from "./classes/CellData";
import Board from "./components/Board";
import { Ship } from "./classes/Ship";
import { createCells, placeShip } from "./utils/logic";
import "./App.css";
import EndScreen from "./components/EndScreen";

var p1Ships = [new Ship(4), new Ship(4), new Ship(5)];
var p2Ships = [new Ship(4), new Ship(4), new Ship(5)];
var player2AvailableTargets = Array.from(Array(100).keys()).map(
  (item) => item + 1
);

function App() {
  const [playerBoard, setPlayerBoard] = useState<CellData[]>([]);
  const [enemyBoard, setEnemyBoard] = useState<CellData[]>([]);
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [endGame, setEndGame] = useState(false);

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

  useEffect(() => {
    const initializeBoards = () => {
      player2AvailableTargets = Array.from(Array(100).keys()).map(
        (item) => item + 1
      );
      p1Ships = [new Ship(4), new Ship(4), new Ship(5)];
      p2Ships = [new Ship(4), new Ship(4), new Ship(5)];
      setPlayerBoard(placeShips(createCells(), p1Ships));
      setEnemyBoard(placeShips(createCells(), p2Ships));
    };
    if (!endGame) initializeBoards();
  }, [endGame]);

  //update points
  useEffect(() => {
    setP1Score(destroyedShips1);
    setP2Score(destroyedShips2);

    if (destroyedShips1 === 3 || destroyedShips2 === 3) setEndGame(true);
  }, [destroyedShips1, destroyedShips2]);

  const autoShot = () => {
    //randomly select target
    const itemIndex = Math.floor(
      Math.random() * (player2AvailableTargets.length - 1)
    );

    //parse target id
    const targetID = "playerBoard" + player2AvailableTargets[itemIndex];

    //remove target from list, so computer wouldn't choose the same target twice
    player2AvailableTargets.splice(itemIndex, 1);

    //find element on screen and trigger click event
    const target = document.getElementById(targetID);
    target?.click();
  };

  return (
    <div className="App">
      {endGame && (
        <EndScreen
          win={destroyedShips1 === 3}
          newGameAction={() => setEndGame(false)}
        />
      )}
      {!endGame && (
        <div className="game-screen">
          <div className="board-disable">
            <p>My board. My score: {p1Score}</p>
            <Board
              id="playerBoard"
              cells={playerBoard}
              hideShips={false}
              update={updatePlayerCell}
            />
          </div>
          <div>
            <p>Enemy board. Enemy score: {p2Score}</p>
            <Board
              id="enemyBoard"
              cells={enemyBoard}
              hideShips={true}
              update={updateEnemyCell}
              autoshot={autoShot}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
