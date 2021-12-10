import { data } from "./input.js";

const calculateOutput = (inputArr) => {
  let gamma = "";
  let epsilon = "";
  let zeroes = 0;
  let ones = 0;
  const wordLength = inputArr[0].length;
  for (let i = 0; i < wordLength; i++) {
    for (const str of inputArr) {
      const c = str.charAt(i);
      if (c === "0") zeroes++;
      else ones++;
    }
    if (zeroes > ones) {
      gamma += "0";
      epsilon += "1";
    } else {
      gamma += "1";
      epsilon += "0";
    }
    zeroes = 0;
    ones = 0;
  }
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

console.log(calculateOutput(data));
