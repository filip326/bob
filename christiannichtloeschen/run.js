function execute(code) {
    eval(code);
}

function getCode() {
    return document.querySelector('main .editor #editor_input').value;
}