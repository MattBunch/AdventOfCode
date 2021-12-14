import { data } from "./input.js";

class Node {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.surrounding = [];
    this.isLowPoint = false;
    this.isBasin = this.value != 9;
    this.basinBuddies = [];
    this.beenSearched = false;
  }
  setSurrounding(inputSurrounding) {
    this.surrounding = inputSurrounding;
    this.setLowPoint();
  }

  setLowPoint() {
    for (const node of this.surrounding) {
      if (node.value <= this.value) {
        this.isLowPoint = false;
        return;
      }
    }
    this.isLowPoint = true;
  }

  setBasin() {
    for (const node of this.surrounding) {
      if (node.isBasin) {
        node.setBasin();
        node.basinID = this.basinID;
        this.isBasin = true;
      }
    }
  }

  toString() {
    console.log("x", this.x);
    console.log("y", this.y);
    console.log("value", this.value);
    console.log("isLowPoint", this.isLowPoint);
    console.log("isBasin", this.isBasin);
    console.log("basinID", this.basinID);
    console.log("surrounding nodes:");
    for (const node of this.surrounding)
      console.log(`\t x: ${node.x}, y:${node.y}, value:`, node.value);
    console.log("\n");
  }
}

const getSurroundingNodes = (inputNode, inputNodeArray) => {
  // north
  const northNode = inputNodeArray.filter(
    (node) => node.x === inputNode.x && node.y === inputNode.y - 1
  )[0];
  // east
  const eastNode = inputNodeArray.filter(
    (node) => node.x === inputNode.x + 1 && node.y === inputNode.y
  )[0];
  // south
  const southNode = inputNodeArray.filter(
    (node) => node.x === inputNode.x && node.y === inputNode.y + 1
  )[0];
  // west
  const westNode = inputNodeArray.filter(
    (node) => node.x === inputNode.x - 1 && node.y === inputNode.y
  )[0];
  const output = [];
  if (northNode !== undefined) output.push(northNode);
  if (eastNode !== undefined) output.push(eastNode);
  if (southNode !== undefined) output.push(southNode);
  if (westNode !== undefined) output.push(westNode);

  return output;
};

const findBasinBuddies = (node, arr) => {
  for (const n of node.surrounding) {
    if (n.isBasin && !n.beenSearched) {
      n.beenSearched = true;
      arr.push(n, arr);
      findBasinBuddies(n, arr);
    }
  }
};

const calcBasin = (input) => {
  const createNodes = () => {
    const output = [];
    let rowNum = 0;
    let colNum = 0;
    for (const row of input) {
      rowNum++;
      for (const val of row) {
        colNum++;
        const intVal = parseInt(val);
        output.push(new Node(rowNum, colNum, intVal));
      }
      colNum = 0;
    }
    return output;
  };

  const nodes = createNodes();
  for (const node of nodes) {
    node.setSurrounding(getSurroundingNodes(node, nodes));
  }

  const basins = [];
  for (const node of nodes) {
    if (node.isLowPoint) {
      const basin = [];
      findBasinBuddies(node, basin);
      basins.push(basin);
    }
  }

  const basinLengths = [];

  for (const basin of basins) basinLengths.push(basin.length / 2);

  return basinLengths
    .sort((a, b) => (a < b ? 1 : a > b ? -1 : 0))
    .slice(0, 3)
    .reduce((accumulator, current) => accumulator * current, 1);
};

console.log(calcBasin(data));
