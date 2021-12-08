import { data } from "./input.js";

const countWindows = (inputArr) => {
  let counter = 0;
  let previousWindow;
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i + 1] != null && inputArr[i + 2] != null) {
      const window = inputArr[i] + inputArr[i + 1] + inputArr[i + 2];
      if (window > previousWindow && previousWindow != null) counter++;
      previousWindow = window;
    }
  }
  return counter;
};

console.log(countWindows(data));
