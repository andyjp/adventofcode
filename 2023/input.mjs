import * as https from 'https'
import { session } from './cookie.mjs'

export const getInput = (day) => {
    return new Promise((resolve) => {
        let data = ''
        const options = {
            headers: {
                cookie: `session=${session}`
            }
        }
        https.get(`https://adventofcode.com/2023/day/${day}/input`, options, res => {
            res.on('data', chunk => { data += chunk })
            res.on('end', () => { resolve(data.trim()); })
        })
    })
}