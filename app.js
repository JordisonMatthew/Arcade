

// Generates the board
const table = document.getElementById('gameBoard');
for (let i = 0; i < 19; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 19; j++) {
        const td = document.createElement('td');
        if (i % 2 !== 0) {
            if (j % 2 === 0) {
                td.classList.add('td-offset')
            }
            else {
                td.classList.add('td-set')
            }
        }
        else {
            if (j % 2 !== 0) {
                td.classList.add('td-offset')
            }
            else {
                td.classList.add('td-set')
            }
        }
        row.appendChild(td);
    }
    table.appendChild(row);
}

// This variable is an array that holds all of our tables data
const tableElements = table.getElementsByTagName('td');
// tabeRows holds all of our row elements
const tableRows = table.getElementsByTagName('tr');

// snake object that holds the body of the snake its next
// direction and where the current head is located on the
// board
let snake = {
    body: [],
    nextDirection: -1,
    snakeHeadLocation: null
}

// This object holds the values that appear on the html and
// the logic variables that can end the game
let gameState = {
    apple: null,
    snake: snake,
    board: tableElements,
    speed: 150,
    inPlay: false,
    tick: null,
    score: 0,
    rightWall: generateRightWall(),
    leftWall: generateLeftWall(),
    topWall: generateTopWall(),
    bottomWall: generateBottomWall()
}
// Snake Functions ------------------------------------

// sets the starting position of the snake and renders it
function startingPosition() {
    const startingIndex = Math.floor(tableElements.length / 2);
    snake.body.push(startingIndex);
    tableElements[startingIndex].classList.toggle('snake');

    snake.body.push(startingIndex + 1);
    tableElements[startingIndex + 1].classList.toggle('snake');

    snake.body.push(startingIndex + 2);
    tableElements[startingIndex + 2].classList.toggle('snake');

    snake.body.push(startingIndex + 3);
    tableElements[startingIndex + 3].classList.toggle('snake');
}
// basic movement for the snake
// removes tail and adds a new head
function drawPosition() {
    let lastSnakeIndex = snake.body.length - 1;
    let smallSnake = snake.body[0];
    tableElements[snake.body[lastSnakeIndex]].classList.toggle('snake');
    snake.body.unshift(smallSnake + snake.nextDirection);
    
    snake.body.pop();
    tableElements[smallSnake + snake.nextDirection].classList.toggle('snake');
}
// gets the current location of the head of the snake
function getSnakeHeadLocation() {
    snake.snakeHeadLocation = snake.body[0];
}
// returns true if the snake head is on the apple
function onApple() {
    if (snake.snakeHeadLocation === gameState.apple) {
        console.log("YUM!", snake.snakeHeadLocation)
        return true;
        
    }
    else {
        return false;
    }
}
function growSnake() {
    // Adds new head
    gameState.board[snake.body[0] + snake.nextDirection].classList.toggle('snake');
    snake.body.unshift(snake.body[0] + snake.nextDirection);

    
    // ------------


}
// removes the snake from the board and the variable body
function removeSnake() {
    for (let i = 0; i < snake.body.length; i++) {
        gameState.board[snake.body[i]].classList.toggle('snake');
        
    }
    snake.body = [];
}
// Snake collision functions ---------------------

function snakeCollision() {
    // if snake runs into itself this function will
    // set gameState.inPlay equal to false
    // Then when gameStatus is running it will end since
    // inPlay is equal to false

    const nextLocation = snake.snakeHeadLocation + snake.nextDirection;

    if (snake.body.includes(nextLocation)) {
        gameState.inPlay = false;
        console.log("OUCH!!");
    }
}

function outOfBounds() {
    // if the snake is going to head out of bounds
    // this function will set gameState.inPlay to false
    // This will end the game when gameStatus is called

    const nextLocation = snake.snakeHeadLocation + snake.nextDirection;

    if (gameState.rightWall.includes(snake.snakeHeadLocation) && snake.nextDirection === 1) {
        gameState.inPlay = false;
        console.log('OUCH!!');
    }
    else if (gameState.leftWall.includes(snake.snakeHeadLocation) && snake.nextDirection === -1) {
        gameState.inPlay = false;
        console.log('OUCH!!');
    }
    else if (gameState.topWall.includes(snake.snakeHeadLocation) && snake.nextDirection === -19) {
        gameState.inPlay = false;
        console.log('OUCH!!');
    }
    else if (gameState.bottomWall.includes(snake.snakeHeadLocation) && snake.nextDirection === 19) {
        gameState.inPlay = false;
        console.log('OUCH!!');
    }


}
// -----------------------------------------------

// Movement key listener and function ------------
document.onkeydown = checkKey;



// Checks if the key pressed on the keyboard is an arrow key
// and if so it changes the value of next direction
// a nested if statement in each arrow key condition
// executes return so the user can't make the snake
// turn around in a 180
function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        if (snake.nextDirection === 19) return;
        snake.nextDirection = -19;
    }
    else if (e.keyCode == '40') {
        // down arrow
        if (snake.nextDirection === -19) return;
        snake.nextDirection = 19;
    }
    else if (e.keyCode == '37') {
       // left arrow
       if (snake.nextDirection === 1) return;
       snake.nextDirection = -1;
    }
    else if (e.keyCode == '39') {
       // right arrow
       if (snake.nextDirection === -1) return;
       snake.nextDirection = 1;
    }
}
// -----------------------------------------------
//Apple functions


