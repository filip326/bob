/** @type {HTMLTextAreaElement} */
let textarea = document.querySelector('.editor textarea')
/** @type {HTMLDivElement} */
let syntaxHighlighter = document.querySelector('#editor-overlay')

textarea.value = localStorage.getItem('textarea') || ""

let savingCache = cacher(1000)

textarea.addEventListener('keydown', (key) => {
    if (key.key == 'Enter') {
        grossschreiben(textarea.value)
        savingCache(() => {
            localStorage.setItem('textarea', textarea.value)

            log(`&orCode gespeichert`)
        })
    }
})

textarea.addEventListener('input', (e) => {
    let lines = textarea.value.split('\n');

    syntaxHighlighter.innerHTML = "";

    for (let line of lines) {

        let html = line;

        html.replace(/</, `&lt;`)
        html.replace(/>/, `&gt;`)

        html.replace(/\/\/.+$/gm, '<span class="comment">$&</span>')
        html.replace(/WIEDERHOLE|WENN|SOLANGE|LERNE|ENDE|-MAL/gm, '<span class="keyword">$&</span>')
        html.replace(/SCHRITT|LINKS-WENDUNG|PLATZIEREN|AUFHEBEN/gm, '<span class="basicCommands">$&</span>')
        html.replace(/IST|NICHT/gm, '<span class="logic-operator">$&</span>')
        html.replace(/[0-9]+/gm, '<span class="number">$&</span>')

        let div = document.createElement('div')

        div.innerHTML = html;

        syntaxHighlighter.appendChild(div)

    }

    /*

    string.replace(/</, `&lt;`)
    string.replace(/>/, `&gt;`)

    string.replace(/\/\/.+$/gm, `<span class="comment">$&</span>`)
    string.replace(/WIEDERHOLE|WENN|SOLANGE|LERNE|ENDE|-MAL/gm, `<span class="keyword">$&</span>`)
    string.replace(/SCHRITT|LINKS-WENDUNG|PLATZIEREN|AUFHEBEN/gm, `<span class="basicCommands">$&</span>`)
    string.replace(/IST|NICHT/gm, `<span class="logic-operator">$&</span>`)
    string.replace(/[0-9]+/gm, `<span class="number">$&</span>`)
    string.replace(/\n/gm, `<br />`)

    console.log(/SCHRITT|LINKS-WENDUNG|PLATZIEREN|AUFHEBEN/gm.test(string))

    syntaxHighlighter.innerHTML = string;
    */
})

function grossschreiben(t) {
    let cursorPos1 = textarea.selectionStart;
    let cursorPos2 = textarea.selectionEnd;
    textarea.value = null;
    var text = t.split('\n')
    for (line in text) {
        text[line] = text[line].toUpperCase() + '\n';
        textarea.value += text[line];
    }
    textarea.setSelectionRange(cursorPos1, cursorPos2)
}

function cacher(ms) {

    let lastTimeout = undefined;

    function make(cb) {
        clearTimeout(lastTimeout)
        lastTimeout = setTimeout(() => {
            cb()
        }, ms)
    }

    return make;
} 