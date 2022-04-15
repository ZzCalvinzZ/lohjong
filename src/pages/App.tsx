import { useState, useEffect } from "react";
import styled from "styled-components";
import Tile, { TILE_WIDTH, TILE_HEIGHT } from "components/Tile";
import TileClass from "engine/tile";
import Board from "engine/board";
import { BoardIds } from "boards/types";

const board = new Board(BoardIds.Turtle);

//@ts-ignore
window.board = board;

interface DivProps {
  readonly width: number;
  readonly height: number;
}

const Div = styled.div<DivProps>`
  position: relative;
  align-self: center;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export const App = () => {
  const [tiles, setTiles] = useState(board.tiles);
  const [selectedTile, setSelectedTile] = useState<TileClass | undefined>();
  const [errorTiles, setErrorTiles] = useState<TileClass[]>([]);

  const flashRed = (tile: TileClass) => {
    if (errorTiles.includes(tile)) {
      return;
    }
    setSelectedTile(undefined);
    setErrorTiles([...errorTiles, tile]);
    setTimeout(() => {
      // After 0.5 seconds set the show value to false
      setErrorTiles(errorTiles.filter((t) => t.id !== tile.id));
    }, 500);
  };

  const onClick = (tile: TileClass, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.currentTarget.blur();
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
    <Div width={board.board.tileWidth * TILE_WIDTH} height={board.board.tileHeight * TILE_HEIGHT}>
      {[...tiles]
        .sort((t1, t2) => {
          // complicated but lays the tiles in the correct order
          if (t1.z < t2.z) {
            return -1;
          } else if (t1.y < t2.y && t1.x < t2.x) {
            return 1;
          } else if (t1.y < t2.y) {
            return -1;
          } else {
            return 1;
          }
        })
        .map((tile) => {
          return (
            <Tile
              key={tile.id}
              selected={tile === selectedTile}
              onClick={onClick}
              tile={tile}
              error={errorTiles.includes(tile)}
            />
          );
        })}
    </Div>
  );
};

export default App;
