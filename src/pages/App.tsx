import { useState } from "react";
import * as PIXI from "pixi.js";
import "./App.css";
import { Stage, Container } from "@inlet/react-pixi";
import Tile, { TILE_WIDTH, TILE_HEIGHT } from "components/Tile";
import TileClass from "engine/tile";
import Board from "engine/board";
import { BoardIds } from "boards/types";

const STAGE_WIDTH = 1000;
const STAGE_HEIGHT = 800;
const Z_OFFSET = 10;

const board = new Board(BoardIds.Turtle);

//@ts-ignore
window.board = board;

const calcXPos = (x: number, z: number) => x * (TILE_WIDTH / 2) + z * Z_OFFSET;
const calcYPos = (y: number, z: number) => y * (TILE_HEIGHT / 2) - z * Z_OFFSET;

const calcXOffset = (width: number) => (STAGE_WIDTH - width) / 2;
const calcYOffset = (height: number) => (STAGE_HEIGHT - height) / 2;

const flashRed = (dObj: PIXI.DisplayObject) => {
  const filter = new PIXI.filters.ColorMatrixFilter();
  filter.matrix[0] = 255;
  dObj.filters = [filter];
};

export const App = () => {
  const [tiles, setTiles] = useState(board.tiles);
  const [selectedTile, setSelectedTile] = useState<TileClass | undefined>();

  const onClick = (tile: TileClass, dObj: PIXI.DisplayObject) => {
    if (tile.id === selectedTile?.id) {
      //selected tile has been clicked, unselect it
      setSelectedTile(undefined);
    } else {
      if (!board.tileCanBeSelected(tile)) {
        // shake tile
        flashRed(dObj);
        console.log("tile not selectable");
      } else if (selectedTile && tile.number === selectedTile.number && tile.suit === selectedTile.suit) {
        // its a match, remove both tiles
        board.deleteTile(tile);
        board.deleteTile(selectedTile);
        setTiles(board.tiles);
        setSelectedTile(undefined);
      } else if (selectedTile) {
        // its not a match, shake the tile
      } else {
        // no tiles currently selected, select the tile
        setSelectedTile(tile);
      }
    }
  };

  return (
    <div className="App">
      <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT} options={{ backgroundColor: 0x2980b9 }}>
        <Container
          x={calcXOffset(board.board.tileWidth * TILE_WIDTH)}
          y={calcYOffset(board.board.tileHeight * TILE_HEIGHT)}
        >
          {[...tiles]
            .sort((t1, t2) => t1.z - t2.z)
            .map((tile) => {
              return (
                <Tile
                  key={tile.id}
                  x={calcXPos(tile.x, tile.z)}
                  y={calcYPos(tile.y, tile.z)}
                  number={tile.number}
                  suit={tile.suit}
                  fillColor={tile.id === selectedTile?.id ? 0xf5f4ba : undefined}
                  onClick={onClick}
                  tile={tile}
                />
              );
            })}
        </Container>
      </Stage>
    </div>
  );
};

export default App;
