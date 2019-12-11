const getCoordinates = input => {
    let previousValue
    return input.split(',').map(step => {
        let { x, y } = previousValue || { x: 0, y: 0 }
        const arg = parseInt(step.substr(1))
        switch(step[0]) {
            case 'R':
                x += arg
                break;
            case 'L':
                x -= arg
                break;
            case 'U':
                y += arg
                break;
            case 'D':
                y -= arg
                break;
        }
        previousValue = { x, y }
        return { x, y }
    })
}

const ManhatDist = (x, y) => Math.abs(x) + Math.abs(y)

const isCrossing = (prevPos1, pos1, prevPos2, pos2) => ((prevPos1.y < pos2.y && pos2.y < pos1.y) || (pos1.y < pos2.y && pos2.y < prevPos1.y)) && 
((prevPos2.x < pos1.x && pos1.x < pos2.x) || (pos2.x < pos1.x && pos1.x < prevPos2.x))

const part1 = input => {
    const [wire1, wire2] = input.split('\n').map(getCoordinates)
    let answer = 99999999
    wire1.forEach((pos1, i) => {
        const prevPos1 = i === 0 ? { x: 0, y: 0} : wire1[i - 1]
        wire2.forEach((pos2, j) => {
            const prevPos2 = j === 0 ? { x: 0, y: 0} : wire2[j - 1]
            if (isCrossing(prevPos1, pos1, prevPos2, pos2) || isCrossing(prevPos2, pos2, prevPos1, pos1)) {
                let sum
                if (prevPos1.x === pos1.x) {
                    sum = ManhatDist(pos1.x, pos2.y)
                } else {
                    sum = ManhatDist(pos1.y, pos2.x)
                }
                answer = sum < answer ? sum : answer
            }
        })
    })
    console.log('Part 1:', answer)
}

const getIntersections = input => {
    const [wire1, wire2] = input.split('\n').map(getCoordinates)
    return wire1.reduce((acc, pos1, i) => {
        const prevPos1 = i === 0 ? { x: 0, y: 0} : wire1[i - 1]
        wire2.forEach((pos2, j) => {
            const prevPos2 = j === 0 ? { x: 0, y: 0} : wire2[j - 1]
            if (isCrossing(prevPos1, pos1, prevPos2, pos2) || isCrossing(prevPos2, pos2, prevPos1, pos1)) {
                acc.push(prevPos1.x === pos1.x ? { x: pos1.x, y: pos2.y } : { x: pos2.x, y: pos1.y})
            }
        })
        return acc
    }, [])
}

const part2 = input => {
    const [wire1, wire2] = input.split('\n')
    const intersections = getIntersections(input)
    return intersections
        .map(i => getNumberOfSteps(i, wire1) + getNumberOfSteps(i, wire2))
        .reduce((acc, i) => i < acc ? i : acc, 999999)
}

const getNumberOfSteps = (destination, wire) => {
    const { x: destX, y: destY } = destination
    let x = 0
    let y = 0
    return wire.split(',').slice(0).reduce((acc, step, _, arr) => {
        const length = parseInt(step.substr(1))
        if (x === destX && y + length > destY) {
            arr.splice(1)
            return acc + Math.abs(destY - y)
        } else if (y === destY && x + length > destX) {
            arr.splice(1)
            return acc + Math.abs(destX - x)
        }
        switch(step[0]) {
            case 'R':
                x += length
                break;
            case 'L':
                x -= length
                break;
            case 'U':
                y += length
                break;
            case 'D':
                y -= length
                break;
        }
        return acc + length
    }, 0)
}

// part1(`R75,D30,R83,U83,L12,D49,R71,U7,L72
// U62,R66,U55,R34,D71,R55,D58,R83`)

// part1(`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
// U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`)
// part1(require('./input'))


const test1 = part2(`R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`)

const test2 = part2(`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`)

console.log(test1, test2)

console.log('Part 2:', part2(require('./input')))