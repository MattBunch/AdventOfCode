import { data } from "./input.js";

const starterChars = ["(", "[", "{", "<"];
const finisherChars = [")", "]", "}", ">"];

const addNum = (inputChar) => {
  switch (inputChar) {
    case ")":
      return 3;
    case "]":
      return 57;
    case "}":
      return 1197;
    case ">":
      return 25137;
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
  let output = 0;
  for (const [index, str] of input.entries()) {
    const arr = [];
    for (const char of str.split("")) {
      // console.log(char);
      if (starterChars.includes(char)) {
        arr.push(char);
        // console.log(index, arr);
        continue;
      }

      const lastSavedStarterChar = arr[arr.length - 1];
      const isMatch = matchChunk(lastSavedStarterChar) === char;
      console.log(index, isMatch, `${arr[arr.length - 1]} - ${char}`);
      // console.log(isMatch);
      if (isMatch) arr.pop();
      else {
        output += addNum(char);
        break;
      }

      // console.log(index, `${arr.pop()} - ${char}`);
      // console.log(`${arr[arr.length - 1]} - ${char}`);
    }
    console.log("\n");
  }
  return output;
};

console.log(findCorruptedLines(data));
