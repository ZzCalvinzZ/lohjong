import Tile, { Suit, Number } from "./tile";
import shuffle from "./utils/shuffle";
import boards from "../boards";
import { BoardIds, BoardType } from "../boards/types";

export default class Board {
  tiles: Tile[] = [];
  tileAdjGraph: Record<string, Tile[] | undefined> = {};
  board: BoardType;

  constructor(boardId: BoardIds) {
    this.board = boards[boardId];
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

    this.shuffleTiles();
    this.placeTiles();
  }

  shuffleTiles() {
    this.tiles = shuffle(this.tiles);
  }

  deleteTile(tile: Tile) {
    this.tiles = this.tiles.filter((item) => item.id !== tile.id);

    //remove from adjacentTiles first
    this.tileAdjGraph[tile.id]?.forEach((adjTile) => {
      this.tileAdjGraph[adjTile.id] = this.tileAdjGraph[adjTile.id]?.filter((item) => item.id !== tile.id);
    });

    this.tileAdjGraph[tile.id] = undefined;
  }

  tileCanBeSelected(tile: Tile) {
    const adjTiles = this.tileAdjGraph[tile.id] as Tile[];

    const tilesOnTop = adjTiles.filter((t: Tile) => t.z > tile.z);
    const tilesOnLeft = adjTiles.filter((t: Tile) => (t.z === tile.z) && t.x < tile.x);
    const tilesOnRight = adjTiles.filter((t: Tile) => (t.z === tile.z) && t.x > tile.x);

    return (tilesOnLeft.length && tilesOnRight.length) || tilesOnTop.length > 0 ? false : true;
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
            placedTile.place({ z, x, y });
            placedTiles.push(placedTile);

            const adjacentTiles = placedTiles.filter((tile) => {
              // if tile not placed yet or it's the current tile, it is not adjacent
              if (tile.z < 0 || tile === placedTile) return false;
              if (placedTile.tileIsAdjacent(tile)) {
                return true;
              }
            });

            // set adjacent tiles in the graph
            adjacentTiles.forEach((tile: Tile) => {
              const adjList = this.tileAdjGraph[tile.id];
              if (adjList) {
                adjList.push(placedTile);
              }
            });
            this.tileAdjGraph[placedTile.id] = adjacentTiles;

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
