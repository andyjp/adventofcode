// https://adventofcode.com/2023/day/3
import { getInput } from "./input.mjs";
const realInput = await getInput(3);

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const chars = new Set();
const isSymbol = (char) => {
  return char && char !== "." && !["1","2","3","4","5","6","7","8","9","0"].includes(char);
};

const isAsterisk = char => char === '*'

// console.log(isSymbol("*"))

const solve = (input) => {
  const schematic = input.trim().split("\n").map(s => s.trim());
  const numbers = [];
  let number = "";
  let isSymbolAdjacent = false;
  for (let i = 0; i < schematic.length; i++) {
    for (let j = 0; j < schematic.length; j++) {
      // console.log(schematic[i][j])
      if (!Number.isNaN(Number(schematic[i][j]))) {
        if (number) {
          number += schematic[i][j];
        } else {
          number = schematic[i][j];
        }
        isSymbolAdjacent =
          isSymbolAdjacent ||
          isSymbol(schematic[i + 1]?.[j]) ||
          isSymbol(schematic[i - 1]?.[j]) ||
          isSymbol(schematic[i][j + 1]) ||
          isSymbol(schematic[i][j - 1]) ||
          isSymbol(schematic[i - 1]?.[j - 1]) ||
          isSymbol(schematic[i + 1]?.[j + 1]) ||
          isSymbol(schematic[i + 1]?.[j - 1]) ||
          isSymbol(schematic[i - 1]?.[j + 1]);
      } else {
        // if (i === 90) console.log(i,j, schematic[i][j], "else")
        // console.log(number, isSymbolAdjacent)
        if (number && isSymbolAdjacent) numbers.push(number);
        isSymbolAdjacent = false;
        number = "";
      }
    }
  }

  console.log(numbers.reduce((acc, n) => acc + parseInt(n), 0));
  // console.log(JSON.stringify(numbers));
};

solve(testInput);
solve(realInput)
