const testInput = Promise.resolve(`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`)

realInput = require('./input').getInput(14).then(i => i.trim())

const main = async () => {
    // const input = await testInput
    const input = await realInput

    const rocks = new Set
    input.split("\n").forEach(line => {
        let x = 0
        let y = 0
        const coords = line.split(' -> ')
        coords.forEach((coord, i) => {
            if (i === 0) {
                rocks.add(coord)
            } else {
                x = parseInt(coord.split(',')[0])
                y = parseInt(coord.split(',')[1])
                const [prevX, prevY] = coords[i-1].split(',').map(x => parseInt(x))
                let diffX = x - prevX
                let diffY = y - prevY
                while (diffX !== 0 || diffY !==0) {
                    rocks.add(`${prevX + diffX},${prevY + diffY}`)
                    diffX = diffX - Math.sign(diffX)
                    diffY = diffY - Math.sign(diffY)
                }
            }
        })
    })

    // Need to know the biggest x where sand falls to infinity
    const bigY = Array.from(rocks).reduce((acc,r) => {
        const y = parseInt(r.split(',')[1])
        return y > acc ? y : acc
    }, 0)

    let sandStop = false
    let start = '500,0'
    const sand = new Set()
    const fall = (pos) => {
        const [x,y] = pos.split(',').map(x => parseInt(x))
        if (rocks.has(pos) || sand.has(pos)
            || y === bigY+2 // part 2
        ) {
            // something exists here try down-left
            const downLeft = `${x-1},${y}`
            if (rocks.has(downLeft) || sand.has(downLeft)
                || y === bigY+2 // part 2
            ) {
                // something exists here try down-right
                const downRight = `${x+1},${y}`
                if (rocks.has(downRight) || sand.has(downRight)
                    || y === bigY+2 // part 2
                ) {
                    // console.log('stop')
                    sand.add(`${x},${y-1}`)
                    if (`${x},${y-1}` === start) sandStop = true // part 2
                    return
                }
                return fall(downRight)
            }
            return fall(downLeft)
        }
        // part 1
        // if (y+1 === bigY+1) {
        //     sandStop = true
        //     return
        // }

        return fall(`${x},${y+1}`)
    }
    while(sandStop===false) {
        let pos = start
        fall(pos)
    }
    console.log(sand.size)
}
main()