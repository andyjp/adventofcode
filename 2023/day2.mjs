// https://adventofcode.com/2023/day/2
import { getInput } from "./input.mjs";
const realInput = await getInput(2);

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const solve = (input) => {
  const possible = {
    red: 12,
    green: 13,
    blue: 14,
  };
  let gameIdSum = 0;
  let powerSum = 0
  input.split("\n").forEach((l) => {
    const [_, game, rest] = l.match(/^Game (\d+): (.*)$/);
    const sets = rest.split(";").map((set) => {
      return set
        .trim()
        .split(",")
        .reduce((acc, cubes) => {
          const [count, color] = cubes.trim().split(" ");
          return { ...acc, [color]: parseInt(count) };
        }, {});
    });
    // Part 1
    const isPossible = sets.every((set) =>
      Object.entries(set).every(([color, count]) => count <= possible[color])
    );
    if (isPossible) gameIdSum += parseInt(game);
    // Part 2
    const fewest = sets.reduce((acc, set) => {
      Object.entries(set).forEach(([color, count]) => {
        if (count > (acc[color] || 0))
          acc[color] = count
      })
      return acc
    }, {})
    powerSum += Object.values(fewest).reduce((acc, count) => acc*count,1)
  });
  console.log(gameIdSum, powerSum);
};

solve(realInput);
