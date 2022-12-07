realInput = require('./input').getInput(6)

testInput = Promise.resolve(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`)

realInput.then(input => {
    (() => {
        const res = Array.from(input)
        for (let i=0; i<res.length-3; i++) {
            const s = new Set(res.slice(i,i+4))
            if (s.size == 4) {
                console.log('Part 1:', i+4)
                return
            }
        }
    })();

    (() => {
        const res = Array.from(input)
        for (let i=0; i<res.length-3; i++) {
            const s = new Set(res.slice(i,i+14))
            if (s.size == 14) {
                console.log('Part 2:', i+14)
                return
            }
        }
    })()
})