const myInput = require('./input')

const format = (input) => input.split(',').map(i => parseInt(i))

const run = (instructions = [], position, input) => {

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
            // console.log('1:', firstParam, secondParam, thirdParam, instructions.slice(position, position + 4))
            instructions[thirdParam] = firstParam + secondParam
            position += 4
            break
        }
        case 2: {
            // console.log('2:', firstParam, secondParam, thirdParam)
            instructions[thirdParam] = firstParam * secondParam
            position += 4
            break
        }
        case 3: {
            // console.log('3:', firstParam, instructions[position + 1], instructions.slice(position, position + 2))
            if (input === null) {
                return (newInput) => run(instructions, position, newInput)
            }
            instructions[instructions[position + 1]] = input
            input = null
            position += 2
            break
        }
        case 4: {
            // console.log('4:', firstParam, instructions, position)
            position += 2
            if (firstParam !== 0) {
                return { signal: firstParam, amplifier: run(instructions, position, input) }
            }
            break
        }
        case 5: {
            position = firstParam !== 0 ? secondParam : position + 3
            break
        }
        case 6: {
            position = firstParam === 0 ? secondParam : position + 3
            break
        }
        case 7: {
            instructions[thirdParam] = firstParam < secondParam ? 1 : 0
            position += 4
            break
        }
        case 8: {
            instructions[thirdParam] = firstParam === secondParam ? 1 : 0
            position += 4
            break
        }
        case 99:
        default:
            // console.log('END', opcode)
            return null
    }
    return run(instructions, position, input)
}

const intCodeComputer = (stuff = [], input) => {
    return run(stuff, 0, input)
}

const part1 = input => {
    const cleanInput = format(input)
    const getSignal = (sequence) => {
        const amplifiers = sequence.map(s => intCodeComputer(cleanInput, s))
        let signal = 0
        for (let i = 0; i < 5; i++) {
            const yep = amplifiers[i%5](signal)
            signal = yep.signal
            amplifiers[i%5] = yep.amplifier
        }
        return signal
        // return sequence.reduce((acc, seq) => {
        //     return intCodeComputer(cleanInput, seq)(acc)
        // }, 0)
    }
    
    const increment = (arr = []) => {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] === 4) {
                arr[i] = 0
                continue
            }
            arr[i]++
            break
        }
    }
        
    const sequence = [0,1,2,3,4]
    let maxSignal = 0
    while (sequence.join('') !== '43210') {
        increment(sequence)
        if (typeof sequence.find((val, i, arr) => arr.includes(val) && arr.indexOf(val) !== i) === 'undefined') {
            const signal = getSignal(sequence)
            if (signal > maxSignal) maxSignal = signal
        }
    }
    return maxSignal
}

console.log(part1(myInput))


/*************  Part 2 ***************/

const part2 = input => {
    const cleanInput = format(input)
    const getSignal = (sequence) => {
        const amplifiers = sequence.map(s => intCodeComputer([...cleanInput], s))
        let signal = 0
        let halts = 0
        let i = 0
        while (halts < 5) {
            if (typeof amplifiers[i%5] !== 'function') return 0
            
            let yep = amplifiers[i%5](signal)
            
            if (yep.amplifier === null) halts++

            if (yep !== null) {
                signal = yep.signal
                amplifiers[i%5] = yep.amplifier
            }
            i++
        }
        return signal
    }
    
    const increment = (arr = []) => {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] === 9) {
                arr[i] = 5
                continue
            }
            arr[i]++
            break
        }
    }
        
    const sequence = [5,6,7,8,9]
    let maxSignal = 0
    while (sequence.join('') !== '98766') {
        if (typeof sequence.find((val, i, arr) => arr.includes(val) && arr.indexOf(val) !== i) === 'undefined') {
            const signal = getSignal(sequence)
            if (signal > maxSignal) maxSignal = signal
        }
        increment(sequence)
    }
    return maxSignal
}

console.log(part2(myInput))