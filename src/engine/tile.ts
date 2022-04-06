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
  x: number;
  y: number;
  z: number;
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
    this.x = -10
    this.y = -10
    this.z = -10
  }

  place({ z, x, y }: { z: number; x: number; y: number }) {
    this.z = z
    this.x = x
    this.y = y
  }

  get tileCells() {
    return [
      {
        z: this.z,
        x: this.x,
        y: this.y,
      },
      {
        z: this.z,
        x: this.x + 1,
        y: this.y,
      },
      {
        z: this.z,
        x: this.x,
        y: this.y + 1,
      },
      {
        z: this.z,
        x: this.x + 1,
        y: this.y + 1,
      },
    ];
  }

  get id() {
    return `${this.suit}_${this.number}_${this.x}_${this.y}_${this.z}`;
  }

  tileIsAdjacent(tile: Tile) {
    const t1Cells = this.tileCells;
    const t2Cells = tile.tileCells;

    let isAdjacent = false;

    t1Cells.forEach((t1) => {
      t2Cells.forEach((t2) => {
        // tile is above or below
        if ((t1.z === t2.z - 1 || t1.z === t2.z + 1) && t1.x === t2.x && t1.y === t2.y) {
          isAdjacent = true;
        }

        // tile is to the left or the right
        if (t1.z === t2.z && t1.y === t2.y && (t1.x === t2.x - 1 || t1.x === t2.x + 1)) {
          isAdjacent = true;
        }
      });
    });

    return isAdjacent;
  }
}
