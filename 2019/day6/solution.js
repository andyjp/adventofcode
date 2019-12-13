const part1 = (input) => {
    const orbits = input.split('\n').reduce((acc, orbit) => {
        const [obj1, obj2] = orbit.split(')')
        return { ...acc, [obj2]: obj1 }
    }, {})

    const countOrbits = (key, count = 0) => {
        if (orbits[key]) {
            count += 1
            return countOrbits(orbits[key], count)
        }
        return count
    }

    return Object.keys(orbits).reduce((count, orbit) => {
        return count + countOrbits(orbit)
    }, 0)
}

// console.log(part1(`COM)B
// B)C
// C)D
// D)E
// E)F
// B)G
// G)H
// D)I
// E)J
// J)K
// K)L`))

// console.log(part1(require('./input')))

const part2 = input => {
    const orbits = input.split('\n').reduce((acc, orbit) => {
        const [obj1, obj2] = orbit.split(')')
        return { ...acc, [obj2]: obj1 }
    }, {})

    const getOrbitChain = (key, chain = []) => {
        if (orbits[key]) {
            return getOrbitChain(orbits[key], [...chain, key])
        }
        return chain
    }

    const youChain = getOrbitChain('YOU')
    const sanChain = getOrbitChain('SAN')

    const intersect = youChain.find(obj => sanChain.includes(obj))

    return youChain.slice(0, youChain.indexOf(intersect)).length + sanChain.slice(0, sanChain.indexOf(intersect)).length - 2
}

console.log(part2(`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`))

console.log(part2(require('./input')))