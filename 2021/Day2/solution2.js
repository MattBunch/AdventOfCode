import { data } from "./input.js";

let horizontalPos = 0;
let depth = 0;
let aim = 0;

const calculatePosAndDepth = (inputArr) => {
  for (const com of inputArr) {
    const dir = com.split(" ")[0];
    const num = Number(com.split(" ")[1]);
    if (dir === "up") aim -= num;

    if (dir === "down") aim += num;

    if (dir === "forward") {
      horizontalPos += num;
      depth += aim * num;
    }
  }
  return horizontalPos * depth;
};

console.log(calculatePosAndDepth(data));
