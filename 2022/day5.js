realInput = require('./input').getInput(5)

testInput = Promise.resolve(`    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`)

realInput.then(input => {
    let haveStarting = false
    const stacks = []
    input.split("\n").forEach(element => {
        if (Array.from(element)[1] == '1') {
            haveStarting = true
        }
        if (!haveStarting) {
            const line = Array.from(element)
            let stackNo = 1
            for (let i=1; i<line.length; i+=4) {
                if (line[i].trim()) {
                    stacks[stackNo] = [...stacks[stackNo] || [], line[i]]
                }
                stackNo += 1
            }
        }
        if (haveStarting) {
            const [_, count, __, fromStack, ____, toStack] = element.split(" ")
            if (count, fromStack, toStack) {
                for (let i=0; i<count; i++) {
                    const [first, ...rest] = stacks[fromStack]
                    stacks[toStack] = [first, ...stacks[toStack]]
                    stacks[fromStack] = rest
                }
            }
        }
    });
    console.log("Part 1:", stacks.reduce((acc, s) => s ? acc += s[0] : acc, ""))
})

realInput.then(input => {
    let haveStarting = false
    const stacks = []
    input.split("\n").forEach(element => {
        if (Array.from(element)[1] == '1') {
            haveStarting = true
        }
        if (!haveStarting) {
            const line = Array.from(element)
            let stackNo = 1
            for (let i=1; i<line.length; i+=4) {
                if (line[i].trim()) {
                    stacks[stackNo] = [...stacks[stackNo] || [], line[i]]
                }
                stackNo += 1
            }
        }
        if (haveStarting) {
            const [_, count, __, fromStack, ____, toStack] = element.split(" ")
            if (count, fromStack, toStack) {
                stacks[toStack] = [...stacks[fromStack].slice(0, count), ...stacks[toStack]]
                stacks[fromStack] = stacks[fromStack].slice(count)
            }
        }
    });
    console.log("Part 2:", stacks.reduce((acc, s) => s ? acc += s[0] : acc, ""))
})