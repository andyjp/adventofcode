const testInput = Promise.resolve(`1000
2000
3000

4000

5000
6000

8000
7000
9000

10000`)

const realInput = require('./input').getInput(1)

realInput.then(input => {

    const [a,b,c,...rest] = input.split("\n\n").reduce((accum, elf) => {
        const tot = elf.split("\n").reduce((acc, cal) => acc + parseInt(cal), 0)
        return [...accum, tot]
    }, []).sort((a,b) => b-a)

    console.log(a,b,c)
    console.log(a + b + c)

})