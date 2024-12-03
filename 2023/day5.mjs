// https://adventofcode.com/2023/day/5
import { getInput } from "./input.mjs";
const realInput = await getInput(5);
// 14 55 13
const testInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const part1 = (input) => {
  const corresponds = {};
  const [seeds, ...maps] = input.split("\n\n");
  seeds
    .replace("seeds: ", "")
    .split(" ")
    .map((s) => parseInt(s.trim()))
    .forEach((s) => {
      corresponds[s] = [];
      maps.forEach((m, mi) => {
        const [_, ...ranges] = m.split("\n");
        const prev = corresponds[s].at(-1) || s;
        const found = ranges.some((r) => {
          const [destRangeStart, srcRangeStart, rangeLength] = r
            .split(" ")
            .map((i) => parseInt(i.trim()));
          // console.log(s, destRangeStart, srcRangeStart, rangeLength)
          if (srcRangeStart <= prev && prev < srcRangeStart + rangeLength) {
            corresponds[s].push(destRangeStart + (prev - srcRangeStart));
            return true;
          }
        });
        if (!found) corresponds[s].push(prev);
      });
    });
  console.log(
    Object.values(corresponds)
      .map((c) => c.at(-1))
      .reduce((acc, c) => (c < acc ? c : acc), 9999999999999)
  );
};

// part1(testInput);
// part1(realInput);

const part2 = (input) => {
  const corresponds = {};
  let locations = [];
  const [seeds, ...maps] = input.split("\n\n");
  let fns = [];
  maps.forEach((m) => {
    const [_, ...ranges] = m.split("\n");
    const rangeFns = ranges.map((r) => {
      const [destRangeStart, srcRangeStart, rangeLength] = r
        .split(" ")
        .map((i) => parseInt(i.trim()));
      return (num) => {
        if (srcRangeStart <= num && num < srcRangeStart + rangeLength) {
          return destRangeStart + (num - srcRangeStart);
        } else {
          return num;
        }
      };
    });
    fns.push((num) => {
      for (const rangeFn of rangeFns) {
        const newNum = rangeFn(num)
        if (newNum !== num) {
          return newNum
        }
      }
      return num
    });
  });
  console.log("fns.length", fns.length)
  const seedToLocationFn = (seed) => {
    return fns.reduce((acc, fn) => fn(acc), seed);
  };
  seeds
    .replace("seeds: ", "")
    .split(" ")
    // .flatMap((s, si, arr) => {
    //   if (si % 2 === 1) {
    //     return [];
    //   }
    //   console.log('length', parseInt(arr[si + 1].trim()))
    //   return Array.from(
    //     { length: parseInt(arr[si + 1].trim()) },
    //     (_, i) => i + parseInt(s.trim())
    //   );
    // })
    .map((s) => parseInt(s.trim()))
    .forEach((seed, si, arr) => {
      if (si % 2 === 1) return;
      console.log("seed:", seed);
      for (let s = seed; s < seed + arr[si + 1]; s++) {
        console.log("seed iteration:", s);
        locations.push(seedToLocationFn(s));
        // corresponds[s] = [];
        // maps.forEach((m) => {
        //   const [_, ...ranges] = m.split("\n");
        //   const prev = corresponds[s].at(-1) || s;
        //   const found = ranges.some((r) => {
        //     const [destRangeStart, srcRangeStart, rangeLength] = r
        //       .split(" ")
        //       .map((i) => parseInt(i.trim()));
        //     // console.log(s, destRangeStart, srcRangeStart, rangeLength)
        //     if (srcRangeStart <= prev && prev < srcRangeStart + rangeLength) {
        //       corresponds[s].push(destRangeStart + (prev - srcRangeStart));
        //       return true;
        //     }
        //   });
        //   if (!found) corresponds[s].push(prev);
        // });
      }
    });
  // console.log(
  //   Object.values(corresponds)
  //     .map((c) => c.at(-1))
  //     .reduce((acc, c) => (c < acc ? c : acc), 9999999999999)
  // );
  console.log(locations.reduce((acc, c) => (c < acc ? c : acc), 9999999999999))
  // console.log(locations);
};

part2(testInput);
part2(realInput);
