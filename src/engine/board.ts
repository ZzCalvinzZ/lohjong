import Tile, { Suit, Number } from "./tile";

export default class Board {
  tiles: Tile[] = [];

  constructor() {
    this.createTiles();
  }

  createTiles() {
    const pushTiles = (number: Number, suit: Suit, timesToPush: number) => {
      for (let times = 0; times < timesToPush; times++) {
        this.tiles.push(new Tile(number, suit));
      }
    };

    Tile.dotNumbers.forEach((number) => pushTiles(number, Suit.Dot, 4));
    Tile.bamNumbers.forEach((number) => pushTiles(number, Suit.Bam, 4));
    Tile.crakNumbers.forEach((number) => pushTiles(number, Suit.Crak, 4));
    Tile.windNumbers.forEach((number) => pushTiles(number, Suit.Wind, 4));
    Tile.dragonNumbers.forEach((number) => pushTiles(number, Suit.Dragon, 4));
    Tile.flowerNumbers.forEach((number) => pushTiles(number, Suit.Flower, 2));
  }
}
