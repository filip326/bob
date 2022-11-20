let continueExecuting = false;

let keywords = [
    'WENN', 'WIEDERHOLE', 'LERNE'
]

let basicCommands = {
    'SCHRITT': step,
    'LINKS-WENDUNG': turnLeft,
    'PLATZIEREN': addSign,
    'AUFHEBEN': removeSign,
}

let customCommands = {

}
/**
 * 
 * @param {any[]} lines 
 */
async function interpret(lines) {
    for (let l = 0; l < lines.length; l++) {

        if (!continueExecuting) break;

        if (keywords.some(v => lines[l].includes(v))) {
            // some loop
            if (/^WENN (IST|NICHT) [A-Z]+$/.test(lines[l]) && lines[l+2] == 'ENDE, SONST') {
                // if-statement with else
                // l = bedingung
                // l+1 = wenn wahr-teil
                // l+2 = sonst
                // l+3 = wenn falsch-teil


                let bedingungErfüllt = check(lines[l].split(' ')[2])

                if ((bedingungErfüllt && lines[l].split(' ')[1] == 'IST') || (!bedingungErfüllt && lines[l].split(' ')[1] == 'NICHT')) {
                    // bedingung erfüllt
                    await interpret(lines[l+1])
                } else {
                    // bedingung nicht erfüllt
                    await interpret(lines[l+3])
                }
                l = l+3;

            } else if (/^WENN (IST|NICHT) [A-Z]+$/.test(lines[l]) && lines[l+2] == 'ENDE') {
                // if-statement without else
                // l = bedingung
                // l+1 = wenn wahr-teil
                let bedingungErfüllt = check(lines[l].split(' ')[2])

                if ((bedingungErfüllt && lines[l].split(' ')[1] == 'IST') || (!bedingungErfüllt && lines[l].split(' ')[1] == 'NICHT')) {
                    // bedingung erfüllt
                    await interpret(lines[l+1])
                }
                l = l+1;

            } if (/^WIEDERHOLE SOLANGE (IST|NICHT) [A-Z]+$/.test(lines[l])) {
                // while-loop
                let bedingungErfüllt = check(lines[l].split(' ')[3])
                log(`&aq wiederhole-solange schleife. Bedingung ${lines[l].split(' ')[3]}: ${bedingungErfüllt}`)
                log(`&aqwiederhole-solange schleife ${(bedingungErfüllt && lines[l].split(' ')[2] == 'IST') || (!bedingungErfüllt && lines[l].split(' ')[2] == 'NICHT')}`)
                while ((check(lines[l].split(' ')[3]) && lines[l].split(' ')[2] == 'IST') || (!check(lines[l].split(' ')[3]) && lines[l].split(' ')[2] == 'NICHT')) {
                    await interpret(lines[l+1])
                }
                l = l + 1
            } else if (/^WIEDERHOLE [0-9]+\-MAL$/.test(lines[l])) {
                // for-loop
                let n = parseInt(lines[l].split(' ')[1].split('-')[0])
                for (let j = 0; j < n; j++) {
                    await interpret(lines[l+1])
                }
                l = l + 1
            } else if (/^LERNE [A-Z0-9\-]+$/.test(lines[l])) {
                customCommands[lines[l].split(' ')[1]] = lines[l+1]
                l = l + 1;
            }
        } else if (Object.keys(basicCommands).includes(lines[l])) {
            // basic command
            basicCommands[lines[l]]()
            await sleep(500)

        } else if (Object.keys(customCommands).includes(lines[l])) {
            // custom command

        }

    } 

}

/**
 * 
 * @param {string} text 
 */
function preInterpret(text) {

    let code = text.split('\n')

    for (let l in code) {
        code[l] = code[l].toUpperCase().split(';')[0].trim()
    }

    code = code.filter(c => c !== "")

    let codeTree = tree(code)

    return codeTree

}

/**
 * 
 * @param {string[]} lines 
 */
function tree(lines) {
    let array = []

    function setLast(o) {
        if (array.length == 0) {
            array.push(o)
            return;
        }

        let counter = 0;
        let pushTo = array;

        while (pushTo.length !== 0 && pushTo[pushTo.length - 1].push) {
            counter++;
            pushTo = pushTo[pushTo.length - 1]
        }

        if (pushTo.length !== 0 && pushTo[pushTo.length - 1] == '[ESC]') {

            let newPushTo = array;

            for (let i = 0; i < counter - 1; i++) {
                newPushTo = newPushTo[newPushTo.length - 1]
            }

            newPushTo.push(o)
            return;

        }

        pushTo.push(o)

    }

    for (let line of lines) {

        if (keywords.some(v => line.includes(v))) {
            setLast(line)
            setLast([])
        } else if (line.includes('ENDE')) {
            setLast('[ESC]')
            setLast(line)
            if (line.includes('SONST')) {
                setLast([])
            }
        } else {
            setLast(line)
        }
    }
    return array;
}

async function sleep(ms) {
    return new Promise(async acc => setTimeout(() => acc(), ms))
}