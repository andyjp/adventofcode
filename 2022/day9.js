const testInput = Promise.resolve(`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`)

const testInput2 = Promise.resolve(`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`)

realInput = require('./input').getInput(9)

realInput.then(input => {
    (() => {
        let head = '0 0'
        let tail = '0 0'
        const tailVisited = new Set()
        input.trim().split("\n").forEach(m => {
            const [direction, steps] = m.split(' ')
            Array.from(Array(parseInt(steps))).forEach(() => {
                let [hx, hy] = head.split(' ')
                let [tx, ty] = tail.split(' ')
                switch (direction) {
                    case 'R':
                        hx++
                        if (Math.abs(hx-tx) > 1) {
                            tx++
                            if (hy !== ty) ty = hy
                        }
                        break;
                    case 'U':
                        hy++
                        if (Math.abs(hy-ty) > 1) {
                            ty++
                            if (hx !== tx) tx = hx
                        }
                        break;
                    case 'L':
                        hx--
                        if (Math.abs(hx-tx) > 1) {
                            tx--
                            if (hy !== ty) ty = hy
                        }
                        break;
                    case 'D':
                        hy--
                        if (Math.abs(hy-ty) > 1) {
                            ty--
                            if (hx !== tx) tx = hx
                        }
                        break;
                    default:
                        throw new Error(`direction ${direction} unexpected`)
                }
                head = `${hx} ${hy}`
                tail = `${tx} ${ty}`
                tailVisited.add(tail)
            })
        })
        console.log('Part 1:', tailVisited.size)
    })();

    const moveKnot = (direction, rope, newRope = []) => {
        const [frontKnot, knot, ...rest] = rope
        let [hx, hy] = frontKnot.split(' ')
        let [tx, ty] = knot.split(' ')

        hx = parseInt(hx)
        hy = parseInt(hy)
        tx = parseInt(tx)
        ty = parseInt(ty)

        const distX = hx-tx
        const distY = hy-ty

        // help from https://github.com/CodingAP/advent-of-code/blob/main/profiles/github/2022/day9/solution.js
        if (Math.abs(distX) > 1) {
            tx += Math.sign(distX);
            if (Math.abs(distY) != 0) ty += Math.sign(distY);
        } else if (Math.abs(distY) > 1) {
            ty += Math.sign(distY);
            if (Math.abs(distX) != 0) tx += Math.sign(distX);
        }
        // console.log(frontKnot, knot)
        // if (hx-tx > 1) {
        //     tx++
        // ERROR This doesn't work because we may move right but want to move down instead of up
        // if the y dist is greater than 1
        //     if (hy-ty > 1) ty++
        //     else if (hy !== ty) ty = hy
        // }
        // else if (hy-ty > 1) {
        //     ty++
        //     if (hx-tx > 1) tx++
        //         else if (hx !== tx) tx = hx
        // }
        // else if (hx-tx < -1) {
        //     tx--
        //     if ((hy-ty < -1)) ty--
        //     else if (hy !== ty) ty = hy
        // }
        // else if (hy-ty < -1) {
        //     ty--
        //     if ((hx-tx < -1)) tx--
        //     else if (hx !== tx) tx = hx
        // }
        newKnot = `${tx} ${ty}`
        newRope.push(newKnot)
        if (rest.length == 0) {
            return newRope
        }
        return moveKnot(direction, [newKnot, ...rest], newRope)
    }
    (() => {
        let rope = ['0 0','0 0','0 0','0 0','0 0','0 0','0 0','0 0','0 0','0 0']
        const tailVisited = new Set()
        input.trim().split("\n").forEach(m => {
            const [direction, steps] = m.split(' ')
            Array.from(Array(parseInt(steps))).forEach(() => {
                // console.log(direction, steps)
                let [hx, hy] = rope[0].split(' ')
                switch (direction) {
                    case 'R':
                        hx++
                        break;
                    case 'U':
                        hy++
                        break;
                    case 'L':
                        hx--
                        break;
                    case 'D':
                        hy--
                        break;
                    default:
                        throw new Error(`direction ${direction} unexpected`)
                }
                rope[0] = `${hx} ${hy}`
                rope = moveKnot(direction, rope, [rope[0]])
                // console.log(rope)
                tailVisited.add(rope[rope.length-1])
            })
        })
        console.log('Part 2:', tailVisited.size)
    })();
})