
let keywords = [
    'WENN', 'WIEDERHOLE', 'SOLANGE'
]

let basicCommands = [
    'SCHRITT', 'LINKS-WENDUNG', 'ABLEGEN', 'AUFHEBEN'
]

let customCommands = [

]

interpret(``)

/**
 * 
 * @param {string} code 
 */
function interpret(code) {

    let lines = code.toUpperCase().split('\n')

    for (let i = 0; i < lines.length; i++) {

        line = lines[i].trim()

        if (keywords.some(v => line.includes(v))) {
            if (/^WENN (IST|NICHT) [A-Z]+$/.test(line)) {
                // if-statement
                let bedingung = { type: line.split(' ')[1], name: line.split(' ')[2]}
                let result = getToEnd(lines, i+1)
                i = result.i;

            } else if (/^WIEDERHOLE SOLANGE (IST|NICHT) [A-Z]+$/.test(line)) {
                // while-loop
                let bedingung = { type: line.split(' ')[2], name: line.split(' ')[3]}
                let result = getToEnd(lines, i+1)
                i = result.i;
                while (check(bedingung)) interpret(result.string)
            } else if (/^WIEDERHOLE [0-9]+\-MAL$/.test(line)) {
                // for-loop
                let n = parseInt(line.split(' ')[1].split('-')[0])
                let result = getToEnd(lines, i+1)
                i = result.i;
                for (let j = 0; j < n; j++) {
                    interpret(result.string)
                }
            }
            else {
                console.error(`UNVOLLSTÄNDIGE ODER FALSCHE VERWENDUNG VON KEYWORDS: ${line}`)
            }
            
        } else if (basicCommands.includes(line)) {
            console.log(`basic command: ${line}`)
        } else if (customCommands.includes(line)) {
            console.log(`custom command: ${line}`)
        }

    }
}

function getToEnd(lines, i) {
    let loops = 1;
    let string = "";
    let string2 = ""
    for (i; loops !== 0; i++) {
        let line = lines[i].trim()
        if (line.match(/(^WENN (IST|NICHT) [A-Z]+$)|(^WIEDERHOLE SOLANGE (IST|NICHT) [A-Z]+$)|(^WIEDERHOLE [0-9]+\-MAL$)/)) {
            loops++;
            string += `${line}\n`
        } else if (line == 'ENDE') {
            loops--;
            if (loops !== 0) string += `${line}\n`
        } else if (line == 'ENDE, SONST') {
            loops--;
            if (loops !== 0) string += `${line}\n`
            else {
                let result = getToEnd(lines, i+1)
                string2 = result.string
                i = result.i
            }
        } else {
            string += `${line}\n`
        }
    }
    return { i, string, string2 }
}

function check(bedingung) {
    return true;
}