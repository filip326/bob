/** @type {HTMLTextAreaElement} */
let textarea = document.querySelector('.editor > textarea')

textarea.value = localStorage.getItem('textarea') || ""

let savingCache = cacher(1000)

textarea.addEventListener('keydown', (key) => {
    if (key.key == 'Enter') {
        grossschreiben(textarea.value)
        savingCache(() => {
            localStorage.setItem('textarea', textarea.value)

            log(`&orCode gespeichert`)
        })
    } else {
        console.log(key.key)
    }
})

function grossschreiben(t) {
    textarea.value = null;
    var text = t.split('\n')
    for (line in text) {
        text[line] = text[line].toUpperCase() + '\n';
        textarea.value += text[line];
    }
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