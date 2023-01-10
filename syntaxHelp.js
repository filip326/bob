/** @type {HTMLTextAreaElement} */
let textarea = document.querySelector('.editor textarea')
/** @type {HTMLDivElement} */
let syntaxHighlighter = document.querySelector('#editor-overlay')


let savingCache = cacher(1000)

textarea.addEventListener('keydown', (key) => {
    if (key.code == 'Space' || key.code == 'Enter') {
        grossschreiben(textarea.value)
        savingCache(() => {
            localStorage.setItem('textarea', textarea.value)

            log(`&orCode gespeichert`)
        })
    }
})

function syntaxHighlighting() {
    let lines = textarea.value.split('\n');
    syntaxHighlighter.innerHTML = "";

    let allCommands = [
        ...(textarea.value.match(/LERNE [A-Z0-9\-]+/g)?.map((v) => v.split(' ')[1]) || []),
        'WIEDERHOLE', 'WENN', 'SOLANGE', 'LERNE', 'ENDE, SONST', 'ENDE', '-MAL',
        'SCHRITT', 'LINKS-WENDUNG', 'PLATZIEREN', 'AUFHEBEN',
        '(IST|NICHT) (MAUER|MARKIERT|NORDEN|WESTEN|OSTEN|SÜDEN|ZUFALL|HAUS)'
    ]

    for (let line of lines) {

        let html = line;

        html.replace(/</, `&lt;`)
        html.replace(/>/, `&gt;`);

        html = html.replace(/ <-- .+/, '<span class="args">$&</span>')

        html = html.replace(new RegExp(allCommands.join('|'), 'g'), '<span class="not-wrong">$&</span>')
        html = html.replace(/\/\/.+$/gm, `<span class="comment">$&</span>`)
        html = html.replace(/WIEDERHOLE|WENN|SOLANGE|LERNE|ENDE, SONST|ENDE|-MAL/gm, `<span class="keyword">$&</span>`)
        html = html.replace(/SCHRITT|LINKS-WENDUNG|PLATZIEREN|AUFHEBEN/gm, `<span class="basicCommand">$&</span>`)
        html = html.replace(/(IST|NICHT) (MAUER|MARKIERT|NORDEN|WESTEN|OSTEN|SÜDEN|ZUFALL|HAUS)/gm, `<span class="logic-operator">$&</span>`)
        html = html.replace(/[0-9]+/gm, `<span class="number">$&</span>`)


        let div = document.createElement('div')

        if (html.trim() == "") { html = `<span class="invisible">__</span>` }
        div.innerHTML = html;


        syntaxHighlighter.appendChild(div)

    }
}

textarea.addEventListener('input', syntaxHighlighting)

function grossschreiben(t) {
    let cursorPos1 = textarea.selectionStart;
    let cursorPos2 = textarea.selectionEnd;
    let string = ""
    textarea.value = null;
    var text = t.split('\n')
    for (line in text) {
        text[line] = text[line].toUpperCase() + '\n';
        string += text[line];
    }
    string = string.trimEnd()
    textarea.value = string;
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
textarea.value = localStorage.getItem('textarea') || ""

syntaxHighlighting()