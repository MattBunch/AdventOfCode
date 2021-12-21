import { data } from "./input.js";

const createCoords = (input) => {
  const output = [];
  for (const item of input) {
    const arr = item.split(",");
    output.push({ x: parseInt(arr[0]), y: parseInt(arr[1]) });
  }
  return output;
};

const parseFoldInstructions = (input) => {
  const output = [];
  for (const item of input) {
    const arr = item.split("=");
    output.push({ direction: arr[0], foldPoint: parseInt(arr[1]) });
  }
  return output;
};

const fold = (inputCoords, inputFoldInstructions) => {
  const dir = inputFoldInstructions[0].direction;
  const foldPoint = inputFoldInstructions[0].foldPoint;
  console.log(dir);
  console.log(inputCoords);
  for (const coord of inputCoords) {
    if (coord[dir] > foldPoint) {
      coord[dir] -= foldPoint;
    }
  }

  return inputCoords;
};

const countDots = (input) => {
  const folded = fold(
    createCoords(input.coords),
    parseFoldInstructions(input.f)
  );

  const output = folded.reduce((unique, o) => {
    if (!unique.some((obj) => obj.x === o.x && obj.y === o.y)) {
      unique.push(o);
    }
    return unique;
  }, []);

  console.log("output", output);

  return output.length;
};

console.log(countDots(data));
