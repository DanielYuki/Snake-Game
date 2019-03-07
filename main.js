// set up canvas
const canvas = document.querySelector('#game');
const ctx = canvas.getContext("2d");

const squareSize = (canvas.clientWidth / 16);

let snake = [];
snake[0] = {
    x: 9 * squareSize,
    y: 10 * squareSize
}

let food = {
    x: Math.floor((Math.random() * 16) * squareSize),
    y: Math.floor((Math.random() * 16) * squareSize)
}

let score = 0;

function draw() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "black" : "gray";
        ctx.fillRect(snake[i].x, snake[i].y, squareSize, squareSize);
        console.log('oi')
        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, squareSize, squareSize);

    }
    ctx.fillRect(food.x, food.y, squareSize, squareSize)
}

// let gameOn = setInterval(draw, 1000);

console.log(squareSize)
console.log(food.y)
console.log(food.x)


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