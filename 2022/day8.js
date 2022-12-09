const testInput = Promise.resolve(`30373
25512
65332
33549
35390`)

realInput = require('./input').getInput(8)

realInput.then(input => {
    const g = input.split("\n").reduce((acc, e) => e ? [...acc, Array.from(e)] : acc, [])
    let notVisibleCount = 0
    for (let i=1; i<g.length-1; i++) {
        for (let j=1; j<g.length-1; j++) {

            const downMax = Math.max(...Array.from(Array(g.length - (i+1))).map((_,k) => g[k+i+1][j]))
            const rightMax = Math.max(...Array.from(Array(g.length - (j+1))).map((_,k) => g[i][j+1+k]))
            const leftMax = Math.max(...Array.from(Array(j)).map((_,k) => g[i][j-1-k]))
            const upMax = Math.max(...Array.from(Array(i)).map((_,k) => g[i-1-k][j]))

            if ([downMax, rightMax, leftMax, upMax].every(t => t >= g[i][j])) {
                notVisibleCount++
            }
        }
    }
    console.log('Part 1:', g.length * g[0].length - notVisibleCount)


    // console.log(g)
    let highestScore = 0
    for (let i=1; i<g.length-1; i++) {
        for (let j=1; j<g.length-1; j++) {

            let downCount = 0
            for (let k=1; k<g.length-i; k++) {
                downCount++
                // console.log('hi', g[i][j], g[k+i][j], g[k+i][j] >= g[i][j])
                if (g[k+i][j] >= g[i][j]) break;
            }
            // console.log('downCount', downCount, g[i][j])

            let rightCount = 0
            for (let k=1; k<g.length-j; k++) {
                rightCount++
                // console.log('hi', g[i][j], g[i][j+k], g[i][j+k] >= g[i][j])
                if (g[i][j+k] >= g[i][j]) break;
            }
            // console.log('rightCount', rightCount, g[i][j])

            let upCount = 0
            for (let k=i-1; k>=0; k--) {
                upCount++
                // console.log('hi', g[i][j], g[k][j], g[k][j] >= g[i][j])
                if (g[k][j] >= g[i][j]) break;
            }
            // console.log('upCount', upCount, g[i][j])

            let leftCount = 0
            for (let k=j-1; k>=0; k--) {
                leftCount++
                // console.log('hi', g[i][j], g[i][k], g[i][k] >= g[i][j])
                if (g[i][k] >= g[i][j]) break;
            }
            // console.log('leftCount', leftCount, g[i][j])

            const total = downCount * upCount * rightCount * leftCount
            if (total > highestScore) {
                highestScore = total
            }
        }
    }
    console.log('Part 2:', highestScore)
})
