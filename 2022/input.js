const https = require('https')
const cookie = require('./cookie')

const getInput = (day) => {
    return new Promise((resolve) => {
        let data = ''
        const options = {
            headers: {
                cookie: `session=${cookie.session}`
            }
        }
        https.get(`https://adventofcode.com/2022/day/${day}/input`, options, res => {
            res.on('data', chunk => { data += chunk })
            res.on('end', () => { resolve(data); })
        })
    })
}

module.exports = { getInput }