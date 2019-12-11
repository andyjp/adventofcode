const input = '108457-562041'

const twoDigitsSame = (num) => {
    const [first, second, ...rest] = num
    if (first === second) return true
    if (rest.length > 0) return twoDigitsSame([second, ...rest])
    return false
}

const digitsIncrease = (num) => {
    const [first, second, ...rest] = num
    if (second < first) return false
    if (rest.length === 0) return true
    return digitsIncrease([second, ...rest])
}

(function() {
    let number = 108457
    let passCount = 0
    while(number <= 562041) {
        if (twoDigitsSame(number.toString()) && digitsIncrease(number.toString())) passCount += 1
        number += 1
    }
    console.log('Part 1', passCount)
})()

const twoDigitsSame2 = num => {
    const [first, second, third, fourth, ...rest] = num
    // handle first two digits the same by looking at first iteration
    if (rest.length == 2 && first === second && second !== third) return true
    if (first !== second && second === third && third !== fourth) return true
    if (typeof fourth !== 'undefined') return twoDigitsSame2([second, third, fourth, ...rest])
    return false
}

(function() {
    let number = 108457
    let passCount = 0
    while(number <= 562041) {
        if (twoDigitsSame2(number.toString()) && digitsIncrease(number.toString())) passCount += 1
        number += 1
    }
    console.log('Part 2', passCount)
})()

console.log(twoDigitsSame2('123444'), 'should be false')
console.log(twoDigitsSame2('111122'), 'should be true')
console.log(twoDigitsSame2('111222'), 'should be false')
console.log(twoDigitsSame2('331222'), 'should be true')