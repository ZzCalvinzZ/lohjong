import { useState, useEffect } from "react";
import * as PIXI from "pixi.js";
import { Stage, Container } from "@inlet/react-pixi";
import Tile, { TILE_WIDTH, TILE_HEIGHT } from "components/Tile";
import TileClass from "engine/tile";
import Board from "engine/board";
import { BoardIds } from "boards/types";

const STAGE_WIDTH = window.innerWidth;
const STAGE_HEIGHT = window.innerHeight;
const Z_OFFSET = 10;

const board = new Board(BoardIds.Turtle);

//@ts-ignore
window.board = board;

const calcXPos = (x: number, z: number) => x * (TILE_WIDTH / 2) + z * Z_OFFSET;
const calcYPos = (y: number, z: number) => y * (TILE_HEIGHT / 2) - z * Z_OFFSET;

export const App = () => {
  const [tiles, setTiles] = useState(board.tiles);
  const [selectedTile, setSelectedTile] = useState<TileClass | undefined>();
  const [errorTiles, setErrorTiles] = useState<TileClass[]>([]);
  const [stageSize, setStageSize] = useState<[number, number]>([STAGE_WIDTH, STAGE_HEIGHT]);

  const flashRed = (tile: TileClass) => {
    setErrorTiles([...errorTiles, tile]);
    setTimeout(() => {
      // After 3 seconds set the show value to false
      setErrorTiles(errorTiles.filter((t) => t.id !== tile.id));
    }, 100);
  };

  useEffect(() => {
    window.addEventListener("resize", () => setStageSize([window.innerWidth, window.innerHeight]));
  }, []);

  const calcXOffset = (width: number) => (stageSize[0] - width) / 2;
  const calcYOffset = (height: number) => (stageSize[1] - height) / 2;

  const onClick = (tile: TileClass, dObj: PIXI.DisplayObject) => {
    if (tile.id === selectedTile?.id) {
      //selected tile has been clicked, unselect it
      setSelectedTile(undefined);
    } else {
      if (!board.tileCanBeSelected(tile)) {
        // tile can't be selected
        flashRed(tile);
      } else if (selectedTile && tile.number === selectedTile.number && tile.suit === selectedTile.suit) {
        // its a match, remove both tiles
        board.deleteTile(tile);
        board.deleteTile(selectedTile);
        setTiles(board.tiles);
        setSelectedTile(undefined);
      } else if (selectedTile) {
        // its not a match
        flashRed(tile);
      } else {
        // no tiles currently selected, select the tile
        setSelectedTile(tile);
      }
    }
  };

  return (
    <div className="App">
      <Stage width={stageSize[0]} height={stageSize[1]} options={{ backgroundColor: 0x2980b9 }}>
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
                  error={errorTiles.includes(tile)}
                />
              );
            })}
        </Container>
      </Stage>
    </div>
  );
};

export default App;
