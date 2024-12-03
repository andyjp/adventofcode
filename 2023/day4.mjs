// https://adventofcode.com/2023/day/4
import { getInput } from "./input.mjs";
const realInput = await getInput(4);

const testInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;


const part1 = input => {
  let points = 0
  input.trim().split("\n").forEach(l => {
    const [_, card, rest] = l.match(/^Card\s*(\d+): (.*)$/);
    const [winningNums, nums] = rest.split("|").map(s => s.trim().split(" ").map(n => n.trim()).filter(Boolean))
    const myWinningNums = winningNums.filter(n => nums.includes(n))
    points += myWinningNums.length > 0 ? 2 ** (myWinningNums.length-1) : 0
    // console.log(winningNums, nums, myWinningNums, 2 ** (myWinningNums.length-1))
  })
  console.log(points)
}

part1(testInput)
part1(realInput)

const part2 = input => {
  let scratchcards = {}
  input.trim().split("\n").forEach(l => {
    const [_, card, rest] = l.match(/^Card\s*(\d+): (.*)$/);
    scratchcards[card] = scratchcards[card] ? scratchcards[card] + 1 : 1
    const [winningNums, nums] = rest.split("|").map(s => s.trim().split(" ").map(n => n.trim()).filter(Boolean))
    const myWinningNums = winningNums.filter(n => nums.includes(n))
    for (let i = parseInt(card)+1, j=0; j < myWinningNums.length; i++, j++) {
      scratchcards[i] = scratchcards[i] ? scratchcards[i] + scratchcards[card] : scratchcards[card] || 1
    }
    // console.log(card, myWinningNums.length)
    // console.log(JSON.stringify(scratchcards))
    // scratchcards += myWinningNums.length > 0 ? 2 ** (myWinningNums.length-1) : 0
    // console.log(winningNums, nums, myWinningNums, 2 ** (myWinningNums.length-1))
  })
  console.log(Object.values(scratchcards).reduce((acc, i) => acc + i, 0))
}

part2(testInput)
part2(realInput)
