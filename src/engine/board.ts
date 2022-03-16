import Tile, { Suit, Number } from "./tile";
import shuffle from "./utils/shuffle";
import boards from "../boards";
import { BoardIds, BoardType } from "../boards/types";

export default class Board {
  tiles: Tile[] = [];
  tileGraph: Record<string, Tile[]> = {};
  board: BoardType;

  constructor(boardId: BoardIds) {
    this.createTiles();
    this.board = boards[boardId];
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

    this.shuffleTiles();
  }

  shuffleTiles() {
    this.tiles = shuffle(this.tiles);
  }

  placeTiles() {
    // manipulate this tilemap to show already placed tiles
    let tilemap = this.board.tilemap.map((a) => ({ ...a }));
    const tiles = [...this.tiles];
    const placedTiles: Tile[] = [];

    this.board.tilemap.forEach((layer, z) => {
      layer.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (tilemap[z][y][x] === 1) {
            // place tile
            const placedTile = tiles.pop() as Tile;
            placedTile.place({z, x, y})
            placedTiles.push(placedTile);

            const adjacentTiles = placedTiles.filter((tile) => {
              if (tile.z === undefined) return false;
              if (placedTile.tileIsAdjacent(tile)) {
                return true;
              }
            });

            // set adjacent tiles in the graph
            adjacentTiles.forEach((tile: Tile) => {
              if (this.tileGraph[tile.id]) {
                this.tileGraph[tile.id].push(placedTile)
              }
            })
            this.tileGraph[placedTile.id] = adjacentTiles;

            // change 1s to 0s on board to show tile is placed
            tilemap[z][y][x] = 0;
            tilemap[z][y][x + 1] = 0;
            tilemap[z][y + 1][x] = 0;
            tilemap[z][y + 1][x + 1] = 0;
          }
        });
      });
    });
  }
}
