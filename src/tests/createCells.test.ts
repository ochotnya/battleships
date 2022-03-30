import { createCells } from "../utils/logic";

test("Create correctly initialized cells", () => {
  const board = createCells();
  expect(board.length).toEqual(100);
  for (let index = 0; index < 100; index++) {
    expect(board[index].column).toEqual(Math.floor(index / 10) + 1);
    expect(board[index].row).toEqual((index % 10) + 1);
    expect(board[index].hideShip).toEqual(false);
    expect(board[index].isHit).toEqual(false);
    expect(board[index].isShip).toEqual(false);
    expect(board[index].shipRef).toBe(undefined);
  }
});
