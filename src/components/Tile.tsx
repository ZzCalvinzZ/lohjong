import * as PIXI from "pixi.js";
import { PixiComponent } from "@inlet/react-pixi";

type TileProps = { x: number; y: number; width: number; height: number; color: number };

const Tile = PixiComponent<TileProps, PIXI.Graphics>("Tile", {
  create() {
    return new PIXI.Graphics();
  },
  applyProps(ins: PIXI.Graphics, oldProps: TileProps, newProps: TileProps) {
    ins.clear();
    ins.beginFill(newProps.color);
    ins.drawRect(newProps.x, newProps.y, newProps.width, newProps.height);
    ins.endFill();
  },
});

export default Tile;
