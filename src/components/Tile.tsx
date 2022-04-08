import styled from "styled-components";
import TileClass from "engine/tile";

export const TILE_WIDTH = 50;
export const TILE_HEIGHT = 75;

interface ButtonProps {
  readonly x: number;
  readonly y: number;
  readonly selected: boolean;
  readonly error: boolean;
}
const Button = styled.button<ButtonProps>`
  width: ${TILE_WIDTH}px;
  height: ${TILE_HEIGHT}px;
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  background: ${(props) => (props.selected ? "#f5f4ba" : "#ffffff")};
  border-style: solid;
  outline: #c2c2c2;
  overflow: hidden;
  animation: ${(props) => props.error && "blinkingBackground 0.25s 2"};
  &:hover {
  }
  &:focus {
    background-color: ${(props) => !props.error && !props.selected && "#e3e3e3"};
  }
  &:active {
    border-style: solid;
    outline: #c2c2c2;
  }
  @keyframes blinkingBackground {
    from {
      background-color: #d14f4f;
    }
    to {
      background-color: #ffffff;
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
  x: number;
  y: number;
  number: string;
  suit: string;
  onClick: (tile: TileClass, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  tile: TileClass;
  selected: boolean;
  error: boolean;
};

const Tile = ({ x, y, number, suit, onClick, tile, error, selected }: TileProps) => {
  return (
    <Button x={x} y={y} error={error} selected={selected} onClick={(event) => onClick(tile, event)}>
      {`${number}\n${suit}`}
    </Button>
  );
};

export default Tile;
