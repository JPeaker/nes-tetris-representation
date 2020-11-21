import React, { MouseEvent } from 'react';
import classnames from 'classnames';
import './representation.css';
import filledGrid from './filled-grid';

export interface BlockProps {
  row: number;
  column: number;
  value: number;
  width?: string;
  disabled?: boolean;
  nearInvisible?: boolean;
  slightlyHidden?: boolean;
  showDiff?: boolean;
  onMouseEnter?: (event: MouseEvent) => void;
  onClick?: (event: MouseEvent) => void;
}
function Block({ value, nearInvisible, slightlyHidden, showDiff, row, column, onMouseEnter, onClick, disabled, width }: BlockProps) {
  const adjustedValue = slightlyHidden ? filledGrid[row][column] : value;
  return (
    <div
      key={column}
      draggable="true"
      style={{ width }}
      onMouseEnter={onMouseEnter}
      onMouseDown={disabled ? undefined : onClick}
      className={classnames({
        block: true,
        hidden: !nearInvisible && !slightlyHidden && !value,
        [`block-${adjustedValue}`]: true,
        'near-invisible': nearInvisible,
        'slightly-hidden': slightlyHidden || disabled,
        'show-diff': showDiff,
      })}
      onDragEnter={onClick}
    />
  );
}

export default Block;
