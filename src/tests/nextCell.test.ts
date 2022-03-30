import { createCells, getNextCell } from "../utils/logic";

const board = createCells();

test("Try to get proper next cell vertically", () => {
  const nextCell = getNextCell(board, true, board[8]);
  expect(nextCell).not.toBe(undefined);
});

test("Try to get cell from outside the board vertically", () => {
  const nextCell = getNextCell(board, true, board[9]);
  expect(nextCell).toBe(undefined);
});

test("Try to get cell from outside the board horizontally", () => {
  const nextCell = getNextCell(board, false, board[90]);
  expect(nextCell).toBe(undefined);
});

test("Try to get proper next cell horizontally", () => {
  const nextCell = getNextCell(board, false, board[80]);
  expect(nextCell).not.toBe(undefined);
});

test("Try to get cell based on undefined current cell", () => {
  const nextCell = getNextCell(board, false, undefined);
  expect(nextCell).toBe(undefined);
});
