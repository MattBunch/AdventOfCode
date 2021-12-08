import * as fs from "fs";
import * as readline from "readline";

const getInput = async () => {
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

export { getInput };
