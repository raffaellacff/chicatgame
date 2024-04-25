let scorePoints = document.getElementById("score");



class Player {
    constructor() {
        this.width = 100;
        this.height = 100;
        this.positionX = 512 - this.width / 2;
        this.positionY = 0;
        this.jumpHeight = 200;
        this.jumpSpeed = 5;
        this.isJumping = false;

        this.playerElm = document.getElementById("player");
        this.playerElm.style.left = this.positionX + "px";
        this.playerElm.style.bottom = this.positionY + "px";
        this.playerElm.style.width = this.width + "px";
        this.playerElm.style.height = this.height + "px";
    }
    moveLeft() {
        if (this.positionX > 0) {
            this.positionX -= 25;
            this.playerElm.style.left = this.positionX + "px";
        }
    }
    moveRight() {
        if (this.positionX < 1224 - this.width) {
            this.positionX += 25;
            this.playerElm.style.left = this.positionX + "px";
        }
    }
    jump(){
        if(!this.isJumping){
            this.isJumping = true;
            let jumpInterval = setInterval(() => {
                if(this.positionY < this.jumpHeight){
                    this.positionY += this.jumpSpeed;
                    this.playerElm.style.bottom = this.positionY + "px";
                } else {
                    clearInterval(jumpInterval);
                    this.fall();
                }
            }, 10);
        }
    }

    fall(){
        let fallInterval = setInterval(() => {
            if(this.positionY > 0){
                this.positionY -= this.jumpSpeed;
                this.playerElm.style.bottom = this.positionY + "px";
            } else {
                clearInterval(fallInterval);
                this.isJumping = false;
            }
        }, 10);
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


const obstaclesArr = []; // where the new good chickens will be stored

setInterval(() => {
    const newObstacle = new Obstacle();
    obstaclesArr.push(newObstacle);
}, 1500);

let score = 0;

setInterval(() => {       // collision
    obstaclesArr.forEach( (obstacleInstance) => {
        obstacleInstance.moveDown();

        if(
            player.positionX < obstacleInstance.positionX + obstacleInstance.width &&          
            player.positionX + player.width > obstacleInstance.positionX &&       
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&        
            player.positionY + player.height > obstacleInstance.positionY
        ){
           
                obstacleInstance.removeChicken();
                score++;
                scorePoints.innerText = `SCORE: ${score++}`;

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

const badChickenArr = []; // where the new bad chickens will be stored

setInterval(() => {       // collision
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

// HOW TO MOVE THE CAT

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        player.moveLeft();
    } else if (e.code === "ArrowRight") {
        player.moveRight();
    } else if (e.code === "Space") {
        player.jump();
        document.getElementById("jump").play();
    }
});