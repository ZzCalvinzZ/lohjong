export enum BoardIds {
  Turtle = "turtle",
}

export type BoardLayoutType = 0 | 1
export type BoardLayerType = Array<Array<BoardLayoutType>>

export type BoardType = {
  id: BoardIds
  tiles: number
  tilemap: BoardLayerType[]
}
