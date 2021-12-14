import { data } from "./input.js";

const findDigits = (input) => {
  // let output = "";
  const outputArr = [];
  for (const row of input) {
    const container = row.split("|").map((item) => item.trim());
    const uniqueSignalPatterns = container[0].split(" ");
    const digitOutputValues = container[1].split(" ");
    console.log(uniqueSignalPatterns);
    console.log(digitOutputValues);

    let output = "";

    const oneValues = uniqueSignalPatterns
      .filter((elem) => elem.length === 2)[0]
      .split("");
    console.log(oneValues); // right top, right bottom

    const fourValues = uniqueSignalPatterns
      .filter((elem) => elem.length === 4)[0]
      .split("");

    const fourUniqueValues = fourValues.filter(
      (val) => !oneValues.includes(val)
    );

    for (const digitalValue of digitOutputValues) {
      if (digitalValue.length === 2) output += "1";
      if (digitalValue.length === 3) output += "7";
      if (digitalValue.length === 4) output += "4";
      if (digitalValue.length === 7) output += "8";

      const checkerEvery = (arr, target) =>
        target.every((v) => arr.includes(v));

      // * length 5: 2, 3, 5
      if (digitalValue.length === 5) {
        if (checkerEvery(digitalValue.split(""), oneValues)) output += "3";
        else if (checkerEvery(digitalValue.split(""), fourUniqueValues))
          output += "5";
        else output += "2";
      }

      // * length 6: 0, 6, 9
      if (digitalValue.length === 6) {
        const isNine = checkerEvery(digitalValue.split(""), fourValues);
        const isSix = !checkerEvery(digitalValue.split(""), oneValues);

        if (isNine) output += "9";
        else if (isSix) output += "6";
        else output += "0";
      }
    }
    console.log(output);
    outputArr.push(parseInt(output));
  }
  console.log(outputArr);
  for (const a of outputArr) console.log(a);
  let initialValue = 0;
  return outputArr.reduce(
    (prevVal, currentVal) => prevVal + currentVal,
    initialValue
  );
};

console.log(findDigits(data));
