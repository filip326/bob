/** @type {HTMLTextAreaElement} */
let textarea = document.querySelector('.editor > textarea')

textarea.value = localStorage.getItem('textarea') || ""

let savingCache = cacher(1000)

textarea.addEventListener('input', () => {

    savingCache(() => {
        localStorage.setItem('textarea', textarea.value)

        log(`&orCode gespeichert`)
    })

})

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