import { data } from "./input.js";

const starterChars = ["(", "[", "{", "<"];
const finisherChars = [")", "]", "}", ">"];

const addNum = (inputChar) => {
  switch (inputChar) {
    case ")":
      return 1;
    case "]":
      return 2;
    case "}":
      return 3;
    case ">":
      return 4;
  }
};

const matchChunk = (inputChar) => {
  switch (inputChar) {
    case "(":
      return ")";
    case "[":
      return "]";
    case "{":
      return "}";
    case "<":
      return ">";
  }
};

const findCorruptedLines = (input) => {
  const scores = [];
  for (const str of input) {
    const arr = [];
    let isCorrupted = false;
    for (const char of str.split("")) {
      if (starterChars.includes(char)) {
        arr.push(char);
        continue;
      }

      // * for finding corrupted lines and discarding them
      if (matchChunk(arr[arr.length - 1]) === char) arr.pop();
      else {
        isCorrupted = true;
        break;
      }
    }
    if (isCorrupted) continue;

    let score = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
      score *= 5;
      score += addNum(matchChunk(arr[i]));
    }
    scores.push(score);
  }
  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
};

console.log(findCorruptedLines(data));
