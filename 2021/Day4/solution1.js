import bingoBoard from "./bingoBoard.js";

const game = (inputBingoBoards, inputSequence) => {
  for (const n of inputSequence) {
    for (const board of inputBingoBoards) {
      board.checkForMatch(n);
      if (board.checkForWin()) return { board, n };
    }
    console.log(inputBingoBoards.map((x) => x.bingoNumbers));
  }

  return null;
};

const calculateOutput = (inputResult) => {
  const availableNumbers = inputResult.board.bingoNumbers.filter((obj) => {
    return !obj.marked;
  });

  let total = 0;
  for (let i in availableNumbers) {
    total += availableNumbers[i].num;
  }

  return total * inputResult.n;
};

// TODO: read file

import * as fs from "fs";
import * as readline from "readline";
// const fs = require("fs");
// const readline = require("readline");

const processLineByLine = async () => {
  const fileStream = fs.createReadStream("2021/Day4/input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const output = {
    sequence: null,
    boards: [],
  };

  let lineCounter = 0;

  let newBoard = [];
  for await (const line of rl) {
    lineCounter++;

    // * line sequence
    if (lineCounter === 1) {
      output.sequence = JSON.parse(`[${line}]`);
      continue;
    }

    if (line.length === 0) {
      output.boards.push(newBoard);
      newBoard = [];
    }

    for (const l of line.split(/\s+/)) {
      const num = parseInt(l);
      if (!isNaN(num)) newBoard.push(num);
    }
  }

  output.boards.push(newBoard);
  return output;
};

const fileData = await processLineByLine();

const size = 5;

console.log(
  calculateOutput(
    game(
      Array.from(fileData.boards, (x) => new bingoBoard(size, x)),
      fileData.sequence
    )
  )
);
