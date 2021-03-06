import React from 'react';
import './representation.css';
import { Piece, getPieceGrid,  } from 'nes-tetris-representation';
import { TetrisGrid } from './tetris-grid';
import choosePieceInputHandler from './choose-piece-input-handler';

interface PieceSelectorProps {
  piece: Piece | null;
  setPiece: (piece: Piece) => void;
};

class PieceSelector extends React.Component<PieceSelectorProps> {
  constructor(props: PieceSelectorProps) {
    super(props);

    this.setPieceFromInput = this.setPieceFromInput.bind(this);
  }

  setPieceFromInput(event: KeyboardEvent): void {
    const piece = choosePieceInputHandler(event);

    if (piece !== null) {
      this.props.setPiece(piece);
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.setPieceFromInput);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.setPieceFromInput);
  }

  drawPiece(piece: Piece, width: (6 | 12) = 6) {
    return (
      <div className={`piece-selector-grid-item grid-item-${width}`}>
        <TetrisGrid
          grid={getPieceGrid(piece)}
          blockSizeInRem={1.5}
          onClick={() => this.props.setPiece(piece)}
          className={`piece-selector-selectable-piece selectable-piece${this.props.piece === piece ? ' selected-piece' : ''}`}
          hideTopTwoRows={false}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="piece-selector-container">
        { this.drawPiece(Piece.L) }
        { this.drawPiece(Piece.J) }
        { this.drawPiece(Piece.Z) }
        { this.drawPiece(Piece.S) }
        { this.drawPiece(Piece.O) }
        { this.drawPiece(Piece.T) }
        { this.drawPiece(Piece.I, 12) }
      </div>
    );
  }
}

export default PieceSelector;
