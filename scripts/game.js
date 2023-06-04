let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    lastButton: '',
    turnInProgress: false,
    choices: ['button1', 'button2', 'button3', 'button4'],
}

function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    for (let circle of document.getElementsByClassName('circle')) {
        if (circle.getAttribute('data-listener') !== 'true') { // We are checking the attribute of each circle and if the attribute is set to false , We add eventList.
            circle.addEventListener('click', (e) => { // If not true , We add click event clistener , Object will be as (e)
                if (game.currentGame.length > 0 && !game.turnInProgress) { // This says if game is not in progress click is disabled
                    let move = e.target.getAttribute('id');
                    game.lastButton = move;
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }
            });
            circle.setAttribute('data-listener', 'true');
        }
    }
    showScore();
    addTurn();
}

function addTurn() {  // Add turn should -1. Clear the playerMoves Array, -2. Randomly add a button ID to the currentGame Array, -3. Call showTurns() function.
    game.playerMoves = []; // clears player moves
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]); // This line generates random number between 0 - 3, once that is done the choice is pushed to current game array. Note to self Math always has to be capital LETTERSA
    showTurns();
}

function showScore() {
    document.getElementById('score').innerText = game.score;
}

function lightsOn(circ) {
    document.getElementById(circ).classList.add('light');
    setTimeout(() => {
        document.getElementById(circ).classList.remove('light');
    }, 400); // Times out after 400 miliseconds
}

function showTurns() { // This function should -1. step through currentGame, Turn on the light, Turn off the light. 
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 800);
}

function playerTurn() { // This function Should : check if the player move matches the computer move , If we are at the end of the sequence then increment the score and add another turn if the moves do not match than display an alert and start a new game.
    let i = game.playerMoves.length - 1; // get the index of the last element from the player moves array
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length == game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert('Wrong move!');
        newGame();
    }
}



module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn }; // This is to export the "game" to game.test.js
