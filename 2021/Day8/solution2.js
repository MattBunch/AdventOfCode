import { data } from "./input.js";

const findDigits = (input) => {
  let output = "";
  for (const row of input) {
    const container = row.split("|").map((item) => item.trim());
    const uniqueSignalPatterns = container[0].split(" ");
    const digitOutputValues = container[1].split(" ");
    console.log(uniqueSignalPatterns);
    console.log(digitOutputValues);

    const parseValues = (inputArr) => {
      console.log(inputArr);
      let zero, one, two, three, four, five, six, seven, eight, nine;
      let segment = {};
      const assignValues = () => {
        for (const signal of inputArr) {
          if (signal.length === 2) {
            one = signal;
            segment.c = signal.split()[0];
            segment.f = signal.split()[1];
          }
          if (signal.length === 3) {
            seven = signal;
            segment.a = signal.split()[0];
            segment.c = signal.split()[1];
            segment.f = signal.split()[2];
          }
          if (signal.length === 4) {
            four = signal;
            segment.b = signal.split()[0];
            segment.d = signal.split()[2];
          }
          if (signal.length === 7) {
            eight = signal;
          }
          // 0, 9, 6:
          if (signal.length === 6) {
            nine = signal;
            six = signal;
            zero = signal;
          }
          // 2, 5:
          if (signal.length === 5) {
            two = signal;
            five = signal;
          }
        }
        return (
          zero != undefined &&
          one != undefined &&
          two != undefined &&
          three != undefined &&
          four != undefined &&
          five != undefined &&
          six != undefined &&
          seven != undefined &&
          eight != undefined &&
          nine != undefined
        );
      };
      let run = assignValues();
      while (!run) {
        // console.log("run");
        run = assignValues();
      }

      return { zero, one, two, three, four, five, six, seven, eight, nine };
    };

    const vals = parseValues(uniqueSignalPatterns);
    console.log(vals);

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
