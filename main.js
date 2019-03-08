// set up canvas
const canvas = document.querySelector('#game');
const ctx = canvas.getContext("2d");

let canvasSize = canvas.width;
const squareSize = (canvasSize / 20);

let score = 0;

// Snake is an array
let snake = [];
snake[0] = {
    x: (canvasSize / 2),
    y: (canvasSize / 2)
}

// food is an object
let food = {
    x: Math.floor((Math.random() * 20)) * squareSize,
    y: Math.floor((Math.random() * 20)) * squareSize
}


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
}

function bumpedInto(head, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            return true
        }
    }
}

function draw() {
    ctx.fillStyle = "lightgray"
    ctx.fillRect(0, 0, canvasSize, canvasSize)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "black" : "#323232";
        ctx.fillRect(snake[i].x, snake[i].y, squareSize, squareSize);
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(snake[i].x, snake[i].y, squareSize, squareSize);
    }
    ctx.fillStyle = 'lightgreen'
    ctx.strokeStyle = 'green'
    ctx.strokeRect(food.x, food.y, squareSize, squareSize)
    ctx.fillRect(food.x, food.y, squareSize, squareSize)


    let snakeHeadX = snake[0].x;
    let snakeHeadY = snake[0].y;

    if (face == 'LEFT') { snakeHeadX -= squareSize }
    if (face == 'UP') { snakeHeadY -= squareSize }
    if (face == 'RIGHT') { snakeHeadX += squareSize }
    if (face == 'DOWN') { snakeHeadY += squareSize }

    if (snakeHeadX == food.x && snakeHeadY == food.y) {
        score++
        food = {
            x: Math.floor((Math.random() * 20)) * squareSize,
            y: Math.floor((Math.random() * 20)) * squareSize
        }
    } else {
        snake.pop();
    }

    let newSnakeHeadPosition = {
        x: snakeHeadX,
        y: snakeHeadY
    }

    if (snakeHeadX < 0 || snakeHeadX >= canvasSize ||
        snakeHeadY < 0 || snakeHeadY >= canvasSize ||
        bumpedInto(newSnakeHeadPosition, snake)) {
        clearInterval(gameOn)
        console.log('over')
    }

    snake.unshift(newSnakeHeadPosition)
}


let gameOn = setInterval(draw, 100);


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