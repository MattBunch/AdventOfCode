import { data } from "./input.js";

class Node {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.surrounding = [];
    this.isLowPoint = false;
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

  toString() {
    console.log("x", this.x);
    console.log("y", this.y);
    console.log("value", this.value);
    console.log("isLowPoint", this.isLowPoint);
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

const sumLowPoints = (input) => {
  const nodes = [];
  let rowNum = 0;
  let colNum = 0;
  for (const row of input) {
    rowNum++;
    for (const val of row) {
      colNum++;
      const intVal = parseInt(val);
      nodes.push(new Node(rowNum, colNum, intVal));
    }
    colNum = 0;
  }

  for (const node of nodes) {
    node.setSurrounding(getSurroundingNodes(node, nodes));
  }

  let initialValue = 0;

  return nodes
    .filter((node) => node.isLowPoint)
    .reduce(
      (prevVal, currentVal) => prevVal + currentVal.value + 1,
      initialValue
    );
};

console.log(sumLowPoints(data));
