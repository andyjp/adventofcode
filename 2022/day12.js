const testInput = Promise.resolve(`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`)

realInput = require('./input').getInput(12)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const alpha = Array.from(Array(26)).map((_, i) => String.fromCharCode(97+i))


const main = async () => {
    const input = await realInput
    const map = input.split('\n').map(i => Array.from(i))
    // Find S
    let start = ''
    let end = ''
    for (let row of map.keys()) {
        for (let col of map[row].keys()) {
            if (map[row][col] === 'S') {
                start = { x: parseInt(row), y: parseInt(col) }
            }
            if (map[row][col] === 'E') {
                end = { x: parseInt(row), y: parseInt(col) }
            }
            if (start && end) break
        }
        if (start && end) break
    }

    const alphaPos = alpha.reduce((acc,a) => {
        const nextHeight = alpha[alpha.indexOf(a)+1] || alpha[alpha.length-1]
        return {
            ...acc,
            [a]: map.reduce(
                (acc, x, i) => [...acc, x.reduce(
                    (acc, y, j) => y === nextHeight ? [...acc, {x:i, y:j}] : acc,
                [])],
            []).flat()
        }
    }, {})

    const manhattenDistance = (a,b) => {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
    }
    // console.log(alphaPos['r'], map[alphaPos['r'][0].x][alphaPos['r'][0].y])
    // console.log(alphaPos['r'].reduce((acc, n) => {
    //     const d = manhattenDistance({ x: 21, y: 1 }, n)
    //     // console.log(d)
    //     if (d < acc.d) {
    //         return {...n, d}
    //     }
    //     return acc
    // }, {d:99999}))
    // exit()

    const getHeight = p => {
        if (map[p.x][p.y] === 'S') return 'a'
        if (map[p.x][p.y] === 'E') return 'z'
        return map[p.x][p.y]
    }
    const nextHighest = p => {
        // console.log('nh', p)
        // const nextHeight = alpha[alpha.indexOf(getHeight(p))+1] || alpha[alpha.length-1]
        // // console.log(nextHeight)

        // return map.reduce(
        //     (acc, x, i) => [...acc, x.reduce(
        //         (acc, y, j) => y === nextHeight ? [...acc, {x:i, y:j}] : acc,
        //     [])],
        // []).flat()
        const currHeight = getHeight(p)
        console.log('currHeight', currHeight)
        return alphaPos[currHeight].reduce((acc, n) => {
            const d = manhattenDistance(p, n)
            if (d < acc.d) {
                return {...n, d}
            }
            return acc
        }, {d:99999})
    }
    const getOptions = (currPos, visited) => {
        const steps = [
            {...currPos, x: currPos.x+1},
            {...currPos, x: currPos.x-1},
            {...currPos, y: currPos.y+1},
            {...currPos, y: currPos.y-1}
        ].filter(p => {
            if (p.x < 0 || p.y < 0 || p.x >= map.length || p.y >= map[0].length || visited.includes(`${p.x},${p.y}`)) return false
            const h = getHeight(currPos)
            const newH = getHeight(p)
            return h === newH || newH < h || (newH.charCodeAt(0) - h.charCodeAt(0) === 1)
        })
        return steps
        const nextH = nextHighest(currPos)
        console.log('nh', nextH, 'currPos', currPos)
        const res = steps.sort((a,b) => {
            return manhattenDistance(nextH,a) - manhattenDistance(nextH,b)
            return (
                Math.pow(nextH.x-a.x,2)+ Math.pow(nextH.y-a.y,2) //+ Math.pow('z'.charCodeAt(0) - map[a.x][a.y].charCodeAt(0),2)
            ) - (
                Math.pow(nextH.x-b.x,2)+ Math.pow(nextH.y-b.y,2) //+ Math.pow('z'.charCodeAt(0) - map[b.x][b.y].charCodeAt(0),2)
            )
        })
        console.log(res)
        return res
    }

    const search = (pos, count = 0, visited = [], path='') => {
        visited.push(`${pos.x},${pos.y}`)
        path+=`(${pos.x},${pos.y})`
        if (map[pos.x][pos.y] === 'E') {
            console.log(path)
            return count
        }
        count+=1
        const options = getOptions(pos, visited)
        if (options.length === 0) {
            // console.log('nope', path)
            return 99999999
        }
        // console.log(pos)
        // return search(options[0], count, [...visited], path)
        return Math.min(...options.map(o => search(o, count, [...visited], path)).flat().filter(o => o !== 99999999))
    }
    console.log(search(start))
    // 818 is too high


    // const run = (p, previous = {}, count = 0) => {
    //     pos = getOptions(p, previous)
    //     console.log(pos, count)
    //     count++
    //     if (map[pos.x][pos.y] === 'E') {
    //         return count
    //     }
    //     p.visited=true
    //     return run(pos, p, count)
    // }
    // let count = 0
    // let pos = start
    // const visited = []
    // const branches = []
    // const getBranch = () => {
    //     const branch = branches.pop()
    //     count = branch.count
    //     // console.log('branch', branch)
    //     const options = branch.options.filter(o => !visited.includes(`${o.x}${o.y}`))
    //     if (options.length === 0) {
    //         return getBranch()
    //     }
    //     return options
    // }
    // do {
    //     visited.push(`${pos.x}${pos.y}`)
    //     console.log(map.reduce((acc, row) => [...acc, row.join(''), "\n"], []).join(''))
    //     let options = getOptions(pos, visited)
    //     map[pos.x][pos.y] = '.'
    //     // console.log(options)
    //     pos = options.shift()
    //     // console.log('pos', pos)
    //     count++
    //     if (!pos) {
    //         // const branch = branches.pop()
    //         // count = branch.count
    //         // // console.log('branch', branch)
    //         // options = branch.options.filter(o => !visited.includes(`${o.x}${o.y}`))
    //         // pos = options[0]
    //         options = getBranch()
    //         pos = options[0]
    //     }
    //     // console.log(pos)

    //     if (options.length > 0) {
    //         branches.push({ options, count})
    //     }
    //     console.log(count)
    //     await sleep(20)
    // } while (map[pos.x][pos.y] !== 'E')
}

