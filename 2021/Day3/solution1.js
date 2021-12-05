import { data } from "./input.js";

const calculateOutput = (inputArr) => {
  let gamma = "";
  let epsilon = "";

  const zeroes = [];
  const ones = [];
  const wordLength = inputArr[0].length;

  for (let i = 0; i < wordLength; i++) {
    for (const str of inputArr) {
      const c = str.charAt(i);
      if (c === "0") zeroes.push(c);
      else ones.push(c);
    }
    if (zeroes.length > ones.length) {
      gamma += "0";
      epsilon += "1";
    } else {
      gamma += "1";
      epsilon += "0";
    }
    zeroes.length = 0;
    ones.length = 0;
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

console.log(calculateOutput(data));
