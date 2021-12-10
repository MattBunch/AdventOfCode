import { data } from "./input.js";

const len = 256;

const countLanternFish = (input) => {
  const fishCount = new Array(9).fill(0);

  for (const fish of input) {
    fishCount[fish]++;
  }
  for (let i = 0; i < len; i++) {
    const num = fishCount.shift();
    console.log(num);
    fishCount[6] += num;
    fishCount.push(num);
  }

  console.log(fishCount);

  return fishCount.reduce((pv, cv) => pv + cv, 0);
};

console.log(countLanternFish(data));