// main()

// realInput.then(input => {

// })

const dijkstra = async () => {
    const input = await realInput
    const map = input.split('\n').map(i => Array.from(i))
    let unvisited = []
    // Find S and E
    let start = ''
    let end = ''
    for (let row of map.keys()) {
        for (let col of map[row].keys()) {
            const pos = { x: parseInt(row), y: parseInt(col) }
            if (map[row][col] === 'S') {
                start = pos
            }
            if (map[row][col] === 'E') {
                end = pos
            }
            unvisited.push(pos)
        }
    }
    const getHeight = p => {
        if (map[p.x][p.y] === 'S') return 'a'
        if (map[p.x][p.y] === 'E') return 'z'
        return map[p.x][p.y]
    }
    const distance = unvisited.reduce((acc, u) => ({...acc, [`${u.x},${u.y}`]: 9999999}), {})
    // distance[`${start.x},${start.y}`] = 0 // part 1
    distance[`${end.x},${end.y}`] = 0 // part 2

    const visited = []
    let pos = start
    do {
        pos = unvisited.reduce((acc, u) => {
            const d = distance[`${u.x},${u.y}`]
            if (d < acc.d) return {...u, d}
            return acc
        },{d: 9999999999999})
        const neighbors = [
            {...pos, x: pos.x+1},
            {...pos, x: pos.x-1},
            {...pos, y: pos.y+1},
            {...pos, y: pos.y-1}
        ].filter(p => {
            if (p.x < 0 || p.y < 0 || p.x >= map.length || p.y >= map[0].length || visited.includes(`${p.x},${p.y}`)) return false
            const h = getHeight(pos)
            const newH = getHeight(p)
            // return newH.charCodeAt(0) <= h.charCodeAt(0)+1 // part 1
            return newH.charCodeAt(0) >= h.charCodeAt(0)-1 // part 2
        })
        neighbors.forEach(p => {
            distance[`${p.x},${p.y}`] = distance[`${p.x},${p.y}`] < distance[`${pos.x},${pos.y}`] + 1 ? distance[`${p.x},${p.y}`] : distance[`${pos.x},${pos.y}`] + 1
        })
        visited.push(`${pos.x},${pos.y}`)
        unvisited = unvisited.filter(u => !(u.x === pos.x && u.y === pos.y))
        // console.log(unvisited, visited, distance)
    // } while (!visited.includes(`${end.x},${end.y}`)) // part 1
    } while (!visited.find(v => {
        const [x,y] = v.split(',')
        return getHeight({x,y}) === 'a'
    })) // part 2
    // console.log(distance[`${end.x},${end.y}`]) // part 1
    // part 2
    const theOne = visited.filter(v => {
        const [x,y] = v.split(',')
        return getHeight({x,y}) === 'a'
    })
    console.log(theOne, distance[theOne[0]])
}

dijkstra()