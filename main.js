// set up canvas
const canvas = document.querySelector('#game');
const ctx = canvas.getContext("2d");

let canvasSize = canvas.width;
const squareSize = (canvasSize / 24);

let fruitsEaten = 0;
let multiplier = 1;
// localStorage
let hiScore = localStorage.getItem('hiScore');

// Snake is an array
let snake = [];
snake[0] = {
    x: (canvasSize / 2),
    y: (canvasSize / 2)
}

// food is an object
let food = {
    x: Math.floor((Math.random() * 24)) * squareSize,
    y: Math.floor((Math.random() * 24)) * squareSize
}

// SFXs
const eatAudio = new Audio('sfx/eat.wav');
const dieAudio = new Audio('sfx/die.mp3');

// face direction
let face;

let upButton = document.querySelector('#upButton');
let leftButton = document.querySelector('#leftButton');
let rightButton = document.querySelector('#rightButton');
let downButton = document.querySelector('#downButton');
upButton.onclick = () => {
    if (face != "DOWN") face = 'UP'
}
leftButton.onclick = () => {
    if (face != "RIGHT") face = 'LEFT'
}
rightButton.onclick = () => {
    if (face != "LEFT") face = 'RIGHT'
}
downButton.onclick = () => {
    if (face != "UP") face = 'DOWN'
}

document.addEventListener('keydown', faceDirection);

let cheat = 'OFF'
function faceDirection(event) {
    let key = event.keyCode;
    if (key == 37 && face != 'RIGHT') {
        face = 'LEFT'
    } else if (key == 38 && face != "DOWN") {
        face = 'UP'
    }
    else if (key == 39 && face != "LEFT") {
        face = 'RIGHT'
    }
    else if (key == 40 && face != "UP") {
        face = 'DOWN'
    }
    else if (key == 32) {
        // cheat == 'OFF' ? cheat = 'ON' : cheat = 'OFF'
    }
}

// Checks if snakeHead position = snakeBody position, if it is, GameOver
function bumpedInto(head, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            return true
        }
    }
}

// generates food randomly
function foodGen(snake) {
    food = {
        x: Math.floor((Math.random() * 24)) * squareSize,
        y: Math.floor((Math.random() * 24)) * squareSize
    }
    for (let i = 0; i < snake.length; i++) {
        if (food.x == snake[i].x && food.y == snake[i].y) {
            food = {
                x: Math.floor((Math.random() * 24)) * squareSize,
                y: Math.floor((Math.random() * 24)) * squareSize
            }
        }
    }
}

// main function
function draw() {
    ctx.fillStyle = "#f0f7da"
    ctx.fillRect(0, 0, canvasSize, canvasSize)

    //draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#234d20" : "#36802d	";
        ctx.fillRect(snake[i].x, snake[i].y, squareSize, squareSize);
        //better snake ?
        ctx.strokeStyle = '#f0f7da'
        ctx.strokeRect(snake[i].x, snake[i].y, squareSize, squareSize);
    }

    //draw food
    ctx.fillStyle = '#ff3232'
    ctx.strokeStyle = 'red'
    ctx.strokeRect(food.x, food.y, squareSize, squareSize)
    ctx.fillRect(food.x, food.y, squareSize, squareSize)


    let snakeHeadX = snake[0].x;
    let snakeHeadY = snake[0].y;

    // snake's direction
    (face == 'LEFT') ? snakeHeadX -= squareSize : '';
    (face == 'UP') ? snakeHeadY -= squareSize : '';
    (face == 'RIGHT') ? snakeHeadX += squareSize : '';
    (face == 'DOWN') ? snakeHeadY += squareSize : '';

    // points System
    let score = ((fruitsEaten * 10) * multiplier);
    let domScore = document.querySelector('#score');
    let domHiScore = document.querySelector('#hiScore');
    // checks if snakeHead = FoodPosition
    if (snakeHeadX == food.x && snakeHeadY == food.y) {
        fruitsEaten++
        eatAudio.play()
        foodGen(snake)
    } else if (cheat == 'OFF') {
        localStorage.getItem('hiScore') == null ? hiScore = 0 : '';
        // delete snake's tail Position
        snake.pop();
    }

    // new Hi-score system, basically
    score > hiScore ? hiScore = score : '';
    localStorage.setItem('hiScore', hiScore)
    domScore.textContent = `Score:${score}`
    domHiScore.textContent = localStorage.getItem('hiScore')

    let newSnakeHeadPosition = {
        x: snakeHeadX,
        y: snakeHeadY
    }

    // basic 
    if (snakeHeadX < 0 || snakeHeadX >= canvasSize ||
        snakeHeadY < 0 || snakeHeadY >= canvasSize ||
        bumpedInto(newSnakeHeadPosition, snake)) {
        gameOver()
        dieAudio.play()
    }

    // SnakeHead new position
    snake.unshift(newSnakeHeadPosition)
}

//refresh game every 100ms
let gameOn = setInterval(draw, 100);

// dpad movement system
let dPadCenterDefault = document.querySelector('#centerDefault')
let dPadCenterRetry = document.querySelector('#centerRetry')
let gameOverScreen = document.querySelector('#gameOver')
let pcCenterRetry = document.querySelector('#centerRetry2')

//game over...
function gameOver() {
    clearInterval(gameOn)
    dPadCenterDefault.style.display = 'none';
    dPadCenterRetry.style.display = 'table-cell';
    gameOverScreen.style.display = 'flex'
    console.log('over')
    dPadCenterRetry.onclick = () => {
        reset()
    }
    pcCenterRetry.onclick = () => {
        reset()
    }
}

// reset game
function reset() {
    snake = [];
    snake[0] = {
        x: (canvasSize / 2),
        y: (canvasSize / 2)
    }
    fruitsEaten = 0;
    score = 0;
    food = {
        x: Math.floor((Math.random() * 24)) * squareSize,
        y: Math.floor((Math.random() * 24)) * squareSize
    }
    gameOn = setInterval(draw, 100);
    face = 'STOP';
    dPadCenterDefault.style.display = 'table-cell';
    dPadCenterRetry.style.display = 'none';
    gameOverScreen.style.display = 'none'
}

// Detects mobile devices
if ( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent.toLowerCase())) {
    console.log('not mobile')
    let dPad = document.querySelector('section')
    dPad.style.display = 'none'
    let howtoPlay = document.querySelector('#howToPlayPc')
    howtoPlay.style.display = 'flex';
    // setTimeout(timeOutModal = () => {howtoPlay.style.display = 'none'}, 10000);
    pcCenterRetry.style.display = 'flex';
};

// Detects if is iOS
const isIos = () => {
    let userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
}

// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
    let showModal = document.querySelector('.iosAlertBoxWebApp');
    showModal.style.animation = 'show 8s ease-in-out 2s'
    showModal.style.display = 'flex'
    setTimeout(timeOutModal = () => { showModal.style.display = 'none' }, 10000)
}


// Register serviceworker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('service-worker.js')
        .then(function () {
            console.log('Service Worker Registered');
        }, function (error) {
            console.error(error);
        });
}