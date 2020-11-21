import Block from './block';
import * as MovePiece from './move-piece';
import addPastingFunctionality from './paste-handler';
import PieceSelector from './PieceSelector';
import PlacePieces from './PlacePieces';
import TetrisGrid from './tetris-grid';

import handler from './choose-piece-input-handler';

console.log(handler({ code: 'KeyL' } as KeyboardEvent, false));

export default {
  Block,
  ...MovePiece,
  addPastingFunctionality,
  PieceSelector,
  PlacePieces,
  TetrisGrid,
};

