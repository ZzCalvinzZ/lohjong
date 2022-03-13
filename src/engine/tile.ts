type TilePropTypes = {
  number: string;
  suit: string;
};

type DotNumber = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"; // 4 tiles per dot (36)
type BamNumber = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"; // 4 tiles per bam (36)
type CrakNumber = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"; // 4 tiles per crak (36)
type WindNumber = "East" | "West" | "South" | "North"; // 4 tiles per wind (16)
type DragonNumber = "White" | "Green" | "Red"; // 4 tiles per wind (12)
type FlowerNumber = "Rose" | "Lily" | "Tulip" | "Juniper"; // 2 tiles per flower (8)

export type Number = DotNumber | BamNumber | CrakNumber | WindNumber | DragonNumber | FlowerNumber;

export enum Suit {
  Dot = "DOT",
  Bam = "BAM",
  Crak = "CRAK",
  Wind = "WIND",
  Dragon = "DRAGON",
  Flower = "FLOWER",
}

export default class Tile {
  x?: number;
  y?: number;
  z?: number;
  number: string;
  suit: string;
  static dotNumbers: DotNumber[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  static bamNumbers: BamNumber[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  static crakNumbers: CrakNumber[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  static windNumbers: WindNumber[] = ["East", "West", "South", "North"];
  static dragonNumbers: DragonNumber[] = ["White", "Green", "Red"];
  static flowerNumbers: FlowerNumber[] = ["Rose", "Lily", "Tulip", "Juniper"];

  constructor(number: Number, suit: Suit) {
    this.number = number;
    this.suit = suit;
  }
}
