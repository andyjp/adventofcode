testInput = Promise.resolve(`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`)

realInput = require('./input').getInput(7)

realInput.then(input => {
    let dir = { '': 0 }
    location = []
    input.split("\n").forEach(line => {
        if (line[0] == '$') {
            switch (line) {
                case '$ cd /':
                    location = []
                    break;
                case '$ ls':
                    // purposefully do nothing
                    break;
                case '$ cd ..':
                    location.pop()
                    break;
                default: // $ cd [dir]
                    const [_, __, third] = line.split(' ')
                    location = [...location, third]
                    break;
            }
        } else {
            const [first, second] = line.split(' ')
            switch (first) {
                case 'dir':
                    dir[[...location, second].join('')] = 0
                    break;
                default: // [filesize] [filename]
                    let activeDir = ''
                    location.forEach(l => {
                        activeDir += l
                        dir[activeDir] += parseInt(first) || 0
                    })
                    dir[''] += parseInt(first) || 0
                    break;
            }
        }
    });
    console.log('Part 1:', Object.values(dir).filter(v => v < 100000).reduce((acc,v) => acc + v,0))
    console.log('Part 2:', Object.values(dir).reduce((acc,v) => v > (30000000-(70000000-dir[''])) && v < acc ? acc = v : acc,70000000))

})