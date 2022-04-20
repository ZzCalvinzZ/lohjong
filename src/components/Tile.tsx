import styled from "styled-components";
import TileClass, { Suit, Number } from "engine/tile";
import tileImage from "./tile_3.png";
import tileWindNorth from "./north.png";
import tileWindSouth from "./south.png";
import tileWindEast from "./east.png";
import tileWindWest from "./west.png";

export const TILE_WIDTH = 50;
export const TILE_HEIGHT = 75;
const Z_OFFSET = 4;

const getTileImage = (suit: Suit, number: Number) => {
  if (number === "North") return tileWindNorth;
  if (number === "South") return tileWindSouth;
  if (number === "East") return tileWindEast;
  if (number === "West") return tileWindWest;
  return tileImage;
};

interface ButtonProps {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly selected: boolean;
  readonly error: boolean;
  readonly suit: Suit;
  readonly number: Number;
}
const Button = styled.button<ButtonProps>`
  font-size: 10px;
  width: ${TILE_WIDTH}px;
  height: ${TILE_HEIGHT}px;
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  background: ${(props) => `url("${getTileImage(props.suit, props.number)}") no-repeat top left;`}
  background-size: ${TILE_WIDTH}px ${TILE_HEIGHT}px;
  background-position: center;
  border: none;
  overflow: hidden;
  filter: ${(props) => (props.selected ? "drop-shadow(0px 0px 6px #8a62cf)" : undefined)};
  animation: ${(props) => props.error && "shake 0.2s cubic-bezier(.36,.07,.19,.97) both"};
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

  @keyframes shake {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(5deg);
    }
    50% {
      transform: rotate(0eg);
    }
    75% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
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
      suit={tile.suit}
      number={tile.number}
      onClick={(event) => onClick(tile, event)}
    >
      {getTileImage(tile.suit, tile.number) === tileImage && `${tile.number}\n${tile.suit}`}
    </Button>
  );
};

export default Tile;
