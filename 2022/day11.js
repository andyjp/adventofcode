const testInput = Promise.resolve(`Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`)

realInput = require('./input').getInput(11)

const main = async () => {
    // const input = await testInput
    const input = (await realInput).trim()
    const monkeys = []
    let currMonkey = 0
    for (let line of input.split("\n")) {
        const [attr, val] = line.split(":")
        if (attr.includes("Monkey")) {
            const [monk, ...rest] = /\d/.exec(attr)
            currMonkey = monk
        }
        if (attr.includes("Starting items")) {
            monkeys[currMonkey] = {
                ...(monkeys[currMonkey] || {}),
                inspections: 0,
                items: val.trim().split(",").map(v => parseInt(v.trim()))
            }
        }
        if (attr.includes("Operation")) {
            monkeys[currMonkey] = {
                ...(monkeys[currMonkey] || {}),
                op: (old) => eval(val.split("=")[1].trim())
            }
        }
        if (attr.includes("Test")) {
            const [divBy, ...rest] = /\d+/.exec(val)
            monkeys[currMonkey] = {
                ...(monkeys[currMonkey] || {}),
                divBy
            }
        }
        if (attr.includes("If true")) {
            const [toMonkey, ...rest] = /\d+/.exec(val)
            monkeys[currMonkey] = {
                ...(monkeys[currMonkey] || {}),
                ifTrue: parseInt(toMonkey)
            }
        }
        if (attr.includes("If false")) {
            const [toMonkey, ...rest] = /\d+/.exec(val)
            monkeys[currMonkey] = {
                ...(monkeys[currMonkey] || {}),
                ifFalse: parseInt(toMonkey)
            }
        }
    }

    const round = () => {
        worryDivisor = monkeys.reduce((acc, m) => acc*m.divBy, 1)
        monkeys.forEach(m => {
            m.items.forEach(i => {
                m.inspections++
                // let wl = Math.floor(m.op(i)/3) // part 1
                let wl = m.op(i) // part 2
                let newMonk = m.ifFalse
                if (wl % m.divBy === 0) {
                    newMonk = m.ifTrue
                }
                wl = wl % worryDivisor // part 2 https://en.wikipedia.org/wiki/Chinese_remainder_theorem
                monkeys[newMonk].items.push(wl)
            })
            m.items = []
        })
    }
    Array.from(Array(10000)).forEach(() => round())
    const inspections = monkeys.sort((a,b) => b.inspections - a.inspections).map(m => m.inspections)
    console.log(inspections[0] * inspections[1])
}
main()