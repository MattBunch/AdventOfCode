import { data } from "./input.js";

const len = 80;

const countLanternFish = (input) => {
  let newFishToAdd = 0;
  const incrementDay = (fish) => {
    if (fish != 0) return fish - 1;
    newFishToAdd++;
    return 6;
  };

  console.log("INITIAL STATE", input);
  for (let i = 0; i < len; i++) {
    input.forEach((fish, index) => (input[index] = incrementDay(fish)));
    console.log(`${"Day: " + i}`, input);
    while (newFishToAdd > 0) {
      input.push(8);
      newFishToAdd--;
    }
  }

  return input.length;
};

console.log(countLanternFish(data));
