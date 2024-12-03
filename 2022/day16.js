const testInput = Promise.resolve(`Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`)

realInput = require('./input').getInput(16).then(i => i.trim())

const main = async () => {
    const input = await testInput
    // const input = await realInput

    const valves = input.split("\n").reduce((acc, line) => {
        console.log(line)
        const [_, valve, flowRate, toValves] = line.match(/^Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.*)/)
        return {
            ...acc,
            [valve]: {
                flowRate,
                toValves: toValves.split(', ')
            }
        }
    }, {})

    const valvesWithFlowRate = Object.keys(valves)
        .filter(v => valves[v].flowRate > 0)
        .sort((a,b) => valves[b].flowRate - valves[a].flowRate)

    for (v in valvesWithFlowRate) {

    }
    console.log(valvesWithFlowRate)
    // const highestFlowRate = valves.reduce((acc, s) => {
    //     return s.flowRate > acc ? s.flowRate : acc
    // },0)
    const pressure = 0
    const openValves = new Set()
    const findNext = (curr) => {
        // find next non open valve that releases the most pressure for
        // the remainder of time
        curr.toValves.forEach(v => {
            if (valves[v].flowRate > 0) {

            }
        })
        curr.toValves.reduce((acc, loc) => {

        })
    }
    let location = Object.keys(valves)[0]
    // for (let i = 30; let i >)
    // Array.from(Array(30)).forEach(_ => {

    // })
}
main()