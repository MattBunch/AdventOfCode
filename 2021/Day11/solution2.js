import { data } from "./input.js";

let flashes = 0;

let sneed = 0;

class Octopus {
  constructor(x, y, energyLevel) {
    this.x = x;
    this.y = y;
    this.energyLevel = energyLevel;
    this.isFlashed = false;
    // console.log("x", x, "y", y, "e", energyLevel);
  }

  toString() {
    return `x: ${this.x}, y: ${this.y}, e: ${this.energyLevel}`;
  }

  iAmOne() {
    return this.x === 0; // && this.y === 0;
  }

  increaseEnergyLevel(octopuses) {
    if (!this.isFlashed) this.energyLevel++;

    if (this.energyLevel > 9 && !this.isFlashed) this.flash(octopuses);
  }

  flash(octopuses) {
    // console.log("FLASHED: ", this.toString());
    if (this.isFlashed) return;
    this.isFlashed = true;
    flashes++;
    this.energyLevel = 0;

    // * get surrounding octopuses
    const surroundingOctopuses = this.getSurroundingOctopuses(octopuses);

    // * increase energy level of surrounding octopuses
    for (const octopus of surroundingOctopuses) {
      octopus.increaseEnergyLevel(octopuses);
    }
  }

  resetTo0() {
    this.isFlashed = false;
  }

  getSurroundingOctopuses(octopuses) {
    const getOctopusOnBoardByXY = (inputX, inputY, inputOctopuses) => {
      if (
        this.inputX < 0 ||
        this.inputY < 0 ||
        this.inputX > inputOctopuses[0].length ||
        this.inputY > inputOctopuses.length
      )
        return null;
      for (const octo of inputOctopuses) {
        if (octo.x === inputX && octo.y === inputY) return octo;
      }
    };

    const output = [];

    // * up left
    output.push(getOctopusOnBoardByXY(this.x - 1, this.y - 1, octopuses));
    // * up
    output.push(getOctopusOnBoardByXY(this.x, this.y - 1, octopuses));
    // * up right
    output.push(getOctopusOnBoardByXY(this.x + 1, this.y - 1, octopuses));
    // * middle left
    output.push(getOctopusOnBoardByXY(this.x - 1, this.y, octopuses));
    // * middle right
    output.push(getOctopusOnBoardByXY(this.x + 1, this.y, octopuses));
    // * down left
    output.push(getOctopusOnBoardByXY(this.x - 1, this.y + 1, octopuses));
    // * down
    output.push(getOctopusOnBoardByXY(this.x, this.y + 1, octopuses));
    // * down right
    output.push(getOctopusOnBoardByXY(this.x + 1, this.y + 1, octopuses));

    return output.filter((el) => el != null);
  }
}

const createOctopuses = (input) => {
  const output = [];
  for (let i = 0; i < input.length; i++) {
    const row = input[i].split("");
    for (let j = 0; j < row.length; j++) {
      output.push(new Octopus(i, j, parseInt(row[j])));
    }
  }

  return output;
};

const printOctopuses = (input) => {
  const row = input[input.length - 1].y;
  let str = "";
  for (const octo of input) {
    str += octo.energyLevel;
    if (octo.y === row) {
      str = str + "\n";
    }
    // console.log(octo.energyLevel, octo.getSurroundingOctopuses(input));
  }
  console.log(str);
};

const countFlashes = (input) => {
  const isEveryOctopusFlashing = () => {
    for (const octo of octopuses) {
      if (!octo.isFlashed) return false;
    }
    return true;
  };

  const octopuses = createOctopuses(input);

  // printOctopuses(octopuses);

  // let run = true;
  let i = 0;

  while (true) {
    i++;
    for (const octopus of octopuses) {
      octopus.increaseEnergyLevel(octopuses);
    }

    if (isEveryOctopusFlashing()) {
      // run = false;
      break;
    }

    for (const octopus of octopuses) {
      if (octopus.isFlashed) octopus.resetTo0();
    }
    // if (i === 0 || i === 1) printOctopuses(octopuses);
  }

  return i;
};

console.log(countFlashes(data));
