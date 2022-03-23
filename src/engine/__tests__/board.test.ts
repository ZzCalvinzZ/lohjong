import Board from "../board";
import { BoardIds } from "../../boards/types";
import shuffle from "../utils/shuffle";
import { tileGraphFixture } from "../__fixtures__/board";

jest.mock("../utils/shuffle", () => jest.fn());

describe("Board", () => {
  beforeEach(() => {
    (shuffle as jest.Mock).mockImplementation((x: any) => [...x].reverse());
  });

  it("should have an adjacency matrix", () => {
    const what = new Board(BoardIds.Turtle);
    expect(what.tileGraph).toEqual(tileGraphFixture);
  });

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
