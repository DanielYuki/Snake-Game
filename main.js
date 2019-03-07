// set up canvas
const canvas = document.querySelector('#game');
const ctx = canvas.getContext("2d");

let canvasSize = canvas.width;
const squareSize = (canvasSize / 16);

let face;
let score = 0;

// Snake is an array
let snake = [];
snake[0] = {
    x: 8 * squareSize,
    y: 8 * squareSize
}

// food is an object
let food = {
    x: Math.floor((Math.random() * 16)) * squareSize,
    y: Math.floor((Math.random() * 16)) * squareSize
}


document.addEventListener('keydown', faceection);

function faceection(event) {
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

function draw() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvasSize, canvasSize)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "black" : "gray";
        ctx.fillRect(snake[i].x, snake[i].y, squareSize, squareSize);

        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, squareSize, squareSize);

    }
    ctx.fillStyle = 'green'
    ctx.fillRect(food.x, food.y, squareSize, squareSize)


    let snakeHeadX = snake[0].x;
    let snakeHeadY = snake[0].y;

    if (face == 'LEFT') { snakeHeadX -= squareSize }
    if (face == 'UP') { snakeHeadY -= squareSize }
    if (face == 'RIGHT') { snakeHeadX += squareSize }
    if (face == 'DOWN') { snakeHeadY += squareSize }

    if (snakeHeadX == food.x && snakeHeadY == food.y) {
        score++
        console.log(score)
        food = {
            x: Math.floor((Math.random() * 16)) * squareSize,
            y: Math.floor((Math.random() * 16)) * squareSize
        }
    } else {
        snake.pop();
    }

    if (snakeHeadX < 0 || snakeHeadX >= canvasSize ||
        snakeHeadY < 0 || snakeHeadY >= canvasSize) {
        clearInterval(gameOn)
        console.log('over')
    }

    let newSnakeHeadPosition = {
        x: snakeHeadX,
        y: snakeHeadY
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