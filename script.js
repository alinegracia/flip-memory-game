let erors = 0;
let cardsList = [
    'apple', 'avocado', 'banana', 'burger', 'cake', 'chips', 'icecream', 'pinaple', 'pizza', 'pomegranat', 'shake', 'watermelon'
];

let cardSet;
let board = [];
let rows = 4;
let columns = 6;

let card1Selected;
let card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    cardSet = [...cardsList, ...cardsList];
    console.log(cardSet);
    //shuffle
    for(let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
    for(let r = 0; r < rows; r++) {
        let row =[];
        for(let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);

            //create img element
            let card = document.createElement('img');
            card.id = r.toString() +'-' + c.toString();
            card.src = cardImg + '.jpg';
            card.classList.add('card');
            card.addEventListener('click', selectCard);
            document.getElementById('game-container').append(card);
        }
        board.push(row);
    }
    setTimeout(hideCards, 1500);
}

function hideCards() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + '-' + c.toString());
            card.src = 'back.jpg';
        }
    }
}

function selectCard() {
    if(this.src.includes('back')) {
        if(!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split('-');
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card1Selected.src = board[r][c] + '.jpg';
        }
        else if(!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split('-');
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card2Selected.src = board[r][c] + '.jpg';
            setTimeout(update, 1000);
        }
    }
}

function update() {
    if(card1Selected.src != card2Selected.src) {
        card1Selected.src = 'back.jpg';
        card2Selected.src = 'back.jpg';
        erors += 1;
        document.getElementById('score').textContent = erors;
    }
    card1Selected = null;
    card2Selected = null;
}