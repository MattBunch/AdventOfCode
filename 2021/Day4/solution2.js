import bingoBoard from "./bingoBoard.js";
import { getInput } from "./getInput.js";

const game = (inputBingoBoards, inputSequence) => {
  for (const n of inputSequence) {
    for (const board of inputBingoBoards) {
      board.checkForMatch(n);
      if (board.checkForWin()) {
        board.markBoard();
        if (
          inputBingoBoards.filter((x) => x.marked).length ===
          inputBingoBoards.length
        )
          return { board, n };
      }
    }
  }

  return null;
};

const calculateOutput = (inputResult) => {
  if (inputResult === null) throw new Error("null input");

  const availableNumbers = inputResult.board.bingoNumbers.filter((obj) => {
    return !obj.marked;
  });

  let total = 0;
  for (let i in availableNumbers) {
    total += availableNumbers[i].num;
  }

  return total * inputResult.n;
};

const fileData = await getInput();

const size = 5;

console.log(
  calculateOutput(
    game(
      Array.from(fileData.boards, (x) => new bingoBoard(size, x)),
      fileData.sequence
    )
  )
);
