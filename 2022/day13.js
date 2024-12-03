const { exit } = require('process')




const testInput = Promise.resolve(`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`)

// [[8,[[2,6,0,9],[4,9,5,5,3],[8],8,3],[1]],[0,[7,[8,8,8,1]],[],[[0],[8,6,9,9,1],2,6,2]],[],[1,[2,1,[1],8],[],8],[[9,7],[7,10],[[],9,9,7,3],[2,[],6],[[],5,[7,6,7,6,0],[3],[3,10,10,10]]]]
// [[[[8],1,[1,1,3,5,1],[0,3]],[],4,0,5],[],[3,3,[9,4,5,[4,2,3]],7,9],[7],[[[2,1]],[[2,9,10,0,6],[3,0,8],[0,3,2,9,1]]]]

// [[],[[[3],10,3,7]],[]]
// [[],[[],4,[2,[0],0,[]],4],[],[[5,0,10,6,9],2]]




realInput = require('./input').getInput(13).then(i => i.trim())

const main = async () => {
    // const input = await testInput;
    const input = await realInput;

    (() => {
    const pairs = input.split("\n\n")
    const compare = (a, b) => {
        // console.log(a,'vs',b, Math.max(a.length, b.length))
        for (let i=0; i<Math.max(a.length, b.length); i++) {
            // console.log(a[i],'vs',b[i])
            if (Array.isArray(a[i]) && !Array.isArray(b[i])) {
                const c = compare(a[i], [b[i]])
                if (c !== undefined) return c
            }
            if (!Array.isArray(a[i]) && Array.isArray(b[i])) {
                const c = compare([a[i]], b[i])
                if (c !== undefined) return c
            }

            if (a[i] !== undefined && b[i] === undefined) return 1 // right side out of items
            if (b[i] !== undefined && a[i] === undefined) return -1 // left side out of items
            if (!Array.isArray(a[i]) && !Array.isArray(b[i])) {
                if (a[i] === b[i]) {
                    if (i == a.length-1 && i == b.length-1) return undefined
                    continue
                }
                if (a[i] < b[i]) return -1
                if (a[i] > b[i]) return 1
            }
            if (Array.isArray(a[i]) && Array.isArray(b[i])) {
                const c = compare(a[i],b[i])
                if (c !== undefined) return c
            }
        }
    }
    // const sum = pairs.reduce((acc, pair) => {
    // const sum = pairs.map((pair, i) => {
    //     const [first, second] = pair.split("\n").map(p => eval(p))
    //     // console.log(`-------Pair ${i+1}--------`)
    //     // console.log(first[1], second[1])
    //     const c = compare(first,second)
    //     // console.log(c)
    //     // if (c === undefined) exit()
    //     // console.log(c)
    //     return c
    // })
    // console.log('Sum is:', sum.reduce((acc, s, i) => {
    //     // console.log(s,i+1,acc)
    //     // if (s) {
    //     //     console.log(i)
    //     // }
    //     return s ? acc+i+1 : acc
    // }, 0))
    const packets = pairs.flatMap(p => p.split("\n")).concat(["[[2]]", "[[6]]"]).map(p => eval(p)).sort((a,b) => {
        const c = compare(a,b)
        if (c === undefined) return 0
        return c
    }).map(p => p.toString())
    console.log((packets.indexOf('2')+1) * (packets.indexOf('6')+1))

})();

}
main()
