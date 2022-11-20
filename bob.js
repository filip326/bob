let playground = document.querySelector('.playground')

for (let i = 0; i < 100; i++) {
    let field = document.createElement('div')
    field.classList.add('field')
    field.setAttribute('field-x', Math.floor(i / 10))
    field.setAttribute('field-y', i % 10)
    playground.appendChild(field)

}

document.querySelector('.field[field-x="0"][field-y="0"]').classList.add('home-field')

let bot_img = document.createElement('img')
bot_img.src = 'img/VorneV2.png'

playground.appendChild(bot_img)

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
            case 'add-sign':
                addSign(f.getAttribute('field-x'), f.getAttribute('field-y'))
                break;
            case 'remove-sign':
                removeSign(f.getAttribute('field-x'), f.getAttribute('field-y'))
                break;
        }
    })
}

let bob = {
    x: 0,
    y: 0,
    direction: 'S',
}

function turnLeft() {

    if (bob.direction == 'S') {
        bob.direction = 'E'
        bot_img.src = 'img/RechtsV2.png'
    } else if (bob.direction == 'E') {
        bob.direction = 'N'
        bot_img.src = 'img/HintenV2.png'
    } else if (bob.direction == 'N') {
        bob.direction = 'W'
        bot_img.src = 'img/LinksV2.png'
    } else if (bob.direction == 'W') {
        bob.direction = 'S'
        bot_img.src = 'img/VorneV2.png'
    }

}

function step() {
    if (bob.x == 0 && bob.direction == 'N') {
        return log('&reBob kann keinen Schritt machen, vor ihm ist eine Wand.')
    }
    if (bob.x == 9 && bob.direction == 'S') {
        return log('&reBob kann keinen Schritt machen, vor ihm ist eine Wand.')
    }
    if (bob.y == 0 && bob.direction == 'W') {
        return log('&reBob kann keinen Schritt machen, vor ihm ist eine Wand.')
    }
    if (bob.y == 9 && bob.direction == 'E') {
        return log('&reBob kann keinen Schritt machen, vor ihm ist eine Wand.')
    }

    if (bob.direction == 'N') {
        bob.x--;
    }
    if (bob.direction == 'S') {
        bob.x++;
    }
    if (bob.direction == 'W') {
        bob.y--;
    }
    if (bob.direction == 'E') {
        bob.y++;
    }
    
    if (document.querySelector(`[field-x="${bob.x}"][field-y="${bob.y}"]`)?.classList.contains('wall-field')) {
        if (bob.direction == 'N') {
            bob.x++;
        }
        if (bob.direction == 'S') {
            bob.x--;
        }
        if (bob.direction == 'W') {
            bob.y++;
        }
        if (bob.direction == 'O') {
            bob.y--;
        }
        log('&reBob kann keinen Schritt machen, vor ihn ist eine Wand.')
        return;
    }

    bot_img.style.marginLeft = bob.y * 50 + 'px';
    bot_img.style.marginTop = bob.x * 50 + 'px';

}
function addSign(x=bob.x, y=bob.y) {
    let field = document.querySelector(`[field-x="${x}"][field-y="${y}"]`)
    if (field.childElementCount == 8) return log('&reEs kann maximal 8 Markierungen geben');
    let mark = document.createElement('div')
    mark.classList.add('field-mark')
    field.appendChild(mark)
}
function removeSign(x=bob.x, y=bob.y) {
    let field = document.querySelector(`[field-x="${x}"][field-y="${y}"]`)
    if (field.childElementCount == 0) return log('&reEs kann nicht weniger als 0 Markierugen geben.')
    field.lastChild.remove()
}

function check(condition) {
    switch (condition) {
        case 'MAUER':
            if (bob.x == 0 && bob.direction == 'N') {
                return true
            }
            if (bob.x == 9 && bob.direction == 'S') {
                return true
            }
            if (bob.y == 0 && bob.direction == 'W') {
                return true
            }
            if (bob.y == 9 && bob.direction == 'E') {
                return true
            }
            
            let {x, y} = bob

            if (bob.direction == 'N') {
                x = x - 1;
            }
            if (bob.direction == 'S') {
                x = x + 1;
            }
            if (bob.direction == 'W') {
                y = y - 1;
            }
            if (bob.direction == 'E') {
                y = y + 1;
            }

            if (document.querySelector(`[field-x="${x}"][field-y="${y}"]`)?.classList.contains('wall-field')) {
                return true;
            }

            return false;
        case 'HAUS':
            return document.querySelector(`[field-x="${bob.x}"][field-y="${bob.y}"]`)?.classList.contains('home-field');
        case 'NORDEN':
            return bob.direction == 'N'
        case 'OSTEN':
            return bob.direction == 'E'
        case 'WESTEN':
            return bob.direction == 'W'
        case 'SÜDEN':
            return bob.direction == 'S'
        
        case 'MARKIERT':
            return !!document.querySelector(`[field-x="${bob.x}"][field-y="${bob.y}"] > *`);

    }
}