// https://adventofcode.com/2023/day/1
import { getInput } from "./input.mjs";
const realInput = await getInput(1);

// Part 1
const testInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const part1 = (input) =>
  input
    .split("\n")
    .map((i) => i.match(/[^0-9]*(\d)/)[1] + i.match(/.*(\d)/)[1])
    .reduce((acc, i) => acc + parseInt(i), 0);

console.log(part1(realInput));

// Part 2
const testInput2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const numbers = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const convert = {
  "one":"1",
  "two":"2",
  "three":"3",
  "four":"4",
  "five":"5",
  "six":"6",
  "seven":"7",
  "eight":"8",
  "nine":"9",
}
const part2 = (input) =>
  input.split("\n").map((i) => {
    const smthg = numbers
      .reduce((acc, n) => {
        const firstIndex = i.indexOf(n)
        if (firstIndex > -1) {
          const firstVal = i.substring(firstIndex, firstIndex+n.length)
          const lastIndex = i.lastIndexOf(n)
          const lastVal = i.substring(lastIndex, lastIndex+n.length)
          acc.push([firstIndex, convert[firstVal] ?? firstVal], [lastIndex, convert[lastVal] ?? lastVal])
        }
        return acc
      }, [])
      .sort((a, b) => a[0] - b[0])
      // console.log(smthg)
      // console.log(smthg[0][1]+smthg[smthg.length-1][1])
    return smthg[0][1]+smthg[smthg.length-1][1];
  })
  .reduce((acc, i) => acc + parseInt(i), 0);

// console.log(part2('fourvptdnbpqcxktwoone4oneone'));
console.log(part2(realInput));
