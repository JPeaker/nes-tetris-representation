import PasteHandler from './paste-handler';
import * as MovePiece from './move-piece';
import * as PieceTypes from './piece-types';

export default {
  PasteHandler,
  movePiece: MovePiece.movePiece,
  getPiece: MovePiece.getPiece,
  getPieceGrid: MovePiece.getPieceGrid,
  Piece: PieceTypes.Piece,
  BlockValue: PieceTypes.BlockValue,
};
