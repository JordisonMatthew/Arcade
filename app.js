
// Creates our table data

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
const tableRows = table.getElementsByTagName('tr');

let snake = {
    body: [],
    nextDirection: -1,
    snakeHeadLocation: null
}

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
// Snake Functions
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
function drawPosition() {
    let lastSnakeIndex = snake.body.length - 1;
    let smallSnake = snake.body[0];
    tableElements[snake.body[lastSnakeIndex]].classList.toggle('snake');
    snake.body.unshift(smallSnake + snake.nextDirection);
    
    snake.body.pop();
    tableElements[smallSnake + snake.nextDirection].classList.toggle('snake');
}

function getSnakeHeadLocation() {
    snake.snakeHeadLocation = snake.body[0];
}
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


document.onkeydown = checkKey;




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

//Apple functions



function generateApple() {
    let randomIndex = null;

    let onSnake = false;
    do {
        randomIndex = Math.floor(Math.random() * gameState.board.length);

    } while (snake.body.includes(randomIndex))
    gameState.apple = randomIndex;
    gameState.board[gameState.apple].classList.toggle('apple');
    console.log('apple location', gameState.apple);
}
function removeApple() {
    gameState.board[gameState.apple].classList.toggle('apple');
    gameState.apple = null;

}
// Stat functions ---------------------
function updateScore() {
    gameState.score++;
    document.getElementById('score').innerText = gameState.score;
}
function resetScore() {
    gameState.score = 0;
    document.getElementById('score').innerText = 0;
}
function updateSnakeLength() {
    document.getElementById('length').innerText = snake.body.length;
}
function resetSnakeLength() {
    document.getElementById('length').innerText = 0;
}
function generateGameOver() {
    document.getElementById('gameOver').innerText = 'GAME OVER!!!'
}
function removeGameOver() {
    document.getElementById('gameOver').innerText = "";
}
// -------------------------------------
// gamestate
    //checks current status of the game calls update and draw
    // ends the gamestate when the user has lost
    // gameStatus functions

function generateRightWall() {
    let boundary = [];
    for (let i = 0; i < tableElements.length; i++) {
        if ((i + 1) % tableRows.length === 0) {
            boundary.push(i);
        }
    }
    return boundary;
}
function generateLeftWall() {
    let boundary = [];
    for (let i = 0; i < tableElements.length; i++) {
        if (i % tableRows.length === 0) {
            boundary.push(i);
        }
    }
    return boundary;
}
function generateTopWall() {
    let boundary = [];
    for (i = 0; i < tableRows.length; i++) {
        boundary.push(i);
    }
    return boundary;
}
function generateBottomWall() {
    let boundary = [];
    for (let i = 0; i < tableRows.length; i++) {
        boundary.push((tableElements.length - 1) - i);
    }
    return boundary;
}
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

function startGame() {
    gameState.inPlay = true;
    startingPosition();
    generateApple();
    updateSnakeLength();

    gameState.tick = setInterval(gameStatus, gameState.speed);
}
function resetGame() {
    clearInterval(gameState.tick);
    removeSnake();
    removeApple();
    snake.nextDirection = -1;
    resetScore();
    resetSnakeLength();
    removeGameOver();
}

function gameStatus() {
    getSnakeHeadLocation();

    snakeCollision();
    outOfBounds();

    if (!gameState.inPlay) {
        clearInterval(gameState.tick);
        generateGameOver();
        return;
    }
    
    if (onApple()) {
        removeApple();
        updateScore();
        growSnake();
        generateApple();
        updateSnakeLength();
        
    }
    else {
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