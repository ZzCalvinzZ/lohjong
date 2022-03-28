import { useState } from "react";
import "./App.css";
import { Stage, Container } from "@inlet/react-pixi";
import Tile, { TILE_WIDTH, TILE_HEIGHT } from "components/Tile";
import Board from "engine/board";
import { BoardIds } from "boards/types";

const STAGE_WIDTH = 1000;
const STAGE_HEIGHT = 800;
const Z_OFFSET = 10;

const initBoard = new Board(BoardIds.Turtle);

const calcXPos = (x: number, z: number) => x * (TILE_WIDTH / 2) + z * Z_OFFSET;
const calcYPos = (y: number, z: number) => y * (TILE_HEIGHT / 2) - z * Z_OFFSET;

const calcXOffset = (width: number) => (STAGE_WIDTH - width) / 2;
const calcYOffset = (height: number) => (STAGE_HEIGHT - height) / 2;

export const App = () => {
  const [board, setBoard] = useState(initBoard);

  return (
    <div className="App">
      <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT} options={{ backgroundColor: 0x2980b9 }}>
        <Container
          x={calcXOffset(board.board.tileWidth * TILE_WIDTH)}
          y={calcYOffset(board.board.tileHeight * TILE_HEIGHT)}
        >
          {[...board.tiles]
            .sort((t1, t2) => {
              if (t1.z === undefined || t2.z === undefined) return 0;
              return t1.z - t2.z;
            })
            .map((tile) => {
              if (tile.x === undefined || tile.y === undefined || tile.z === undefined) return <></>;
              return (
                <Tile
                  key={tile.id}
                  x={calcXPos(tile.x, tile.z)}
                  y={calcYPos(tile.y, tile.z)}
                  number={tile.number}
                  suit={tile.suit}
                />
              );
            })}
        </Container>
      </Stage>
    </div>
  );
};

export default App;
