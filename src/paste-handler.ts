import { BlockValue, Grid } from './piece-types';

/*
 * Heavily drawn from https://github.com/GregoryCannon/TetrisTrainer/blob/master/src/board_loader.js by GregoryCannon,
 * used with permission.
 *
 * Thank you Greg!
 *
 * I'll admit, I took most of this code without really refactoring it, just turning it into Typescript and "pure-ing it up a bit".
 * As a result, it looks a fair bit different to the rest of the codebase. Maybe one day I'll refactor it. But today is not that day.
 *
 * This class allows you to paste an image from a clipboard and convert that into a Tetris grid.
 */
export class PasteHandler {
  pasteAreaElement: HTMLDivElement;
  pastedImageElement: HTMLImageElement;
  dummyCanvas: HTMLCanvasElement;
  callback: (grid: Grid) => void;

  loadedStateFromImage = false;

  constructor(
    pasteAreaElement: HTMLDivElement,
    pastedImageElement: HTMLImageElement,
    dummyCanvas: HTMLCanvasElement,
    callback: (grid: Grid) => void,
  ) {
    this.pasteAreaElement = pasteAreaElement;
    this.pastedImageElement = pastedImageElement;
    this.dummyCanvas = dummyCanvas;
    this.callback = callback;

    this.setup();
  }

  setup() {
    const that = this;
    // When an image is pasted, get the board state from it
    this.pasteAreaElement.onpaste = (event: ClipboardEvent) => {
      // use event.originalEvent.clipboard for newer chrome versions
      const { items } = event.clipboardData!;
      // find pasted image among pasted items
      let blob = null;
      // tslint:disable-next-line prefer-for-of
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') === 0) {
          blob = items[i].getAsFile();
        }
      }
      // load image if there is a pasted image
      if (blob !== null) {
        const reader = new FileReader();
        reader.onload = (onLoadEvent) => {
          that.pastedImageElement.onload = () => {
            that.callback(that.getBoardStateFromImage(that.pastedImageElement));
          };
          that.pastedImageElement.src = onLoadEvent.target!.result as string;
        };
        reader.readAsDataURL(blob);
      }
    };
  }

  getBoardStateFromImage(img: HTMLImageElement): Grid {
    const board: BlockValue[][] = [];
    const context = this.dummyCanvas.getContext('2d')!;
    this.dummyCanvas.width = img.width;
    this.dummyCanvas.height = img.height;
    context.drawImage(img, 0, 0);

    const cropOffset = -0.3;
    const SQ = (img.height / 20 + img.width / 10) / 2 + cropOffset;
    const rgbEmptyThreshold = 60; // If all three channels are <60/255, then the cell is "empty"

    // Iterate over the image and read the square colors into the board
    for (let c = 0; c < 10; c++) {
      for (let r = 0; r < 20; r++) {
        // First two invisible rows should be empty
        if (!board[r]) {
          board.push([]);
        }

        const x = Math.round((c + 0.5) * SQ);
        const y = Math.round((r + 0.5) * SQ);
        const pixelData = context.getImageData(x, y, 1, 1).data;

        if (Math.max(pixelData[0], pixelData[1], pixelData[2]) > rgbEmptyThreshold) {
          let blockValue: BlockValue;
          const randomValue = Math.random();
          if (randomValue > 5 / 7) {
            blockValue = BlockValue.ACTIVE_1;
          } else if (randomValue > 3 / 7) {
            blockValue = BlockValue.ACTIVE_2;
          } else {
            blockValue = BlockValue.ACTIVE_3;
          }
          board[r][c] = blockValue;
        } else {
          board[r][c] = BlockValue.EMPTY;
        }
      }
    }

    this.clearFloatingPiece(board as Grid);

    const extraRowOne = [];
    for (let c = 0; c < 10; c++) {
      extraRowOne.push(0);
    }

    const extraRowTwo = [];
    for (let c = 0; c < 10; c++) {
      extraRowTwo.push(0);
    }

    board.unshift(extraRowOne);
    board.unshift(extraRowTwo);

    return board as Grid;
  }

  clearFloatingPiece(board: Grid) {
    // Start from the bottom, look for an empty row, and then clear all rows above that
    let startedClearing = false;
    for (let r = 19; r >= 0; r--) {
      if (startedClearing) {
        for (let c = 0; c < 10; c++) {
          board[r][c] = 0;
        }
      } else {
        let rowEmpty = true;
        for (let c = 0; c < 10; c++) {
          if (board[r][c] !== 0) {
            rowEmpty = false;
            break;
          }
        }
        if (rowEmpty) {
          startedClearing = true;
        }
      }
    }
  }
}

export const setUpPasting = (
  pasteAreaElement: HTMLDivElement,
  pastedImageElement: HTMLImageElement,
  dummyCanvas: HTMLCanvasElement,
  callback: (grid: Grid) => void,
) => new PasteHandler(
  pasteAreaElement,
  pastedImageElement,
  dummyCanvas,
  callback,
);