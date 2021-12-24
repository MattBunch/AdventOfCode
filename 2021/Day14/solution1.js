/*
const data = {template: 'NNCB', rules:
['CH -> B',
'HH -> N',
'CB -> H',
'NH -> C',
'HB -> C',
'HC -> B',
'HN -> C',
'NN -> C',
'BH -> H',
'NC -> B',
'NB -> B',
'BN -> B',
'BB -> N',
'BC -> B',
'CC -> N',
'CN -> C'] }
 */

import { data } from "./input.js";

const x = (input) => {
  const getPairArr = (inputStr) => {
    const arr = [...inputStr];
    const output = [];
    for (const [i, x] of arr.entries()) {
      if (arr[i + 1] !== undefined) output.push(arr[i] + arr[i + 1]);
    }
    // console.log(output)
    return output;
  };
  const applyRules = (inputArr) => {
    let output = "";

    for (const [i, p] of inputArr.entries()) {
      for (const rule of input.rules) {
        if (rule.split("->")[0].trim() === p) {
          let newStr;
          if (i === 0)
            newStr = [...p][0] + rule.split("->")[1].trim() + [...p][1];
          else newStr = rule.split("->")[1].trim() + [...p][1];

          output += newStr.trim();
          continue;
        }
      }
    }
    // console.log(output)
    return output;
  };

  const parseOutput = (inputStr) => {
    let countObj = {};
    for (const char of inputStr.split("")) {
      if (!countObj.hasOwnProperty(char)) countObj[char] = 0;
      countObj[char]++;
    }
    const vals = Object.values(countObj);
    return Math.max(...vals) - Math.min(...vals);
  };

  let str = input.template;
  for (let i = 0; i < 10; i++) {
    const templatePairs = getPairArr(str);
    str = applyRules(templatePairs);
  }

  return parseOutput(str);
};

console.log(x(data));
