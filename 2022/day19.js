const testInput = Promise.resolve(`Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`)

realInput = require('./input').getInput(19).then(i => i.trim())

const main = async () => {
    const input = await testInput
    // const input = await realInput
    const blueprints = input.split("\n").map(line => {
        const [_, oreCost, clayCost, obsidianOreCost, obsidianClayCost, geodeOreCost, geodeObsidianCost] = line.match(/Each ore robot costs (\d+) ore\. Each clay robot costs (\d+) ore\. Each obsidian robot costs (\d+) ore and (\d+) clay\. Each geode robot costs (\d+) ore and (\d+) obsidian/)
        return {
            robotCosts: {
                ore: {
                    ore: oreCost
                },
                clay: {
                    ore: clayCost
                },
                obsidian: {
                    ore: obsidianOreCost,
                    clay: obsidianClayCost
                },
                geode: {
                    ore: geodeOreCost,
                    obsidian: geodeObsidianCost
                }
            }
        }
    })
    const start = {
        robots: {
            ore: 1,
            clay: 0,
            obsidian: 0,
            geode: 0
        },
        stuff: {
            ore: 0,
            clay: 0,
            obsidian: 0,
            geode: 0
        }
    }
    const collect = (state) => {
        return Object.keys(state.robots).reduce((accum, k) => {
            return state.robots[k] > 0 ? {...accum, [k]: state.stuff[k] + state.robots[k] } : accum
        },state.stuff);
    }
    const buyRobot = (robot, state, blueprint) => {
        const newStuff = {...state.stuff}
        Object.keys(blueprint.robotCosts[robot]).every(c => {
            newStuff[c] = newStuff[c] - blueprint.robotCosts[robot][c]
        })
        return { stuff: newStuff, robots: { ...state.robots, [robot]: state.robots[robot] + 1} }
    }
    let options = [start]
    Array.from(Array(24)).forEach(_ => {
        options.map(collect)

    })

    const end = Array.from(Array(24)).reduce((acc, v) => {
        // console.log(acc)
        const newStuff = collect(acc)
        // Which robot should I prioritize buying?
        // What do we need to create the next level robot
        const robotsToBuy = Object.keys(acc.robots).map(r => {
            return Object.keys(blueprints[0].robotCosts[r]).every(c => {
                return acc.stuff[c] >= blueprints[0].robotCosts[r][c]
            })
        })
        if (robotsCanBuy.length > 0) {

            const newState = buyRobot(robotsCanBuy[0], {...acc, stuff: newStuff}, blueprints[0])
            return {...acc, ...newState}
        }
        return {...acc, stuff: newStuff}
        // const newRobots = Object.keys(acc.robots).reduce((newrs, r) => {
        //     const canBuy = Object.keys(blueprints[0].robotCosts[r]).every(c => {
        //         return acc.stuff[c] >= blueprints[0].robotCosts[r][c]
        //     })
        //     if (canBuy) {
        //         Object.keys(blueprints[0].robotCosts[r]).every(c => {
        //             newStuff[c] = newStuff[c] - blueprints[0].robotCosts[r][c]
        //         })
        //         return {...newrs, [r]: acc.robots[r] + 1}
        //     }
        //     return newrs
        // }, {})
        // return {...acc, stuff: {...acc.stuff, ...newStuff}, robots: {...acc.robots, ...newRobots}}
        // console.log(acc, robotsCanBuy)
        return {...acc, ...newState}
    }, start)
    console.log(end)
}
main()
