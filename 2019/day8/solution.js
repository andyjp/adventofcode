(() => {
    const myInput = require('./input')
    const layerCount = 25 * 6
    const layers = []
    let start = 0
    while(myInput.slice(start, start + layerCount)) {
        layers.push(myInput.slice(start, start + layerCount))
        start += layerCount
    }
    const {layer} = layers.reduce((acc, layer) => {
        const count0s = layer.split('').filter(num => num === '0').length
        if (!acc.layer.length) return { zeros: count0s, layer }

        return count0s < acc.zeros ? { zeros: count0s, layer } : acc
    }, { zeros: 9999, layer: ''})

    const count1s = layer.split('').filter(num => num === '1').length
    const count2s = layer.split('').filter(num => num === '2').length
    console.log('Part 1:', count1s * count2s)
})()


const myInput = require('./input')
const layerCount = 25 * 6
const layers = []
let start = 0
while(myInput.slice(start, start + layerCount)) {
    const pixels = myInput.slice(start, start + layerCount)
    let row = 0
    const layer = []
    while (pixels.slice(row, row + 25)) {
        layer.push(pixels.slice(row, row + 25))
        row += 25
    }
    layers.push(layer)
    start += layerCount
}

const message = [[], [], [], [], [], []]
for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 6; j++) {
        for (let k = 0; k < 100; k++) {
            const pixel = layers[k][j][i]
            if (pixel === '0' || pixel === '1') {
                message[j][i] = pixel === '0' ? ' ' : '|'
                break
            }
        }

    }
}

console.log('Part 2:', message.map(ml => ml.join('')))
