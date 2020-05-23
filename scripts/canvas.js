const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
	x: innerWidth / 2,
    y: innerHeight / 2,
    isPressed: false
};

const dummyCard = new Card("Island", canvas.width * 0.01, canvas.height - 3.2 * handHeight, handHeight / 0.7);
dummyCard.faceup = false;

let movingCard;
let xOffset;
let yOffset;

addEventListener('mousemove', function(event) {
    mouse.y = event.clientY;
	mouse.x = event.clientX;
    if(mouse.isPressed) {
        if(movingCard != null) {
            movingCard.x = mouse.x + xOffset;
            movingCard.y = mouse.y + yOffset;
        }
    }
});

addEventListener('click', () => {
    if(dummyCard.onThis())
        draw();
});


addEventListener('mousedown', () => {
    mouse.isPressed = true;
    
    for(let card of hand) {
        if(card.onThis()) {
            movingCard = card;
            xOffset = movingCard.x - mouse.x;
            yOffset = movingCard.y - mouse.y;
        }
    }
    if(movingCard) movingCard.isMoving = true;
});

addEventListener('mouseup', () => {
    mouse.isPressed = false;
    if(movingCard) {
        if(mouse.y < canvas.height - handHeight * 1.1) {
            hand.remove(movingCard);
            backfield.push(movingCard);
        }
        movingCard.isMoving = false;
        movingCard = null;
    }
});

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgb(192, 192, 192)';
    ctx.fillRect(0, canvas.height - handHeight * 1.1, canvas.width, handHeight * 1.1);

    for(let i in hand) {
        let card = hand[i];
        if(!card.isMoving) {
            card.x = canvas.width * 0.01 + ((card.w * hand.length > canvas.width)? canvas.width * 0.98 * i / hand.length: i * card.w * 1.05);
            card.y = canvas.height - handHeight * 1.05, handHeight / 1.4;
        }
        card.draw(ctx);
    }

    for(let i in battlefield) {
        let card = hand[i];
        if(card.isMoving)
            card.x = canvas.width * 0.01 + ((card.w * hand.length > canvas.width)? canvas.width * 0.98 * i / hand.length: i * card.w * 1.05);
        card.draw(ctx);
    }

    dummyCard.draw(ctx);

}

animate();