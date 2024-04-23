class Cat {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 80;
        this.height = 90;
        this.speed = 30;
        this.isJumping = false;

        this.playerELm = document.getElementById("cat");
        this.playerELm.style.width = this.width + "px";
        this.playerELm.style.height = this.height + "px";
        this.playerELm.style.bottom = this.y + "px";
        this.playerELm.style.left = this.x + "px";
    }
    walkLeft(){
        this.x-= this.speed;   
        this.playerELm.style.left = this.x + "px";
    }
    walkRight(){
        this.x+= this.speed;  
        this.playerELm.style.left = this.x + "px";
    }
    jump() {
        if (this.isJumping) {
            if (this.y < 100) {
                this.y += this.speed;
                this.playerELm.style.bottom = this.y + "px";
            } else {
                this.isJumping = false;
            }
        } else {
            if(this.y > 0) {
                this.y -= this.speed;
                this.playerELm.style.bottom = this.y + "px";                
            } else {
                this.isJumping = true;
            }
        }
    }

}

class GoodChicken {
    constructor(){
        this.width = 50;
        this.height = 50;
        this.x = Math.floor(Math.random() * (100 - this.width + 1));
        this.y = 100;
        this.GCelm = null;
        this.imageUrl = 'images/goodChicken.png';

        this.createDomElement();
    }
    createDomElement(){
        this.GCelm = document.createElement("div");

        this.GCelm.className = "goodChicken"
        this.GCelm.style.width = this.width + "px";
        this.GCelm.style.height = this.height + "px";
        this.GCelm.style.left = this.x + "px";
        this.GCelm.style.top = this.y + "px";
        this.GCelm.style.backgroundImage = `url(${this.imageUrl})`;
        this.GCelm.style.backgroundSize = "cover";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.GCelm);
        
    }
    moveDown(){
        this.y--;
        this.GCelm.style.top = this.y + "px";
    }
}


class BadChicken {
    constructor(){
        this.width = 70;
        this.height = 70;
        this.x = Math.floor(Math.random() * (100 - this.width + 1));
        this.y = 100;
        this.BCelm = null;
        this.imageUrl = 'images/badChicken.png';

        this.createDomElement();
    }
    createDomElement(){
        this.BCelm = document.createElement("div");

        this.BCelm.className = "badChicken"
        this.BCelm.style.width = this.width + "px";
        this.BCelm.style.height = this.height + "px";
        this.BCelm.style.left = this.x + "px";
        this.BCelm.style.top = this.y + "px";
        this.BCelm.style.backgroundImage = `url(${this.imageUrl})`;
        this.BCelm.style.backgroundSize = "cover";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.BCelm);
    }
    moveDown(){
        this.y--;
        this.BCelm.style.top = this.y + "px";
    }
}


const cat = new Cat();
const newGoodChicken = new GoodChicken();
const newBadChicken = new BadChicken();

const chickensArr = [];



document.addEventListener("keydown", (e) => {
    if(e.key === "ArrowUp"){
        cat.jump();
    } else if (e.key === "ArrowRight"){
        cat.walkRight();
    } else if(e.key === "ArrowLeft"){
        cat.walkLeft();
    }
});