import { data } from "./input.js";

const findDigits = (input) => {
  let output = 0;
  for (const row of input) {
    const digitOutputValues = row
      .split("|")
      .map((item) => item.trim())[1]
      .split(" ");
    console.log(digitOutputValues);

    for (const digitalValue of digitOutputValues) {
      if (
        digitalValue.length === 2 ||
        digitalValue.length === 3 ||
        digitalValue.length === 4 ||
        digitalValue.length === 7
      )
        output++;
    }
  }
  return output;
};

console.log(findDigits(data));
