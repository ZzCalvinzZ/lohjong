import styled from "styled-components";
import TileClass from "engine/tile";
import tileImage from "./tile_2.png";

export const TILE_WIDTH = 50;
export const TILE_HEIGHT = 75;
const Z_OFFSET = 4;

interface ButtonProps {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly selected: boolean;
  readonly error: boolean;
}
const Button = styled.button<ButtonProps>`
  font-size: 10px;
  width: ${TILE_WIDTH}px;
  height: ${TILE_HEIGHT}px;
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  // background: ${(props) => (props.selected ? "#f5f4ba" : "#ffffff")};
  background: url("${tileImage}") no-repeat top left;
  background-size: ${TILE_WIDTH}px ${TILE_HEIGHT}px;
  background-position: center;
  border: none;
  overflow: hidden;
  filter: ${(props) => (props.selected ? "brightness(1.1)" : undefined)};
  animation: ${(props) => props.error && "blinkingBackground 0.25s 2"};
  // &:hover {
  // }
  // &:focus {
  // }
  // &:active {
  //   border-style: solid;
  //   outline: #c2c2c2;
  // }
  @keyframes blinkingBackground {
    to {
      filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8);
    }
  }
  // @keyframes disappear {
  //   from {
  //   }
  //   to {
  //     visibility: hidden;
  //     opacity: 0;
  //   }
  // }
`;

type TileProps = {
  onClick: (tile: TileClass, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  tile: TileClass;
  selected: boolean;
  error: boolean;
};

const calcXPos = (x: number, z: number) => x * (TILE_WIDTH / 2) - x * 3 + z * Z_OFFSET;
const calcYPos = (y: number, z: number) => y * (TILE_HEIGHT / 2) - y * 2 - z * Z_OFFSET;

const Tile = ({ onClick, tile, error, selected }: TileProps) => {
  const actualX = calcXPos(tile.x, tile.z);
  const actualY = calcYPos(tile.y, tile.z);

  return (
    <Button
      x={actualX}
      y={actualY}
      z={tile.z}
      error={error}
      selected={selected}
      onClick={(event) => onClick(tile, event)}
    >
      {`${tile.number}\n${tile.suit}`}
    </Button>
  );
};

export default Tile;
