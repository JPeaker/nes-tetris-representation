import { Piece, ActivePiece, BlockPlace, Grid } from './piece-types';

export function movePiece(grid: Grid, currentPiece: ActivePiece, newPiece: ActivePiece): ActivePiece {
  const orientedNewPiece = getPiece(newPiece);

  const blocked = orientedNewPiece.blocks.some((block) => {
    return (
      block.row < 0 ||
      block.row >= 22 ||
      block.column < 0 ||
      block.column >= 10 ||
      (grid[block.row] && grid[block.row][block.column] !== 0)
    );
  });

  if (blocked) {
    return currentPiece;
  }

  return orientedNewPiece;
}

const getMap = {
  [Piece.O]: getO,
  [Piece.I]: getI,
  [Piece.T]: getT,
  [Piece.L]: getL,
  [Piece.J]: getJ,
  [Piece.S]: getS,
  [Piece.Z]: getZ,
};

export function getPiece(piece: Omit<ActivePiece, 'blocks'>): ActivePiece {
  return getMap[piece.type](piece.row, piece.column, piece.orientation);
}

export function getPieceGrid(piece: Piece): Grid {
  const pieceGrid = getMap[piece](0, 0, 0);
  const rows = pieceGrid.blocks.map((block) => block.row);
  const columns = pieceGrid.blocks.map((block) => block.column);

  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);
  const minColumn = Math.min(...columns);
  const maxColumn = Math.max(...columns);

  const grid: number[][] = [];

  for (let i = 0; i <= maxRow - minRow; i++) {
    const row: number[] = [];
    for (let j = 0; j <= maxColumn - minColumn; j++) {
      row.push(0);
    }
    grid.push(row);
  }

  pieceGrid.blocks.forEach((block) => {
    if (block.value) {
      grid[block.row - minRow][block.column - minColumn] = block.value;
    }
  });

  return grid as Grid;
}

function getO(row: number, column: number, orientation: number): ActivePiece {
  return {
    type: Piece.O,
    row,
    column,
    orientation,
    blocks: [
      { row, column, value: 3 },
      { row, column: column - 1, value: 3 },
      { row: row + 1, column, value: 3 },
      { row: row + 1, column: column - 1, value: 3 },
    ],
  };
}

function getI(row: number, column: number, orientation: number) {
  const blocks: BlockPlace[] = [];
  switch (orientation) {
    case 0:
    case 2:
      blocks.push({ row, column: column - 2, value: 3 });
      blocks.push({ row, column: column - 1, value: 3 });
      blocks.push({ row, column, value: 3 });
      blocks.push({ row, column: column + 1, value: 3 });
      break;
    case 1:
    case 3:
      blocks.push({ row: row - 2, column, value: 3 });
      blocks.push({ row: row - 1, column, value: 3 });
      blocks.push({ row, column, value: 3 });
      blocks.push({ row: row + 1, column, value: 3 });
      break;
    default:
      throw new Error('Unknown orientation');
  }

  return {
    type: Piece.I,
    row,
    column,
    orientation,
    blocks,
  };
}

function getT(row: number, column: number, orientation: number) {
  const blocks: BlockPlace[] = [];

  switch (orientation) {
    case 0:
      blocks.push({ row, column: column - 1, value: 3 });
      blocks.push({ row, column, value: 3 });
      blocks.push({ row, column: column + 1, value: 3 });
      blocks.push({ row: row + 1, column, value: 3 });
      break;
    case 1:
      blocks.push({ row: row - 1, column, value: 3 });
      blocks.push({ row, column: column + 1, value: 3 });
      blocks.push({ row, column, value: 3 });
      blocks.push({ row: row + 1, column, value: 3 });
      break;
    case 2:
      blocks.push({ row: row - 1, column, value: 3 });
      blocks.push({ row, column: column - 1, value: 3 });
      blocks.push({ row, column, value: 3 });
      blocks.push({ row, column: column + 1, value: 3 });
      break;
    case 3:
      blocks.push({ row: row - 1, column, value: 3 });
      blocks.push({ row, column: column - 1, value: 3 });
      blocks.push({ row, column, value: 3 });
      blocks.push({ row: row + 1, column, value: 3 });
      break;
    default:
      throw new Error('Unknown orientation');
  }

  return {
    type: Piece.T,
    row,
    column,
    orientation,
    blocks,
  };
}

