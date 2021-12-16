import { data } from "./input.js";

const starterChars = ["(", "[", "{", "<"];
const finisherChars = [")", "]", "}", ">"];

const rx1 = /\[([^\]]+)]/;
const rx2 = /\(([^)]+)\)/;
const rx3 = /{([^}]+)}/;
const rx4 = /{([^>]+)}/;

class Chunk {
  constructor(sequence) {
    this.sequence = sequence;
    this.isComplete = false;
    this.chunks = [];
  }

  getAllChunks() {}
}

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
  for (const str of input) {
    new Chunk(str).getAllChunks();
  }
  return "";
};

console.log(findCorruptedLines(data));

// const counter = new Array(4).fill(0);
// console.log(counter);
// switch (char) {
//   case "(":
//     counter[0]++;
//     break;
//   case "[":
//     counter[1]++;
//     break;
//   case "{":
//     counter[2]++;
//     break;
//   case "<":
//     counter[3]++;
//     break;
//   case ")":
//     counter[0]--;
//     break;
//   case "]":
//     counter[1]--;
//     break;
//   case "}":
//     counter[2]--;
//     break;
//   case ">":
//     counter[3]--;
//     break;
// }
