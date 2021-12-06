import { data } from "./input.js";

const lifeSupportRating = (inputArr) => {
  const getBit = (arrayCopy, isOxygen) => {
    let ones = [];
    let zeroes = [];
    const wordLength = arrayCopy[0].length;

    for (let i = 0; i < wordLength; i++) {
      for (const str of arrayCopy) {
        str.charAt(i) === "0" ? zeroes.push(str) : ones.push(str);
      }

      const removeFromSet = (inputSet) => {
        arrayCopy = arrayCopy.filter((elem) => {
          return !inputSet.has(elem);
        });
      };

      if (ones.length > zeroes.length || zeroes.length === ones.length) {
        if (isOxygen) removeFromSet(new Set(zeroes));
        else removeFromSet(new Set(ones));
      }

      if (zeroes.length > ones.length) {
        if (isOxygen) removeFromSet(new Set(ones));
        else removeFromSet(new Set(zeroes));
      }

      ones = [];
      zeroes = [];

      if (arrayCopy.length == 1) return arrayCopy[0];
    }
  };

  return (
    parseInt(getBit([...inputArr], false), 2) *
    parseInt(getBit([...inputArr], true), 2)
  );
};

console.log(lifeSupportRating(data));
