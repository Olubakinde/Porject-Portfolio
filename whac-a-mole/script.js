
window.onload = function() {
    setGame();
    document.getElementById("reset").addEventListener("click", restart)
}

let currentMole;
let currentPlant;
let score = 0;
let gameover = false;

function setGame(){
    // set up grid for game board in html
    for (let i = 0; i < 9; i++){
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectile);
        document.getElementById("board").appendChild(tile);
    }

    setInterval(setMole, 1000); //2000 millisecond = 2 seconds;
    setInterval(setPlant, 2000); //3000 milliseccond = 3 seconds;
}

function getrandomTile() {
    //math.random --> (0-1) * 9 = (0, 9) --> round down to (0 -8) Integers

    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole(){
    if (gameover){
        return;
    }

    if (currentMole){
        currentMole.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getrandomTile();
    if (currentPlant && currentPlant.id === num){
        return
    }
    currentMole = document.getElementById(num);
    currentMole.appendChild(mole);
}

function setPlant() {
    if (gameover){
        return;
    }
    if (currentPlant){
        currentPlant.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getrandomTile();
    if (currentMole && currentMole.id == num){
        return
    }
    currentPlant = document.getElementById(num);
    currentPlant.appendChild(plant);
}

function selectile() {
    if (gameover){
        return;
    }

    if (this == currentMole){
        score += 10;
        document.getElementById("score").innerText = score.toString();
    }
    else if (this == currentPlant){
        document.getElementById("core").innerHTML = ""
        document.getElementById("score").innerHTML = "GAME OVER: " + score.toString();
        document.getElementById("reset").innerHTML = "Reset"
        gameover = true;
    }
}

function restart() {
    score = 0;
    gameover = false;
    currentMole = null;
    currentPlant = null;

    // Clear score display
    document.getElementById("score").innerText = score.toString();

    // Reset game over and reset button text
    document.getElementById("score").innerHTML = "Score: " + score.toString();
    document.getElementById("reset").innerHTML = "Reset";

    // Remove any existing moles or plants from tiles
    let tiles = document.querySelectorAll("#board > div");
    tiles.forEach(tile => {
        tile.innerHTML = "";
    });

    // Restart intervals for setting moles and plants
    clearInterval(intervalMole);
    clearInterval(intervalPlant);
    intervalMole = setInterval(setMole, 1000);
    intervalPlant = setInterval(setPlant, 2000);
}