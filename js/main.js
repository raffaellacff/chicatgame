class Player {
    constructor() {
        this.width = 100;
        this.height = 100;
        this.positionX = 512 - this.width / 2;
        this.positionY = 0;
        this.score = 0;

        this.playerElm = document.getElementById("player");
        this.playerElm.style.left = this.positionX + "px";
        this.playerElm.style.bottom = this.positionY + "px";
        this.playerElm.style.width = this.width + "px";
        this.playerElm.style.height = this.height + "px";
    }
    moveLeft() {
        if (this.positionX > 0) {
            this.positionX -= 10.24;
            this.playerElm.style.left = this.positionX + "px";
        }
    }
    moveRight() {
        if (this.positionX < 1224 - this.width) {
            this.positionX += 10.24;
            this.playerElm.style.left = this.positionX + "px";
        }
    }
    increaseScore(){
        this.score++;
        document.getElementById("score").innerText = "score:" + this.score;
    }

    gameOver(){
        document.location.href = "gameover.html";
    }
}


const player = new Player();


// CODE FOR THE GOOD CHICKEN


class Obstacle {
    constructor(){
        this.width = 70;
        this.height = 70;
        this.positionX = Math.floor(Math.random() * (1600 - this.width + 1));
        this.positionY = 700;
        this.obstacleElm = null;

        this.createDomElement();
    }
    createDomElement(){
        this.obstacleElm = document.createElement("div");

        this.obstacleElm.className = "goodChicken";
        this.obstacleElm.style.left = this.positionX + "px";
        this.obstacleElm.style.bottom = this.positionY + "px";
        this.obstacleElm.style.width = this.width + "px";
        this.obstacleElm.style.height = this.height + "px";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.obstacleElm);
    }
    moveDown(){
        this.positionY--;
        this.obstacleElm.style.bottom = this.positionY + "px";
    }

    removeChicken(){
        this.obstacleElm.remove();
    }
}

const obstaclesArr = [];

setInterval(() => {
    const newObstacle = new Obstacle();
    obstaclesArr.push(newObstacle);
}, 1500);

setInterval(() => {
    obstaclesArr.forEach( (obstacleInstance) => {
        obstacleInstance.moveDown();

        if(
            player.positionX < obstacleInstance.positionX + obstacleInstance.width &&          
            player.positionX + player.width > obstacleInstance.positionX &&       
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&        
            player.positionY + player.height > obstacleInstance.positionY
        ){
            player.increaseScore();
            obstacleInstance.removeChicken();
        }
       

    });
}, 0.7);


// CODE FOR THE BAD CHICKEN

class BadChicken {
    constructor(){
        this.width = 80;
        this.height = 80;
        this.positionX = Math.floor(Math.random() * (1600 - this.width + 1));
        this.positionY = 700;
        this.obstacleElm = null;

        this.createDomElement();
    }
    createDomElement(){
        this.badChickenElm = document.createElement("div");

        this.badChickenElm.className = "badChicken";
        this.badChickenElm.style.left = this.positionX + "px";
        this.badChickenElm.style.bottom = this.positionY + "px";
        this.badChickenElm.style.width = this.width + "px";
        this.badChickenElm.style.height = this.height + "px";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.badChickenElm);
    }
    moveDown(){
        this.positionY--;
        this.badChickenElm.style.bottom = this.positionY + "px";
    }
}

const badChickenArr = [];

setInterval(() => {
    const newBadChicken = new BadChicken();
    badChickenArr.push(newBadChicken);
}, 800);

setInterval(() => {
    badChickenArr.forEach( (badChickenInstance) => {
        badChickenInstance.moveDown();

        if(
            player.positionX < badChickenInstance.positionX + badChickenInstance.width &&          
            player.positionX + player.width > badChickenInstance.positionX &&       
            player.positionY < badChickenInstance.positionY + badChickenInstance.height &&        
            player.positionY + player.height > badChickenInstance.positionY
        ){
            player.gameOver();
        }
    });
}, 0.5);



document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        player.moveLeft();
    } else if (e.code === "ArrowRight") {
        player.moveRight();
    }
});