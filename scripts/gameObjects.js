const cardCache = {};
const baseUrl = "https://api.scryfall.com/cards/named?"

sleeve = new Image();
sleeve.src = '/imgs/back.jpg';
loadedSleeve = false;
sleeve.onload = () => loadedSleeve = true;

class Card {

    constructor(name, x, y, dim) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.w = dim;
        this.h = 1.4 * dim;
        this.faceup = true;
        this.isMoving = false;

        if(name in cardCache) {
            this.setData(cardCache[name])
        }
        else
            fetch(baseUrl + "exact=" + name).then(r => r.json()).then(response => {
                cardCache[name] = response;
                this.setData(response);
            });
    }

    setData(data) {
        this.data = data;
        this.image = new Image();
        this.image.src = this.data.image_uris.large;
        this.loadedImage = false;
        this.image.onload = () => this.loadedImage = true;
    }

    draw(ctx) {
        if(this.faceup) {
            if(this.image && this.loadedImage)
                ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
            if(this.onThis()) {
                let h = canvas.height * 0.9 - handHeight * 1.1
                let w = h / 1.4;
                ctx.drawImage(this.image, canvas.width * 0.99 - w, 0.05 * canvas.height, w, h);
            }
        } else if(loadedSleeve)
            ctx.drawImage(sleeve, this.x, this.y, this.w, this.h);
    }

    onThis() {
        return mouse.x > this.x && mouse.x < this.x + this.w && mouse.y > this.y && mouse.y < this.y + this.h;
    }

}