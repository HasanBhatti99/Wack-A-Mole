let currentMoleTile;
let currentPlantTile;
let score = 0;
let gameOver = false;
let timer = 10;

window.onload = function(){
    setGame();
}

function setGame(){
    for (let i=0; i<9; i++){
        let tile = document.createElement("div"); //create 9 divs
        tile.id = i.toString(); //group the divs
        tile.addEventListener("click", selectTile)
        document.getElementById("board").appendChild(tile); //add the divs to the parent div
    }
    setInterval(setMole, 1000); //the mole appears every 2 seconds
    setInterval(setPlant, 2000);
}

function getRandomTile(){
    let num = Math.floor( Math.random() * 9 ) //random number from 0-8
    return num.toString();
}

function setMole(){
    if (gameOver == true){
        return;
    }

    if (currentMoleTile){
        currentMoleTile.innerHTML = ""; //clears the page of any moles
    }
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";
    let num = getRandomTile(); //generates a random tile
    if (currentPlantTile && currentPlantTile.id == num){
        return;
    } else {
        currentMoleTile = document.getElementById(num); //selects a random tile
        currentMoleTile.appendChild(mole);  
    }

}

function setPlant(){
    if (gameOver == true){
        return;
    }

    if (currentPlantTile){
        currentPlantTile.innerHTML = ""; //clears any plants
    }
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";
    let num = getRandomTile();
    if (currentMoleTile && currentMoleTile.id == num){
        return;
    } else{
        currentPlantTile = document.getElementById(num);
        currentPlantTile.appendChild(plant);
    }  
    }


let interval = setInterval(function() {
timer--;
// Display 'counter' wherever you want to display it.
if (timer <= 0) {
    clearInterval(interval);
    $('#timer').html("<p>Time Up!</p>");  
    gameOver = true;
    return;
}else{
    $('#timer').html(Math. floor(timer) + " seconds");
}
}, 1000);

function selectTile(){
    if (gameOver == true|| this.disabled){
        return;
    }

    if (this == currentMoleTile){
        score += 10;
        timer+=0.9;
        document.getElementById("score").innerText = score; //updates the score
    } else if (this == currentPlantTile){
        document.getElementById("score").innerText = "Game Over: " + score;
        gameOver = true;
    }
    this.disabled = true //this prevents the user from clicking the same tile multiple times
    setTimeout(() => {
        this.disabled = false;
    }, 900); //this click block is lifted after 0.9 seconds
}

