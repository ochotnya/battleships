import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { CellData } from "../classes/CellData";
import { Ship } from "../classes/Ship";
import Board from "../components/Board";
import { createCells } from "../utils/logic";

test("Check if cells are initialized with proper class", () => {
  const cells = createCells();
  render(
    <Board id="enemyBoard" cells={cells} hideShips={false} update={() => {}} />
  );
  const cell = screen.getByTestId("enemyBoard45");
  expect(cell).toHaveClass("cell");
  expect(cell).not.toHaveClass("cell-with-boat");
  expect(cell).not.toHaveClass("cell-hit");
  expect(cell).not.toHaveClass("cell-miss");
  expect(cell).not.toHaveClass("cell-sink");
});

test("Check if cell displays ship", () => {
  const cells = createCells();
  cells[0].isShip = true;
  render(
    <Board id="enemyBoard" cells={cells} hideShips={false} update={() => {}} />
  );
  const cell = screen.getByTestId("enemyBoard0");
  expect(cell).toHaveClass("cell");
  expect(cell).toHaveClass("cell-with-boat");
  expect(cell).not.toHaveClass("cell-hit");
  expect(cell).not.toHaveClass("cell-miss");
  expect(cell).not.toHaveClass("cell-sink");
});

test("Check if cell displays hit", () => {
  const cells = createCells();
  cells[0].isHit = true;
  render(
    <Board id="enemyBoard" cells={cells} hideShips={false} update={() => {}} />
  );
  const cell = screen.getByTestId("enemyBoard0");
  expect(cell).toHaveClass("cell");
  expect(cell).not.toHaveClass("cell-with-boat");
  expect(cell).toHaveClass("cell-hit");
  expect(cell).not.toHaveClass("cell-miss");
  expect(cell).not.toHaveClass("cell-sink");
});

test("Check if cell displays sink", () => {
  const cells = createCells();
  cells[0].isHit = true;
  const ship = new Ship(4);
  ship.hp = 0;
  cells[0].shipRef = ship;
  render(
    <Board id="enemyBoard" cells={cells} hideShips={false} update={() => {}} />
  );
  const cell = screen.getByTestId("enemyBoard0");
  expect(cell).toHaveClass("cell");
  expect(cell).not.toHaveClass("cell-with-boat");
  expect(cell).toHaveClass("cell-hit");
  expect(cell).not.toHaveClass("cell-miss");
  expect(cell).toHaveClass("cell-sink");
});

test("Check if cell displays miss", () => {
  const cells = createCells();

  render(
    <Board id="enemyBoard" cells={cells} hideShips={false} update={() => {}} />
  );
  const cell = screen.getByTestId("enemyBoard0");
  userEvent.click(cell);

  expect(cell).toHaveClass("cell");
  expect(cell).not.toHaveClass("cell-with-boat");
  expect(cell).toHaveClass("cell-hit");
  expect(cell).toHaveClass("cell-miss");
  expect(cell).not.toHaveClass("cell-sink");
});
