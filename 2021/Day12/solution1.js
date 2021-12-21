import getCaveSystem from "./input.js";

const caveSystem = await getCaveSystem;

const findPaths = (input) => {
  const paths = [];
  let run = true;
  let i = 0;
  let buildingString = "";
  const startCave = input.filter((el) => el.caveID === "start")[0];
  while (run) {
    i++;
    console.log(startCave.connections);
    startCave.visit(buildingString, paths, 0);
    console.log(buildingString);
    // if (!paths.includes(buildingString)) paths.push(buildingString);
    // else run = false;
    // DEBUG:
    console.log(run);
    if (i > 10) run = false;

    console.log("paths", paths);
    console.log(run);

    // * reset
    for (const cave of input) cave.isVisited = false;
  }

  // console.log(paths);

  return paths;
};

console.log(findPaths(caveSystem));
