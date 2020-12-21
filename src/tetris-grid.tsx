import React from 'react';
import { ActivePiece, BlockValue, ColumnIndex, Grid, RowIndex } from 'nes-tetris-representation';
import './representation.css';
import Block, { BlockProps } from './block';
import _ from 'lodash';

type GetBlockFunction = (row: RowIndex, column: ColumnIndex, value: BlockValue) => Partial<BlockProps>;

interface TetrisGridProps {
  grid: Grid;
  beforeGrid?: Grid | null;
  possiblePiece?: ActivePiece;
  getBlockProps?: GetBlockFunction;
  blockSizeInRem?: number;
  onClick?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  hideTopTwoRows?: boolean;
}

function getRow(row: RowIndex, blocks: BlockValue[], beforeBlocks: BlockValue[] | null, blockSizeInRem: number, getBlockProps: GetBlockFunction | undefined) {
  const width = blocks.length ? `${100 / blocks.length}%` : 'auto';
  return (
    <div className="tetris-row" key={row} style={{ height: `${blockSizeInRem}rem` }}>
      {
        blocks.map((block, blockIndex) =>
          <Block
            key={row * 20 + blockIndex}
            row={row}
            column={blockIndex}
            value={block}
            width={width}
            showDiff={!!beforeBlocks && !!block && !beforeBlocks[blockIndex]}
            {...(getBlockProps === undefined ? undefined : getBlockProps(row, blockIndex as ColumnIndex, block))}
          />)
      }
    </div>
  );
}

export function TetrisGrid({
  grid,
  beforeGrid = null,
  possiblePiece,
  blockSizeInRem = 2,
  onClick,
  onMouseLeave,
  getBlockProps,
  hideTopTwoRows = true,
  className,
}: TetrisGridProps) {
  let adjustedBeforeGrid: Grid | null = beforeGrid;
  let adjustedGrid: Grid = grid;

  if (possiblePiece) {
    adjustedBeforeGrid = grid;
    adjustedGrid = _.cloneDeep(grid);
    possiblePiece.blocks.forEach(block => {
      adjustedGrid[block.row][block.column] = block.value;
    })
  }

  const numberOfRows = grid.length - (hideTopTwoRows ? 2 : 0);
  const numberOfColumns = Math.max(...grid.map(row => row.length));
  const width = blockSizeInRem * numberOfColumns;
  const height = blockSizeInRem * numberOfRows;

  return (
    <div style={{ height: `${height}rem`, width: `${width}rem` }} onClick={onClick} onMouseLeave={onMouseLeave} className={className}>
      {
        adjustedGrid.map((row, rowKey) => {
          return hideTopTwoRows && rowKey < 2
            ? null
            : getRow(rowKey as RowIndex, row, adjustedBeforeGrid ? adjustedBeforeGrid[rowKey] : null, blockSizeInRem, getBlockProps)
        })
      }
    </div>
  );
}
