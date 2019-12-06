const input = require('./input')

/* Part 1 */
const fuelRequired = (mass) => Math.floor(mass/3) - 2
const solution = input.split('\n').map(fuelRequired).reduce((sum, fuel) => sum + fuel, 0)
console.log('Part 1:', solution)

/* Part 2 */
const part2FuelRequired = (mass, totalFuel = 0) => {
    const fuel = fuelRequired(mass)
    if (fuel <= 0) return totalFuel
    return part2FuelRequired(fuel, totalFuel + fuel)
}
const part2solution = input.split('\n').map(mass => part2FuelRequired(mass)).reduce((sum, fuel) => sum + fuel, 0)
console.log('Part 2:', part2solution)

console.log(part2FuelRequired(14), 'should be 2')
console.log(part2FuelRequired(1969), 'should be 966')
console.log(part2FuelRequired(100756), 'should be 50346')