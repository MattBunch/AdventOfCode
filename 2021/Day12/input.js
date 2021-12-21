import * as fs from "fs";
import * as readline from "readline";

import Cave from "./cave.js";

const processLineByLine = async () => {
  const fileStream = fs.createReadStream("2021/Day12/input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const arrContainsCaveCode = (inputArr, inputCaveID) => {
    return inputArr.map((el) => el.caveID).includes(inputCaveID);
  };

  const caveSystem = [];
  const connections = [];

  for await (const line of rl) {
    // console.log(line);
    // console.log(line.split("-"));

    for (const l of line.split("-")) {
      if (!arrContainsCaveCode(caveSystem, l)) {
        caveSystem.push(new Cave(l));
      }
    }
    connections.push(line);
    // console.log(caveSystem);
  }

  return { caveSystem, connections };
};

const getCaveSystem = async () => {
  const data = await processLineByLine();

  // console.log(data);
  const caveSystem = data.caveSystem;

  // console.log(data.rl);

  const output = caveSystem;
  // for (const line of data.connections) console.log(line);

  for (const line of data.connections) {
    const start = line.split("-")[0];
    const end = line.split("-")[1];
    const startCave = caveSystem.find((el) => el.caveID === start);
    const endCave = caveSystem.find((el) => el.caveID === end);
    startCave.connections.push(endCave);
    endCave.connections.push(startCave);
  }

  return output;
};

export default getCaveSystem();
