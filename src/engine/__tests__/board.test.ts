import Board from "../board";

describe('Board', () => {

  it('should create tiles', () => {
    const board = new Board()

    expect(board.tiles.length).toEqual(144)
  });
  

});
