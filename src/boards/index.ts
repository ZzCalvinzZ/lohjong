import turtle from "./turtle";
import { BoardIds, BoardType } from "./types";

const boards: Record<BoardIds, BoardType> = {
  [BoardIds.Turtle]: turtle,
};

export default boards;
