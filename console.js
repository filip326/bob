// init the console

/** @type {HTMLDivElement} */
let c = document.querySelector('.console')

/**
 * 
 * @param {string} text 
 */
function log(text) {

    text = `&bg${text}`

    let div = document.createElement('div')

    let textParts = text.split('&')

    for (let part of textParts) {

        let addTo = document.createElement('span')

        let str = part.substring(2)

        switch (`${part.substring(0, 2)}`) {
            case 're':
                addTo.style.color = 'red';
                break;
            case 'bl':
                addTo.style.color = 'blue';
                break;
            case 'gr':
                addTo.style.color = 'green';
                break;
            case 'ye':
                addTo.style.color = 'yellow';
                break;
            case 'ba':
                addTo.style.color = 'black';
                break;
            case 'or':
                addTo.style.color = 'orange';
                break;
            case 'aq':
                addTo.style.color = 'aqua';
                break;
            case 'li':
                addTo.style.color = 'lime';
                break;
            case 'dg':
                addTo.style.color = 'darkgreen';
                break;
            case 'db':
                addTo.style.color = 'darkblue';
                break;
            case '--':
                str = `&${part}`
        }

        addTo.innerText = str;
        div.appendChild(addTo)
    }

    c.appendChild(div)
}

let input = c.querySelector('input')

input.addEventListener('change', async (e) => {
    continueExecuting = true;
    interpret([input.value.toUpperCase()])
    continueExecuting = false;
    input.value = ""
})

/** @type {HTMLButtonElement} */
let runButton = document.querySelector('button.run-button')

runButton.addEventListener('click', async () => {

    if (!continueExecuting) {
        runButton.classList.add('spin')
        log(`&aqFühre code aus.`)
        continueExecuting = true;
        await interpret(preInterpret(textarea.value))
        continueExecuting = false;
        runButton.classList.remove('spin')
        log(`&aqFertig`)
    }
})