// This function generates the apple on the board.
// It will generate a random number until that number no
// longer matches a location of the snake.body array.
// Then it sets apple equal to randomIndex and toggles the
// 'apple' class onto that index on the board
function generateApple() {
    let randomIndex = null;

    do {
        randomIndex = Math.floor(Math.random() * gameState.board.length);

    } while (snake.body.includes(randomIndex))
    gameState.apple = randomIndex;
    gameState.board[gameState.apple].classList.toggle('apple');
    console.log('apple location', gameState.apple);
}
// This function removes the apple from the board and
// sets gameState.apple to null since there is no apple now
function removeApple() {
    gameState.board[gameState.apple].classList.toggle('apple');
    gameState.apple = null;

}
// Stat functions ---------------------

// updates the users score in both the html view as well as
// in the gameState object
function updateScore() {
    gameState.score++;
    document.getElementById('score').innerText = gameState.score;
}
// resets the score
// changes both the rendered html and in the javascript
function resetScore() {
    gameState.score = 0;
    document.getElementById('score').innerText = 0;
}
// renders the snake.body length into the element with
// the id of 'length'
function updateSnakeLength() {
    document.getElementById('length').innerText = snake.body.length;
}
// resets the value rendered in the html element with the
// id of 'length'
function resetSnakeLength() {
    document.getElementById('length').innerText = 0;
}
// adds text to the element with the id 'gameOver'
function generateGameOver() {
    document.getElementById('gameOver').innerText = 'GAME OVER!!!'
}
// Removes the html text from the 'gameOver' id
function removeGameOver() {
    document.getElementById('gameOver').innerText = "";
}
// -------------------------------------
// gamestate
    //checks current status of the game calls update and draw
    // ends the gamestate when the user has lost
    // gameStatus functions

// generates the edge of the gameboard for the logic needed
// for loss conditions

// returns an array with the values of the right edge of the
// board
function generateRightWall() {
    let boundary = [];
    for (let i = 0; i < tableElements.length; i++) {
        if ((i + 1) % tableRows.length === 0) {
            boundary.push(i);
        }
    }
    return boundary;
}

// returns an array with the values of the left edge of the
// board
function generateLeftWall() {
    let boundary = [];
    for (let i = 0; i < tableElements.length; i++) {
        if (i % tableRows.length === 0) {
            boundary.push(i);
        }
    }
    return boundary;
}

// returns an array with the values of the top edge of the
// board
function generateTopWall() {
    let boundary = [];
    for (i = 0; i < tableRows.length; i++) {
        boundary.push(i);
    }
    return boundary;
}

// returns an array with the values of the top edge of the
// board
function generateBottomWall() {
    let boundary = [];
    for (let i = 0; i < tableRows.length; i++) {
        boundary.push((tableElements.length - 1) - i);
    }
    return boundary;
}

// These variables are set to be equal to the start and
// reset button in the html
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

// adding event listener when clicking on start and reset
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

// executes all the functions needed to start the game
function startGame() {
    // set inPlay to true since if its false the game will 
    // end.
    gameState.inPlay = true;
    startingPosition(); // renders the start position
    generateApple(); // renders the apple position
    updateSnakeLength(); // updates the initial length

    // remove the event listener from the start button to 
    //prevent the user from clicking it multiple times
    startButton.removeEventListener('click', startGame);

    // start the intended game loop that calls the
    // gameStatus function based off of the speed value
    // in gameState
    gameState.tick = setInterval(gameStatus, gameState.speed);
    
}
// resets the game to a blank board and cleared stats
function resetGame() {
    // stops the continuous execution of gameState
    clearInterval(gameState.tick);

    removeSnake(); // removes snake from html and resets value
    removeApple(); // remove apple from html and reset value
    snake.nextDirection = -1; // assigns default nextDirection again
    gameState.speed = 150; // resets the speed of snake
    resetScore(); // score reverted to zero
    resetSnakeLength(); // length to zero
    removeGameOver(); // game over screen removed

    // re-adds the event listener removed in startGame
    startButton.addEventListener('click', startGame);
}

// Runs all the functions that need to be executed everytime
// the snake moves
function gameStatus() {
    // resets our interval so the speed increase can
    // be applied to the snake
    clearInterval(gameState.tick);
    gameState.tick = setInterval(gameStatus, gameState.speed);

    getSnakeHeadLocation(); // sets current head location

    snakeCollision(); // checks if snake will collide
    outOfBounds(); // checks if snake will go out of board

    // ends the game if inPlay is false
    if (!gameState.inPlay) {
        clearInterval(gameState.tick);
        generateGameOver();
        return; // so nothing else in the function executes
    }
    
    // executes if snake is on the apple
    if (onApple()) {
        removeApple(); // remove current apple
        updateScore(); // update users score
        growSnake(); // grows the snake
        generateApple(); // generate a new apple
        updateSnakeLength(); // update the current length

        if (gameState.speed > 100) {
            gameState.speed -= 5;
        }
        
    }
    else { // basic snake movement
        drawPosition();
    }
    
    
}


// update
    // updates the values of our elements
    // snake position
    // food position
    // head position
    // add onto body when snake eats food
    // new travel position from user input

// draw
    // takes our updates and puts them into the html
    // draw new snake head position
    // draw food position
    // draw newly added segment onto the end of our snake