import { data } from "./input.js";
const r = /\d+/g;

class Node {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
  }

  increaseMove() {
    if (this.value === ".") this.value = 0;
    this.value++;
  }

  isTwoLinesOverlapping() {
    return this.value >= 2;
  }
}

const getLargestNumber = (input) => {
  let output = 0;
  for (const str of input) {
    for (const num of str.match(r)) {
      if (parseInt(num) > output) output = parseInt(num);
    }
  }
  return output;
};

const createBoard = (size) => {
  const output = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      output.push(new Node(j, i, "."));
    }
  }
  return output;
};

const board = createBoard(getLargestNumber(data) + 1);

const printBoard = (inputBoard) => {
  const len = inputBoard.length / 10;
  let counter = 0;
  for (let i = 0; i < len; i++) {
    let printStr = "";
    for (let j = 0; j < len; j++) {
      if (inputBoard[counter] != undefined)
        printStr += inputBoard[counter].value;
      counter++;
    }
    console.log(printStr);
  }
};

const getNodeOnBoardByXY = (inputX, inputY, inputBoard) => {
  for (const node of inputBoard) {
    if (node.x === inputX && node.y === inputY) return node;
  }
};

const getHydrothermalVenture = (input) => {
  const xyPointsContainer = [];

  let x1, x2, y1, y2;

  for (const str of input) {
    const arr = str.match(r);
    x1 = parseInt(arr[0]);
    y1 = parseInt(arr[1]);
    x2 = parseInt(arr[2]);
    y2 = parseInt(arr[3]);

    const getMoves = () => {
      const getXYPoints = (vertical) => {
        // * dist1 = starting
        // * dist2 = finishing
        let starting, destination;
        if (vertical) {
          if (y1 < y2) {
            xyPointsContainer.push(`${x1}, ${y2}`);
            starting = y1;
            destination = y2;
          } else {
            xyPointsContainer.push(`${x1}, ${y1}`);
            starting = y2;
            destination = y1;
          }
        } else {
          if (x1 < x2) {
            starting = x1;
            destination = x2;
            xyPointsContainer.push(`${x2}, ${y1}`);
          } else {
            starting = x2;
            destination = x1;
            xyPointsContainer.push(`${x1}, ${y1}`);
          }
        }

        for (let i = starting; i < destination; i++) {
          if (vertical) {
            xyPointsContainer.push(`${x1.toString()}, ${i.toString()}`);
          } else {
            xyPointsContainer.push(`${i.toString()}, ${y1.toString()}`);
          }
        }
      };

      const getXYPointsDiagonal = () => {
        const isPositive = (inputNum) => {
          return inputNum > 0;
        };
        const isNegative = (inputNum) => {
          return inputNum < 0;
        };

        const xDif = x2 - x1;
        const yDif = y2 - y1;
        const distance = Math.abs(xDif);

        const holdingXs = [];
        const holdingYs = [];
        // * Up Left
        if (isNegative(xDif) && isNegative(yDif)) {
          // * Up Left
          for (let i = x1; i >= x2; i--) {
            holdingXs.push(i);
          }
          for (let j = y1; j >= y2; j--) {
            holdingYs.push(j);
          }
          for (let i = 0; i < distance; i++) {
            xyPointsContainer.push(`${holdingXs[i]}, ${holdingYs[i]}`);
          }
          xyPointsContainer.push(`${x2}, ${y2}`);
        }

        // * Up Right
        if (isPositive(xDif) && isNegative(yDif)) {
          // * Up Right
          for (let i = x1; i < x2; i++) {
            holdingXs.push(i);
          }
          for (let j = y1; j >= y2; j--) {
            holdingYs.push(j);
          }
          for (let i = 0; i < distance; i++) {
            xyPointsContainer.push(`${holdingXs[i]}, ${holdingYs[i]}`);
          }
          xyPointsContainer.push(`${x2}, ${y2}`);
        }

        // * Down Left
        if (isNegative(xDif) && isPositive(yDif)) {
          // * Down Left
          for (let i = x1; i >= x2; i--) {
            holdingXs.push(i);
          }
          for (let j = y1; j < y2; j++) {
            holdingYs.push(j);
          }
          for (let i = 0; i < distance; i++) {
            xyPointsContainer.push(`${holdingXs[i]}, ${holdingYs[i]}`);
          }
          xyPointsContainer.push(`${x2}, ${y2}`);
        }
        // * Down Right
        if (isPositive(xDif) && isPositive(yDif)) {
          for (let i = x1; i < x2; i++) {
            holdingXs.push(i);
          }
          for (let j = y1; j < y2; j++) {
            holdingYs.push(j);
          }
          for (let i = 0; i < distance; i++) {
            xyPointsContainer.push(`${holdingXs[i]}, ${holdingYs[i]}`);
          }
          xyPointsContainer.push(`${x2}, ${y2}`);
        }
      };

      // * moving vertical
      // * horizontal x axis stays the same
      if (x1 === x2) getXYPoints(true);
      // * horizontal
      // * vertical y axis stays the same
      else if (y1 === y2) getXYPoints(false);
      // * diagonal
      else getXYPointsDiagonal();
    };

    getMoves();
  }

  for (const move of xyPointsContainer) {
    const x = parseInt(move.match(r)[0]);
    const y = parseInt(move.match(r)[1]);

    getNodeOnBoardByXY(x, y, board).increaseMove();
  }

  // printBoard(board);

  let output = 0;
  for (const n of board) {
    if (n.isTwoLinesOverlapping()) output++;
  }

  return output;
};

console.log(getHydrothermalVenture(data));
