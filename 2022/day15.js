const testInput = Promise.resolve(`Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`)

realInput = require('./input').getInput(15).then(i => i.trim())

const main = async () => {
    // const input = await testInput
    const input = await realInput
    const stuff = input.split("\n").map(i => {
        let [sensor, beacon] = i.split(':').map(s => s.trim())
        const [sx, sy] = sensor.replace('Sensor at x=', '').replace(' y=', '').split(',').map(s => parseInt(s))
        const [bx, by] = beacon.replace('closest beacon is at x=', '').replace(' y=', '').split(',').map(s=> parseInt(s))
        const d = Math.abs(sx - bx) + Math.abs(sy - by)
        return {
            sensor: {x:sx,y:sy},
            beacon: {x:bx,y:by},
            d
        }
    })
    const limits = stuff.reduce((acc, {sensor, beacon, d}) => {
        return {
            bigX: Math.max(sensor.x, beacon.x, acc.bigX),
            minX: Math.min(sensor.x, beacon.x, acc.minX),
            bigD: Math.max(d, d, acc.bigD),
        }
    }, { bigX: 0, minX: 0, bigD: 0 })
    // const minX = stuff.reduce((acc, {sensor, beacon}) => {
    //     return Math.min(sensor.x, beacon.x, acc)
    // }, 0)
    // const bigD =
    const { bigX, minX, bigD} = limits;

    // part 1
    // const y = 10
    // let noExist = 0
    // for (let i=minX-bigD; i<=bigX+bigD; i++) {
    //     const found = stuff.find(({sensor, d}) => {
    //         const newD = Math.abs(i - sensor.x) + Math.abs(y - sensor.y)
    //         return newD <= d
    //     })
    //     if (found && !stuff.find(({beacon}) => {
    //         return beacon.x === i && beacon.y === y
    //     })) {
    //         noExist++
    //     }
    // }
    // console.log('Part 1:', noExist);

    // const limit = 4000000
    // const limit = 20
    // const edges = new Set()
    // .filter(({sensor}) => sensor.x === 8 && sensor.y ===7)
    // const add = (x,y) => {
    //     if (x >=0 && x <= limit && y >= 0 && y <= limit) {
    //         edges.add(`${x},${y}`)
    //     }
    // }
    // stuff.forEach(({sensor, d}) => {
    //     // edges.add(`${sensor.x},${sensor.y}`)
    //     add(sensor.x,sensor.y+d)
    //     add(sensor.x,sensor.y+d-1)
    //     let x = sensor.x
    //     let y = sensor.y+d
    //     while (x !== sensor.x+d) {
    //         x +=1, y-=1
    //         add(x,y)
    //         if (x !== sensor.x+d) add(x,y-1)
    //     }
    //     x = sensor.x
    //     y = sensor.y+d
    //     while (x !== sensor.x-d) {
    //         x -=1, y-=1
    //         add(x,y)
    //         if (x !== sensor.x-d) add(x,y-1)
    //     }
    //     add(sensor.x,sensor.y-d)
    //     add(sensor.x,sensor.y-d+1)
    //     x = sensor.x
    //     y = sensor.y-d
    //     while (x !== sensor.x+d) {
    //         x +=1, y+=1
    //         add(x,y)
    //         if (x !== sensor.x+d) add(x,y+1)
    //     }
    //     x = sensor.x
    //     y = sensor.y-d
    //     while (x !== sensor.x-d) {
    //         x -=1, y+=1
    //         add(x,y)
    //         if (x !== sensor.x-d) add(x,y+1)
    //     }

    //     // for (let i=d; i>0; i--) {
    //     //     noBeacon.add(`${sensor.x},${sensor.y-i}`)
    //     //     noBeacon.add(`${sensor.x+i},${sensor.y}`)
    //     //     noBeacon.add(`${sensor.x-i},${sensor.y}`)
    //     //     if (d-i > 0){
    //     //         for (let j=d-i; j>0; j--){
    //     //             noBeacon.add(`${sensor.x+j},${sensor.y+i}`)
    //     //             noBeacon.add(`${sensor.x-j},${sensor.y+i}`)
    //     //             noBeacon.add(`${sensor.x+j},${sensor.y-i}`)
    //     //             noBeacon.add(`${sensor.x-j},${sensor.y-i}`)
    //     //             noBeacon.add(`${sensor.x+i},${sensor.y+j}`)
    //     //             noBeacon.add(`${sensor.x+i},${sensor.y-j}`)
    //     //             noBeacon.add(`${sensor.x-i},${sensor.y+j}`)
    //     //             noBeacon.add(`${sensor.x-i},${sensor.y-j}`)
    //     //         }
    //     //     }
    //     // }
    // });
    // console.log(stuff);
    // console.log(edges)
    // Array.from(edges).every((e) => {
    //     const [x, y] = e.split(',').map(i => parseInt(i))
    //     // if (
    //     //     y+1 < limit && x > 0 &&
    //     //     (!edges.has(`${x},${y+1}`) || !edges.has(`${x},${y-1}`))
    //     // ) {
    //     //     console.log(x,y)
    //     //     console.log('Part 2:',x*4000000+y)
    //     //     return false
    //     // }
    //     // return true

    //     const found = stuff.find(({sensor, d}) => {
    //         // if (
    //         //     sensor.x === i &&
    //         //     sensor.y - d < j &&
    //         //     j < sensory.y + d
    //         // ) {
    //         //     console.log('------------------skip---------------------------')
    //         //     j = sensor.y + d
    //         //     return true
    //         // }
    //         // const xDist = i - sensor.x
    //         // const yDist = j - sensor.x
    //         const newD = Math.abs(x - sensor.x) + Math.abs(y+1 - sensor.y)
    //         const otherD = Math.abs(x - sensor.x) + Math.abs(y-1 - sensor.y)
    //         return newD <= d && otherD <= d
    //     })
    //     if (!found) {
    //         console.log(x,y)
    //         console.log('Part 2:',x*4000000+y)
    //         return false
    //     }
    //     return true
    // })
    // part 2
    (() => {
        const most = 4000000
        for (let i=0; i<=most; i++) {
            if (i % 100 === 0) {
                console.log(i/4000000 * 100)
            }
            for (let j=0; j<=most; j++) {
                const found = stuff.find(({sensor, d}) => {
                    // if (
                    //     sensor.x === i &&
                    //     sensor.y - d < j &&
                    //     j < sensory.y + d
                    // ) {
                    //     console.log('------------------skip---------------------------')
                    //     j = sensor.y + d
                    //     return true
                    // }
                    // const xDist = i - sensor.x
                    // const yDist = j - sensor.x
                    const newD = Math.abs(i - sensor.x) + Math.abs(j - sensor.y)
                    if (newD <= d) {
                        if (j - sensor.x > 0) {
                            j += Math.abs(j - sensor.x)
                        }
                    }
                    return newD <= d
                })
                if (!found) {
                    console.log('Part 2:',i*4000000+j)
                    return
                }
            }
        }
    })()
}
main()
