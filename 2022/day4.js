realInput = require('./input').getInput(4)

testInput = Promise.resolve(`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`)

const createArray = (start, end) => {
    const arr = []
    for (let i=0; i <= end - start; i++) {
        arr.push(start + i)
    }
    return arr
}

realInput.then(input => {
    const part1 = input.split("\n").reduce((acc, pair) => {
        const [first, second] = pair.split(',')
        if (first && second) {
            const firstarr = createArray(...first.split('-').map(x => parseInt(x)))
            const secondarr = createArray(...second.split('-').map(x => parseInt(x)))
            const intersection = firstarr.filter(x => secondarr.includes(x))
            if (intersection.length == firstarr.length || intersection.length == secondarr.length) {
                return acc + 1
            }
        }
        return acc
    }, 0)
    console.log('Part 1:', part1)

    const part2 = input.split("\n").reduce((acc, pair) => {
        const [first, second] = pair.split(',')
        if (first && second) {
            const firstarr = createArray(...first.split('-').map(x => parseInt(x)))
            const secondarr = createArray(...second.split('-').map(x => parseInt(x)))
            const intersection = firstarr.filter(x => secondarr.includes(x))
            if (intersection.length > 0) {
                return acc + 1
            }
        }
        return acc
    }, 0)
    console.log('Part 2:', part2)
})