function getL(row: number, column: number, orientation: number) {
  const blocks: BlockPlace[] = [];

  switch (orientation) {
    case 0:
      blocks.push({ row, column: column - 1, value: 1 });
      blocks.push({ row, column, value: 1 });
      blocks.push({ row, column: column + 1, value: 1 });
      blocks.push({ row: row + 1, column: column - 1, value: 1 });
      break;
    case 1:
      blocks.push({ row: row - 1, column, value: 1 });
      blocks.push({ row, column, value: 1 });
      blocks.push({ row: row + 1, column, value: 1 });
      blocks.push({ row: row + 1, column: column + 1, value: 1 });
      break;
    case 2:
      blocks.push({ row: row - 1, column: column + 1, value: 1 });
      blocks.push({ row, column: column - 1, value: 1 });
      blocks.push({ row, column, value: 1 });
      blocks.push({ row, column: column + 1, value: 1 });
      break;
    case 3:
      blocks.push({ row: row - 1, column, value: 1 });
      blocks.push({ row: row - 1, column: column - 1, value: 1 });
      blocks.push({ row, column, value: 1 });
      blocks.push({ row: row + 1, column, value: 1 });
      break;
    default:
      throw new Error('Unknown orientation');
  }

  return {
    type: Piece.L,
    row,
    column,
    orientation,
    blocks,
  };
}

function getJ(row: number, column: number, orientation: number) {
  const blocks: BlockPlace[] = [];

  switch (orientation) {
    case 0:
      blocks.push({ row, column: column - 1, value: 2 });
      blocks.push({ row, column, value: 2 });
      blocks.push({ row, column: column + 1, value: 2 });
      blocks.push({ row: row + 1, column: column + 1, value: 2 });
      break;
    case 1:
      blocks.push({ row: row - 1, column, value: 2 });
      blocks.push({ row: row - 1, column: column + 1, value: 2 });
      blocks.push({ row, column, value: 2 });
      blocks.push({ row: row + 1, column, value: 2 });
      break;
    case 2:
      blocks.push({ row: row - 1, column: column - 1, value: 2 });
      blocks.push({ row, column: column - 1, value: 2 });
      blocks.push({ row, column, value: 2 });
      blocks.push({ row, column: column + 1, value: 2 });
      break;
    case 3:
      blocks.push({ row: row - 1, column, value: 2 });
      blocks.push({ row, column, value: 2 });
      blocks.push({ row: row + 1, column, value: 2 });
      blocks.push({ row: row + 1, column: column - 1, value: 2 });
      break;
    default:
      throw new Error('Unknown orientation');
  }

  return {
    type: Piece.J,
    row,
    column,
    orientation,
    blocks,
  };
}

function getS(row: number, column: number, orientation: number) {
  const blocks: BlockPlace[] = [];

  switch (orientation) {
    case 0:
    case 2:
      blocks.push({ row, column, value: 2 });
      blocks.push({ row, column: column + 1, value: 2 });
      blocks.push({ row: row + 1, column, value: 2 });
      blocks.push({ row: row + 1, column: column - 1, value: 2 });
      break;
    case 1:
    case 3:
      blocks.push({ row: row - 1, column, value: 2 });
      blocks.push({ row, column, value: 2 });
      blocks.push({ row, column: column + 1, value: 2 });
      blocks.push({ row: row + 1, column: column + 1, value: 2 });
      break;
    default:
      throw new Error('Unknown orientation');
  }

  return {
    type: Piece.S,
    row,
    column,
    orientation,
    blocks,
  };
}

function getZ(row: number, column: number, orientation: number) {
  const blocks: BlockPlace[] = [];

  switch (orientation) {
    case 0:
    case 2:
      blocks.push({ row, column: column - 1, value: 1 });
      blocks.push({ row, column, value: 1 });
      blocks.push({ row: row + 1, column, value: 1 });
      blocks.push({ row: row + 1, column: column + 1, value: 1 });
      break;
    case 1:
    case 3:
      blocks.push({ row: row - 1, column: column + 1, value: 1 });
      blocks.push({ row, column, value: 1 });
      blocks.push({ row, column: column + 1, value: 1 });
      blocks.push({ row: row + 1, column, value: 1 });
      break;
    default:
      throw new Error('Unknown orientation');
  }

  return {
    type: Piece.Z,
    row,
    column,
    orientation,
    blocks,
  };
}
