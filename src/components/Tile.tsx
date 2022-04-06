import * as PIXI from "pixi.js";
import { PixiComponent } from "@inlet/react-pixi";
import { Container, Text } from "@inlet/react-pixi";
import TileClass from "engine/tile";

export const TILE_WIDTH = 50;
export const TILE_HEIGHT = 75;

type RectProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  lineColor: number;
  fillColor: number;
};

const Rect = PixiComponent<RectProps, PIXI.Graphics>("Tile", {
  create() {
    return new PIXI.Graphics();
  },
  applyProps(ins: PIXI.Graphics, oldProps: RectProps, newProps: RectProps) {
    ins.clear();
    ins.lineStyle(2, newProps.lineColor);
    ins.beginFill(newProps.fillColor);
    ins.drawRect(newProps.x, newProps.y, newProps.width, newProps.height);
    ins.endFill();
  },
});

type TileProps = {
  x: number;
  y: number;
  number: string;
  suit: string;
  onClick: (tile: TileClass, event: PIXI.DisplayObject) => void;
  fillColor?: number;
  tile: TileClass;
};

const Tile = ({ x, y, number, suit, onClick, fillColor = 0xffffff, tile }: TileProps) => {
  return (
    <Container x={x} y={y} interactive={true} pointerdown={(event) => onClick(tile, event.currentTarget)}>
      <Rect x={0} y={0} width={TILE_WIDTH} height={TILE_HEIGHT} fillColor={fillColor} lineColor={0x000000} />
      <Text text={number} anchor={0.5} x={TILE_WIDTH / 2} y={TILE_HEIGHT / 3} style={{ fontSize: 16 }} />
      <Text text={suit} anchor={0.5} x={TILE_WIDTH / 2} y={TILE_HEIGHT / 2} style={{ fontSize: 12 }} />
    </Container>
  );
};

export default Tile;
