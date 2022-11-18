let playground = document.querySelector('.playground')

for (let i = 0; i < 100; i++) {
    let field = document.createElement('div')
    field.classList.add('field')
    field.setAttribute('field-x', Math.floor(i / 10))
    field.setAttribute('field-y', i % 10)
    playground.appendChild(field)

}

document.querySelector('.field[field-x="0"][field-y="0"]').classList.add('home-field')

let selectedMethod = '';

document.querySelector('.home').addEventListener('click', (e) => {
    selectedMethod = 'home'
    document.querySelector('.home').classList.add('selected')
    document.querySelector('.add-sign').classList.remove('selected')
    document.querySelector('.remove-sign').classList.remove('selected')
    document.querySelector('.wall').classList.remove('selected')
})
document.querySelector('.add-sign').addEventListener('click', (e) => {
    selectedMethod = 'add-sign'
    document.querySelector('.add-sign').classList.add('selected')
    document.querySelector('.home').classList.remove('selected')
    document.querySelector('.remove-sign').classList.remove('selected')
    document.querySelector('.wall').classList.remove('selected')
})
document.querySelector('.remove-sign').addEventListener('click', (e) => {
    selectedMethod = 'remove-sign'
    document.querySelector('.remove-sign').classList.add('selected')
    document.querySelector('.home').classList.remove('selected')
    document.querySelector('.add-sign').classList.remove('selected')
    document.querySelector('.wall').classList.remove('selected')
})
document.querySelector('.wall').addEventListener('click', (e) => {
    selectedMethod = 'wall'
    document.querySelector('.wall').classList.add('selected')
    document.querySelector('.home').classList.remove('selected')
    document.querySelector('.add-sign').classList.remove('selected')
    document.querySelector('.remove-sign').classList.remove('selected')
})


for (let f of document.querySelectorAll('div.field')) {
    f.addEventListener('mouseover', (e) => {
        document.querySelector('.selected-x').innerText = f.getAttribute('field-x')
        document.querySelector('.selected-y').innerText = f.getAttribute('field-y')
    })
    f.addEventListener('click', (e) => {
        switch(selectedMethod) {
            case 'home':
                document.querySelector('.home-field').classList.remove('home-field')
                f.classList.add('home-field')
                f.classList.remove('wall-field')
                break;
            case 'wall':
                if (!f.classList.contains('home-field')) f.classList.toggle('wall-field')
                break;
        }
    })
}