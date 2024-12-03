const testInput = Promise.resolve(`addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`)

realInput = require('./input').getInput(10)

realInput.then(input => {
    input = input.trim()
    const part1 = input.split("\n").reduce((acc, line) => {
        const [instr, value] = line.split(" ")
        const lastValue = acc[acc.length-1]
        if (instr === 'noop') {
            return [...acc, lastValue]
        }
        if (instr === 'addx') {
            return [...acc, lastValue, lastValue + parseInt(value)]
        }
    }, [1]);
    console.log('Part 1:', [20, 60, 100, 140, 180, 220].reduce((acc, cycle) => {
        return acc + (part1[cycle-1] * cycle)
    }, 0))

    const draw = (image, cycle, x) => {
        const compare = (cycle % 40 || 40)-1
        image += (compare) === x || (compare) === x-1 || (compare) === x+1 ? "#" : "."
        if (cycle % 40 === 0) image +="\n"
        return image
    }
    const part2 = input.split("\n").reduce(({image, cycle, x}, line) => {
        const [instr, value] = line.split(" ")
        if (instr === 'addx') {
            image = draw(image, cycle, x)
            cycle++
            image = draw(image, cycle, x)
            x += parseInt(value)
        } else {
            image = draw(image, cycle, x)
        }
        return {image, cycle: cycle+1, x}
    }, {image: '', cycle: 1, x: 1})
    console.log(`Part 2:\n${part2.image}`)
})