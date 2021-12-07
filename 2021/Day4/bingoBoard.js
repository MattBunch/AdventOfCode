import bingoNumber from "./bingoNumber.js";

export default class bingoBoard {
  constructor(boardSize, inputNums) {
    this.columns = [...Array(boardSize).keys()];
    this.rows = [...Array(boardSize).keys()];
    this.bingoNumbers = [];
    let counter = 0;
    for (const column of this.columns) {
      for (const row of this.rows) {
        this.bingoNumbers.push(
          new bingoNumber(inputNums[counter], false, column, row)
        );
        counter++;
      }
    }
    this.boardSize = boardSize;
  }

  checkForWin() {
    const checkArr = (inputArr, col) => {
      const markCount = [];
      for (const i of inputArr) {
        markCount.length = 0;
        for (const bingoNumberObj of this.bingoNumbers) {
          const bingoNumberColOrRow = col
            ? bingoNumberObj.column
            : bingoNumberObj.row;

          if (bingoNumberColOrRow === i) {
            if (bingoNumberObj.marked) markCount.push(bingoNumberObj);
            else markCount.length = 0;
          }
          if (markCount.length === this.boardSize) {
            return true;
          }
        }
      }
    };

    // return bool
    return checkArr(this.columns, true) || checkArr(this.rows, false);
  }

  checkForMatch(inputN) {
    for (const bingoNumberObj of this.bingoNumbers) {
      if (inputN === bingoNumberObj.num) bingoNumberObj.marked = true;
    }
  }
}
