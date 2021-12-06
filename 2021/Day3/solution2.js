import { data } from "./input.js";

const lifeSupportRating = (inputArr) => {
  const getBit = (arrayCopy, isOxygen) => {
    let ones = [];
    let zeroes = [];
    const wordLength = arrayCopy[0].length;

    for (let i = 0; i < wordLength; i++) {
      console.log("i", i);
      for (const str of arrayCopy) {
        const c = str.charAt(i);
        c === "0" ? zeroes.push(str) : ones.push(str);
      }

      // console.log("zeroes", zeroes);
      // console.log("ones", ones);
      // console.log("zeroes.length", zeroes.length);
      // console.log("ones.length", ones.length);
      // console.log("arrayCopy", arrayCopy);

      const zeroesSet = new Set(zeroes);
      const onesSet = new Set(ones);

      if (ones.length > zeroes.length) {
        if (isOxygen)
          arrayCopy = arrayCopy.filter((elem) => {
            return !zeroesSet.has(elem);
          });
        else
          arrayCopy = arrayCopy.filter((elem) => {
            return !onesSet.has(elem);
          });
      }

      if (zeroes.length > ones.length) {
        if (isOxygen)
          arrayCopy = arrayCopy.filter((elem) => {
            return !onesSet.has(elem);
          });
        else
          arrayCopy = arrayCopy.filter((elem) => {
            return !zeroesSet.has(elem);
          });
      }

      if (zeroes.length === ones.length) {
        if (isOxygen)
          arrayCopy = arrayCopy.filter((elem) => {
            return !zeroesSet.has(elem);
          });
        else
          arrayCopy = arrayCopy.filter((elem) => {
            return !onesSet.has(elem);
          });
      }

      // * reset
      ones = [];
      zeroes = [];

      // * check to exit loop
      if (arrayCopy.length === 1) return arrayCopy[0];
    }
  };

  const oxygenGeneratorRating = getBit([...inputArr], true);
  const co2ScrubberRating = getBit([...inputArr], false);

  return parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2);
};

console.log(lifeSupportRating(data));
