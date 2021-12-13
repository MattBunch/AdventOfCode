import { data } from "./input.js";

const countFuel = (input) => {
  const moves = Array.from(Array(Math.max.apply(null, input)).keys());
  let cheapest;
  for (let i = 0; i < moves.length; i++) {
    let thisMovesTotal = 0;
    for (const crab of input) {
      const align = crab - i;
      const triangleNumber = (n) => {
        return (n * (n + 1)) / 2;
      };
      thisMovesTotal += triangleNumber(Math.abs(align));
    }
    if (thisMovesTotal < cheapest || cheapest === undefined)
      cheapest = thisMovesTotal;
  }
  return cheapest;
};

console.log(countFuel(data));
