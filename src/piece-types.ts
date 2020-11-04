export enum Piece {
  I,
  O,
  T,
  J,
  L,
  S,
  Z,
}

// Yeah, yeah, transparent's not a real thing. But I'm gonna use it in so many places that I'm putting it here!
export enum BlockValue {
  EMPTY = 0,
  ACTIVE_1 = 1,
  ACTIVE_2 = 2,
  ACTIVE_3 = 3,
  TRANSPARENT_1 = 4,
  TRANSPARENT_2 = 5,
  TRANSPARENT_3 = 6,
}

export interface BlockPlace {
  row: number;
  column: number;
  value: BlockValue;
}

export interface ActivePiece {
  type: Piece;
  row: number;
  column: number;
  orientation: number;
  blocks: BlockPlace[];
}

export type Row = [
  BlockValue,
  BlockValue,
  BlockValue,
  BlockValue,
  BlockValue,
  BlockValue,
  BlockValue,
  BlockValue,
  BlockValue,
  BlockValue,
];
export type Grid = [
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
];
