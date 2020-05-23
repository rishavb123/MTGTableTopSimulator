$('#deck-input-modal').modal({backdrop: 'static', keyboard: false});

const handHeight = 100;

let hand = [];
let deck = [];
let battlefield = [];

function addToHand(name) {
    hand.push(new Card(name, 0, canvas.height - handHeight * 1.05, handHeight / 1.4));
}

function countCardsInString(str) {
    let count = 0;
    let arr = str.split("\n");
    for(let a of arr) {
        let num = parseInt(a.split(" ")[0]);
        if(!isNaN(num)) {
            count += num;
        } else {
            count += a.length > 0;
        }
    }
    return count
}

$('#set-deck-btn').click(() => {
    let arr = $('#deck-input').val().split("\n");
    for(let a of arr) {
        if(a.length > 0) {
            let b = a.split(" ")[0];
            let c = parseInt(b);
            if(isNaN(c))
                deck.push(a);
            else
                for(let i = 0; i < c; i++)
                    deck.push(a.substring(b.length + 1));
        }
    }
    shuffle(deck);
});

// The Gitrog Monster
// 1 Reclaim
// 2 Aminatou's Augury

function updatedTextArea() {
    $('#card-counter')[0].innerText = countCardsInString($('#deck-input').val()) + " cards in the deck";
}

function draw() {
    addToHand(deck.pop());
}