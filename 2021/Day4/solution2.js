import bingoBoard from "./bingoBoard.js";
import { getInput } from "./getInput.js";

const game = (inputBingoBoards, inputSequence) => {
  for (const n of inputSequence) {
    for (const board of inputBingoBoards) {
      // console.log(board.bingoNumbers);
      board.checkForMatch(n);
      if (board.checkForWin()) {
        board.markBoard();
        const isEveryBoardMarked = () => {
          return (
            inputBingoBoards.filter((x) => x.marked).length ===
            inputBingoBoards.length
          );
        };
        if (isEveryBoardMarked()) {
          console.log(board);
          console.log(n);
          return { board, n };
        }
      }
    }
  }

  return null;
};

const calculateOutput = (inputResult) => {
  // console.log(inputResult.n);
  // console.log(inputResult.board);
  // console.log(inputResult.board.bingoNumbers);

  const availableNumbers = inputResult.board.bingoNumbers.filter((obj) => {
    return !obj.marked;
  });

  let total = 0;
  for (let i in availableNumbers) {
    total += availableNumbers[i].num;
  }

  console.log(total);

  return total * inputResult.n;
};

const fileData = await getInput();

const size = 5;
const inputBoards = Array.from(fileData.boards, (x) => new bingoBoard(size, x));

// console.log(calculateOutput(game(inputBoards, fileData.sequence)));

// DEBUG:
const debugBoards = [
  [
    22, 13, 17, 11, 0, 8, 2, 23, 4, 24, 21, 9, 14, 16, 7, 6, 10, 3, 18, 5, 1,
    12, 20, 15, 19,
  ],
  [
    3, 15, 0, 2, 22, 9, 18, 13, 17, 5, 19, 8, 7, 25, 23, 20, 11, 10, 24, 4, 14,
    21, 16, 12, 6,
  ],
  [
    14, 21, 17, 24, 4, 10, 16, 15, 9, 19, 18, 8, 23, 26, 20, 22, 11, 13, 6, 5,
    2, 0, 12, 3, 7,
  ],
];

console.log(
  calculateOutput(
    game(
      Array.from(debugBoards, (x) => new bingoBoard(size, x)),
      [
        7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22,
        18, 20, 8, 19, 3, 26, 1,
      ]
    )
  )
);
