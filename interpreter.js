
let keywords = [
    'WENN', 'WIEDERHOLE'
]

let basicCommands = [
    'SCHRITT', 'LINKS-WENDUNG', 'ABLEGEN', 'AUFHEBEN', 'ENDE'
]

let customCommands = [

]

interpret(`
schritt
wenn
links-wendung
nichts
`)

/**
 * 
 * @param {string} code 
 */
function interpret(code, name=0) {

    let lines = code.toUpperCase().split('\n')

    for (let line of lines) {

        line = line.trim()

        if (keywords.some(v => line.includes(v))) {
            console.log(`keyword command: ${line}`)
        } else if (basicCommands.includes(line)) {
            console.log(`basic command: ${line}`)
        } else if (customCommands.includes(line)) {
            console.log(`custom command: ${line}`)
        }

    }

}