realInput = require('./input').getInput(2)

testInput = Promise.resolve(`A Y
B X
C Z`)

shapeScore = {
    'X': 1, // rock
    'Y': 2, // paper
    'Z': 3  // scissors
}

gameScore = (oppo, own) => {
    // draw
    if (
        (own === 'X' && oppo === 'A') || // 1 1 = 3
        (own === 'Y' && oppo === 'B') || // 2 2 = 3
        (own === 'Z' && oppo === 'C') // 3 3 = 3
    ) {
        return 3
    }
    // win
    if (
        (own === 'X' && oppo === 'C') || // 1 3 = 6
        (own === 'Y' && oppo === 'A') || // 2 1 = 6
        (own === 'Z' && oppo === 'B') // 3 2 = 6
    ) {
        return 6
    }
    // lose
    return 0
}

shapeScore2 = (oppo, outcome) => {
    if (outcome === 'X') { // lose
        switch (oppo) {
            case 'A':
                return 3
            case 'B':
                return 1
            case 'C':
                return 2
        }
    }
    if (outcome === 'Y') { // draw
        switch (oppo) {
            case 'A':
                return 1
            case 'B':
                return 2
            case 'C':
                return 3
        }
    }
    if (outcome === 'Z') { // win
        switch (oppo) {
            case 'A':
                return 2
            case 'B':
                return 3
            case 'C':
                return 1
        }
    }
}

gameScore2 = {
    'X': 0,
    'Y': 3,
    'Z': 6
}

realInput.then(input => {
    result = input.split("\n").reduce((acc, round) => {
        const [shapeOppo, shapeOwn] = round.split(" ")
        if (shapeOppo && shapeOwn) {
            const score = shapeScore[shapeOwn] + gameScore(shapeOppo, shapeOwn)
            return acc + score
        }
        return acc
    }, 0)
    console.log(`Part 1: ${result}`)

    result = input.split("\n").reduce((acc, round) => {
        const [shapeOppo, outcome] = round.split(" ")
        if (shapeOppo && outcome) {
            const score = shapeScore2(shapeOppo, outcome) + gameScore2[outcome]
            return acc + score
        }
        return acc
    }, 0)
    console.log(`Part 2: ${result}`)
})