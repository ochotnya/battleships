import React, { useEffect, useState } from "react";
import { CellData } from "./classes/CellData";
import Board from "./components/Board";
import { shipBattleship, shipDestroyer } from "./ships";
import { createCells, placeShip } from "./utils/logic";

function App() {
  const [playerBoard, setPlayerBoard] = useState<CellData[]>([]);

  const setupPlayerBoard = () => {
    setPlayerBoard(createCells());
  };

  const placeShipBtn = () => {
    const ships = [shipDestroyer, shipBattleship];
    //make copy of board. Spread operator does not do deep copy
    const playerBoardCopy = playerBoard.map((item) =>
      JSON.parse(JSON.stringify(item))
    );
    placeShip(ships[0], playerBoardCopy);
    setPlayerBoard(playerBoardCopy);
  };

  useEffect(() => {
    setupPlayerBoard();
  }, []);

  return (
    <div>
      <button onClick={placeShipBtn}>place ship</button>
      <Board cells={playerBoard} />
    </div>
  );
}

export default App;
