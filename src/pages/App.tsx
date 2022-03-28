import { useEffect, useState } from "react";
import "./App.css";
import { Stage, Container, Sprite, Text } from "@inlet/react-pixi";
import Tile, { TILE_WIDTH, TILE_HEIGHT } from "components/Tile";
import Board from "engine/board";
import { BoardIds } from "boards/types";

const STAGE_WIDTH = 1000;
const STAGE_HEIGHT = 800;

const initBoard = new Board(BoardIds.Turtle);

const calcXPos = (x: number) => x * (TILE_WIDTH / 2);
const calcYPos = (y: number) => y * (TILE_HEIGHT / 2);

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
          {board.tiles.map((tile) => {
            if (tile.x === undefined || tile.y === undefined) return <></>;
            return (
              <Tile key={tile.id} x={calcXPos(tile.x)} y={calcYPos(tile.y)} number={tile.number} suit={tile.suit} />
            );
          })}
        </Container>
      </Stage>
    </div>
  );
};

export default App;
