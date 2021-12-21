export default class Cave {
  constructor(caveID) {
    this.caveID = caveID;
    this.isVisited = false;
    this.connections = [];
  }

  isStart() {
    return this.caveID === "start";
  }

  isEnd() {
    return this.caveID === "end";
  }

  isBig() {
    return this.caveID != this.caveID.toLowerCase();
  }

  isSmall() {
    return this.caveID === this.caveID.toLowerCase() && !this.isEnd();
  }

  visit(inputStr, inputArr, counter) {
    counter++;
    let inputCounter = 0;
    if (this.caveID === "b") {
      console.log("I AM B");
      console.log(this.caveID);
      console.log(this.connections);
    }

    if (this.isVisited) return;
    if (this.isSmall() && this.isVisited) return;
    // if (this.caveID === "end") return "end";

    if (this.isSmall()) this.isVisited = true;

    // console.log("path:", inputStr.length);
    console.log("path:", inputStr.length != 0 ? inputStr : "empty path"); // DEBUG:

    inputStr += this.caveID + ",";

    console.log("inputArr", inputArr);
    console.log("inputStr", inputStr);

    for (const cave of this.connections) {
      console.log("con.caveID:", cave.caveID);
      console.log("con.visited:", cave.isVisited);
      console.log(
        cave.caveID === "b" ? ("con.connections:", cave.connections) : ""
      );

      if (cave.caveID === "end") {
        inputStr += cave.caveID;
        console.log("FOUND END: ", inputStr);
        if (!inputArr.includes(inputStr)) inputArr.push(inputStr);
        console.log(counter);
        return;
      }
      if (!cave.isVisited) cave.visit(inputStr, inputArr, inputCounter);
    }

    // return input;
  }
}
