import { data } from "./input.js";

const createCoords = (input) => {
  const output = [];
  for (const item of input) {
    const arr = item.split(",");
    output.push({ x: arr[0], y: arr[1] });
  }
  return output;
};

const parseFoldInstructions = (input) => {
  const output = [];
  for (const item of input) {
    const arr = item.split("=");
    output.push({ direction: arr[0], len: arr[1] });
  }
  console.log(output);
  return output;
};

const fold = (inputCoords, inputFoldInstructions) => {
  // const dir = inputFoldInstructions.direction
  // for (const coord of inputCoords){
  //   console.log(coord[dir])
  // }
};

const countDots = (input) => {
  // create coordinates array
  const coords = createCoords(input.coords);
  const foldInstructions = parseFoldInstructions(input.f);

  // fold
  console.log(coords);
  console.log(foldInstructions);

  fold(createCoords(input.coords), parseFoldInstructions(input.f));

  return foldInstructions;
};

console.log(fold(data));
