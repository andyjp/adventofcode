realInput = require('./input').getInput(3)

testInput = Promise.resolve(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`)

const alphabetUpper = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const alphabetLower = alphabetUpper.map(l => l.toLowerCase())
const priority = [0, ...alphabetLower, ...alphabetUpper]

realInput.then(input => {
    const res = input.split("\n").reduce((accum, sack) => {
        if (sack) {
            const compartment1 = sack.split('').splice(0, sack.length/2)
            const compartment2 = sack.split('').splice(sack.length/2)
            const match = compartment1.find(item => compartment2.includes(item))
            return accum + priority.indexOf(match)
        }
        return accum
    }, 0)
    console.log('Part 1:', res)

    const group = ([first, second, third, ...rest]) => {
        const match = first.split('').find(item => second.split('').includes(item) && third.split('').includes(item))
        if (rest && rest.length > 1) {
            return group(rest) + priority.indexOf(match)
        }
        return priority.indexOf(match)
    }
    console.log('Part 2:', group(input.split("\n")))
})