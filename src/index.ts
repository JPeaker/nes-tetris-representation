import * as PasteHandler from './paste-handler';
import * as MovePiece from './move-piece';
import * as PieceTypes from './piece-types';

export default {
  ...PasteHandler,
  ...MovePiece,
  ...PieceTypes,
};
