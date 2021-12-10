import { data } from "./input.js";

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

const createBoard = (size) => {
  const output = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      output.push(new Node(j, i, "."));
    }
  }
  return output;
};

const printBoard = (inputBoard) => {
  const len = inputBoard.length / 10;
  let counter = 0;
  for (let i = 0; i < len; i++) {
    let printStr = "";
    for (let j = 0; j < len; j++) {
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

let x1, x2, y1, y2;

const board = createBoard(10);
const r = /\d+/g;

// printBoard(board);

const getHydrothermalVenture = (input) => {
  const xyPointsContainer = [];
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
        let dist1, dist2;
        if (vertical) {
          if (y1 < y2) {
            xyPointsContainer.push(`${x1}, ${y2}`);
            dist1 = y1;
            dist2 = y2;
          } else {
            xyPointsContainer.push(`${x1}, ${y1}`);
            dist1 = y2;
            dist2 = y1;
          }
        } else {
          if (x1 < x2) {
            dist1 = x1;
            dist2 = x2;
            xyPointsContainer.push(`${x2}, ${y1}`);
          } else {
            dist1 = x2;
            dist2 = x1;
            xyPointsContainer.push(`${x1}, ${y1}`);
          }
        }

        for (let i = dist1; i < dist2; i++) {
          if (vertical) {
            xyPointsContainer.push(`${x1.toString()}, ${i.toString()}`);
          } else {
            xyPointsContainer.push(`${i.toString()}, ${y1.toString()}`);
          }
        }
      };

      // * moving vertical
      // * horizontal x axis stays the same
      if (x1 === x2) {
        getXYPoints(true);
      }

      // * horizontal
      // * vertical y axis stays the same
      if (y1 === y2) {
        getXYPoints(false);
      }
    };

    getMoves();
  }

  // console.log("xyPointsContainer", xyPointsContainer);

  for (const move of xyPointsContainer) {
    // console.log(move);
    // console.log(move.match(r));
    const x = parseInt(move.match(r)[0]);
    const y = parseInt(move.match(r)[1]);
    // console.log(x, y);
    getNodeOnBoardByXY(x, y, board).increaseMove();
  }

  printBoard(board);

  let output = 0;
  for (const n of board) {
    if (n.isTwoLinesOverlapping()) {
      output++;
    }
  }

  return output;
};

console.log(getHydrothermalVenture(data));
