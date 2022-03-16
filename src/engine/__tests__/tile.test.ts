import Tile, { Suit } from "../tile";

describe("Tile construct", () => {
  const createTile = () => {
    return new Tile(Tile.dotNumbers[0], Suit.Dot);
  };

  const createAndPlaceTile = (z: number, x: number, y: number) => {
    const tile = new Tile(Tile.dotNumbers[0], Suit.Dot);
    tile.place({ z, x, y });
    return tile;
  };

  it("should construct", () => {
    const tile = createTile();
    expect(tile.number).toEqual("1");
    expect(tile.suit).toEqual(Suit.Dot);
  });

  it("should place tile", () => {
    const tile = createAndPlaceTile(0, 1, 2);
    expect(tile.z).toEqual(0);
    expect(tile.x).toEqual(1);
    expect(tile.y).toEqual(2);
  });

  it("should get tileCells", () => {
    const tile = createAndPlaceTile(0, 1, 2);
    expect(tile.tileCells).toEqual([
      { x: 1, y: 2, z: 0 },
      { x: 2, y: 2, z: 0 },
      { x: 1, y: 3, z: 0 },
      { x: 2, y: 3, z: 0 },
    ]);
  });

  it("should get the graphKey", () => {
    const tile = createAndPlaceTile(0, 1, 2);
    expect(tile.id).toEqual("DOT_1_1_2_0");
  });

  it("should return if tiles are adjacent (beside each other)", () => {
    const tile = createAndPlaceTile(0, 2, 1);

    const tileLeft = createAndPlaceTile(0, 0, 1);
    const tileTopLeft = createAndPlaceTile(0, 0, 0);
    const tileBottomLeft = createAndPlaceTile(0, 0, 2);

    expect(tile.tileIsAdjacent(tileTopLeft)).toEqual(true);
    expect(tile.tileIsAdjacent(tileLeft)).toEqual(true);
    expect(tile.tileIsAdjacent(tileBottomLeft)).toEqual(true);
    expect(tileTopLeft.tileIsAdjacent(tile)).toEqual(true);
    expect(tileLeft.tileIsAdjacent(tile)).toEqual(true);
    expect(tileBottomLeft.tileIsAdjacent(tile)).toEqual(true);


    const tileTooFarRight = createAndPlaceTile(0, 5, 1);
    const tileTooFarTopRight = createAndPlaceTile(0, 5, 0);
    const tileTooFarBottomRight = createAndPlaceTile(0, 5, 2);

    expect(tile.tileIsAdjacent(tileTooFarTopRight)).toEqual(false);
    expect(tile.tileIsAdjacent(tileTooFarRight)).toEqual(false);
    expect(tile.tileIsAdjacent(tileTooFarBottomRight)).toEqual(false);
    expect(tileTooFarTopRight.tileIsAdjacent(tile)).toEqual(false);
    expect(tileTooFarRight.tileIsAdjacent(tile)).toEqual(false);
    expect(tileTooFarBottomRight.tileIsAdjacent(tile)).toEqual(false);

    const tileBelow = createAndPlaceTile(0, 2, 3);
    const tileBelowLeft = createAndPlaceTile(0, 1, 3);
    const tileBelowRight = createAndPlaceTile(0, 3, 3);

    expect(tile.tileIsAdjacent(tileBelow)).toEqual(false);
    expect(tile.tileIsAdjacent(tileBelowLeft)).toEqual(false);
    expect(tile.tileIsAdjacent(tileBelowRight)).toEqual(false);
    expect(tileBelow.tileIsAdjacent(tile)).toEqual(false);
    expect(tileBelowLeft.tileIsAdjacent(tile)).toEqual(false);
    expect(tileBelowRight.tileIsAdjacent(tile)).toEqual(false);
  });

  it("should return if tiles are adjacent (on top or below)", () => {
    const tile = createAndPlaceTile(0, 2, 1);

    // overlapping
    const tileAbove = createAndPlaceTile(1, 2, 1);
    const tileAboveTopLeft = createAndPlaceTile(1, 1, 0);
    const tileAboveTopRight = createAndPlaceTile(1, 3, 0);
    const tileAboveBottomLeft = createAndPlaceTile(1, 1, 2);
    const tileAboveBottomRight = createAndPlaceTile(1, 3, 2);

    expect(tile.tileIsAdjacent(tileAbove)).toEqual(true);
    expect(tile.tileIsAdjacent(tileAboveTopLeft)).toEqual(true);
    expect(tile.tileIsAdjacent(tileAboveTopRight)).toEqual(true);
    expect(tile.tileIsAdjacent(tileAboveBottomLeft)).toEqual(true);
    expect(tile.tileIsAdjacent(tileAboveBottomRight)).toEqual(true);
    expect(tileAbove.tileIsAdjacent(tile)).toEqual(true);
    expect(tileAboveTopLeft.tileIsAdjacent(tile)).toEqual(true);
    expect(tileAboveTopRight.tileIsAdjacent(tile)).toEqual(true);
    expect(tileAboveBottomLeft.tileIsAdjacent(tile)).toEqual(true);
    expect(tileAboveBottomRight.tileIsAdjacent(tile)).toEqual(true);

    // not overlapping
    const tileAboveLeft = createAndPlaceTile(1, 0, 1);
    const tileAboveRight = createAndPlaceTile(1, 5, 1);
    const tileAboveBottom = createAndPlaceTile(1, 2, 3);

    expect(tile.tileIsAdjacent(tileAboveLeft)).toEqual(false);
    expect(tile.tileIsAdjacent(tileAboveBottom)).toEqual(false);
    expect(tile.tileIsAdjacent(tileAboveRight)).toEqual(false);
    expect(tileAboveLeft.tileIsAdjacent(tile)).toEqual(false);
    expect(tileAboveBottom.tileIsAdjacent(tile)).toEqual(false);
    expect(tileAboveRight.tileIsAdjacent(tile)).toEqual(false);
  });
});
