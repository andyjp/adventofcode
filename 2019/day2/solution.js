const myInput = require('./input')

const format = (input) => input.split(',').map(i => parseInt(i))

const part1 = (input = [], position = 0) => {
    const pos1 = input[input[position + 1]]
    const pos2 = input[input[position + 2]]
    const pos3 = input[position + 3]
    switch(input[position]) {
        case 1: {
            input[pos3] = pos1 + pos2
            return part1(input, position + 4)
        }
        case 2: {
            input[pos3] = pos1 * pos2
            return part1(input, position + 4)
        }
        case 99:
        default:
            return input
    }
}

// const tests = [{
//     input: '1,0,0,0,99',
//     output: '2,0,0,0,99'
// }, {
//     input: '2,3,0,3,99',
//     output: '2,3,0,6,99'
// }, {
//     input: '2,4,4,5,99,0',
//     output: '2,4,4,5,99,9801'
// }, {
//     input: '2,4,4,5,99,0',
//     output: '2,4,4,5,99,9801'
// }, {
//     input: '1,1,1,4,99,5,6,0,99',
//     output: '30,1,1,4,2,5,6,0,99'
// }]

// tests.forEach(({input, output}) => {
//     const answer = part1(format(input))
//     console.log(`${input} should equal ${output}`, answer === output, answer)
// })

const formattedInput = format(myInput)
formattedInput[1] = 12
formattedInput[2] = 2

console.log('Part 1 answer', part1(formattedInput)[0])

const part2 = (noun, verb) => {
    const formattedInput = format(myInput)
    formattedInput[1] = noun
    formattedInput[2] = verb
    return part1(formattedInput)[0]
}

console.log('Part 2 answer', part2(95, 7))