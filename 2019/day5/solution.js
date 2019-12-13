const myInput = require('./input')

const format = (input) => input.split(',').map(i => parseInt(i))

const part1 = (instructions = [], input, position = 0) => {

    const test = instructions[position].toString()

    const opcode = parseInt(test.slice(-2))

    const firstParamMode = test.length > 2 ? test.slice(-3, -2) : 0
    const secondParamMode = test.length > 3 ? test.slice(-4, -3) : 0
    const thirdParamMode = test.length > 4 ? test.slice(-5, -4) : 0

    const firstParam = firstParamMode == 1 ? instructions[position + 1] : instructions[instructions[position + 1]]
    const secondParam = secondParamMode == 1 ? instructions[position + 2] : instructions[instructions[position + 2]]
    const thirdParam = thirdParamMode == 1 ? instructions[position + 3] : instructions[position + 3]

    switch(opcode) {
        case 1: {
            console.log('1:', firstParam, secondParam, thirdParam, instructions.slice(position, position + 4))
            instructions[thirdParam] = firstParam + secondParam
            return part1(instructions, input, position + 4)
        }
        case 2: {
            console.log('2:', firstParam, secondParam, thirdParam)
            instructions[thirdParam] = firstParam * secondParam
            return part1(instructions, input, position + 4)
        }
        case 3: {
            console.log('3:', firstParam, instructions[position + 1], instructions.slice(position, position + 2))
            instructions[instructions[position + 1]] = input
            return part1(instructions, input, position + 2)
        }
        case 4: {
            console.log('4:', firstParam)
            if (firstParam !== 0) {
                console.log('ERROR', instructions[firstParam])
                return
            }
            return part1(instructions, input, position + 2)
        }
        case 5: {
            if (firstParam !== 0) {
                return part1(instructions, input, secondParam)
            }
            return part1(instructions, input, position + 3)
        }
        case 6: {
            if (firstParam === 0) {
                return part1(instructions, input, secondParam)
            }
            return part1(instructions, input, position + 3)
        }
        case 7: {
            instructions[thirdParam] = firstParam < secondParam ? 1 : 0
            return part1(instructions, input, position + 4)
        }
        case 8: {
            instructions[thirdParam] = firstParam === secondParam ? 1 : 0
            return part1(instructions, input, position + 4)
        }
        case 99:
        default:
            console.log('END')
            return instructions
    }
}


part1(format(myInput), 5)
// part1(format('3,3,1108,-1,8,3,4,3,99'), 8)
