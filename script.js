let playground = document.querySelector('.playground')

for (let i = 0; i < 100; i++) {
    let field = document.createElement('div')
    field.classList.add('field')
    field.setAttribute('field-x', Math.floor(i / 10))
    field.setAttribute('field-y', i % 10)
    playground.appendChild(field)
}