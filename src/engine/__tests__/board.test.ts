import Board from "../board";

describe("Board", () => {
  it("should create tiles", () => {
    const board = new Board();
    expect(board.tiles.length).toEqual(144);
  });

  it("should shuffle tiles", () => {
    const board = new Board();
    const tiles = [...board.tiles];
    expect(board.tiles).toEqual(tiles);
    expect(board.tiles.length).toEqual(tiles.length);
    board.shuffleTiles();
    expect(board.tiles).not.toEqual(tiles);
    expect(board.tiles.length).toEqual(tiles.length);
  });
});
