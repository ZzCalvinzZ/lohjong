import Board from "../board";
import { BoardIds } from "../../boards/types";

describe("Board", () => {
  it("should create tiles", () => {
    const board = new Board(BoardIds.Turtle);
    expect(board.tiles.length).toEqual(144);
  });

  it("should shuffle tiles", () => {
    const board = new Board(BoardIds.Turtle);
    const tiles = [...board.tiles];
    expect(board.tiles).toEqual(tiles);
    expect(board.tiles.length).toEqual(tiles.length);
    board.shuffleTiles();
    expect(board.tiles).not.toEqual(tiles);
    expect(board.tiles.length).toEqual(tiles.length);
  });
});
