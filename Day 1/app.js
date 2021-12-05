import { data } from "./input.js";

const countDepthMeasurements = (inputArr) => {
  let counter = 0;
  for (let i = inputArr.length - 1; i > 0; i--) {
    if (inputArr[i] > inputArr[i - 1]) counter++;
  }
  return counter;
};

console.log(countDepthMeasurements(data));
