const grid = document.querySelector('.grid');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const userStart = [230, 10];
let currentPosition = [...userStart];
const ballStart = [280, 40];
let ballCurrentPosition = [...ballStart];
let ballDiameter = 20;
let xDirection = 2;
let yDirection = 2;
let timerId;

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
];

function addBlocks() {
    blocks.forEach((block) => {
        const blockElement = document.createElement('div');
        blockElement.classList.add('block');
        blockElement.style.left = block.bottomLeft[0] + 'px';
        blockElement.style.bottom = block.bottomLeft[1] + 'px';
        grid.appendChild(blockElement);
    });
}

addBlocks();

const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10;
                drawUser();
            }
            break;
    }
}

document.addEventListener('keydown', moveUser);

const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollision();
}

timerId = setInterval(moveBall, 20);

function checkForCollision() {
    blocks.forEach((block, index) => {
        if (
            ballCurrentPosition[0] > block.bottomLeft[0] &&
            ballCurrentPosition[0] < block.bottomRight[0] &&
            ballCurrentPosition[1] + ballDiameter > block.bottomLeft[1] &&
            ballCurrentPosition[1] < block.topLeft[1]
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[index].remove();
            blocks.splice(index, 1);
            changeDirection();
        }
    });

    if (
        ballCurrentPosition[0] >= currentPosition[0] &&
        ballCurrentPosition[0] <= currentPosition[0] + blockWidth &&
        ballCurrentPosition[1] <= currentPosition[1] + blockHeight &&
        ballCurrentPosition[1] >= currentPosition[1]
    ) {
        changeDirection();
    }

    if (
        ballCurrentPosition[0] >= boardWidth - ballDiameter ||
        ballCurrentPosition[1] >= boardHeight - ballDiameter ||
        ballCurrentPosition[0] <= 0
    ) {
        changeDirection();
    }

    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId);
        alert('Game Over');
        document.location.reload();
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) yDirection = -2;
    else if (xDirection === 2 && yDirection === -2) xDirection = -2;
    else if (xDirection === -2 && yDirection === -2) yDirection = 2;
    else if (xDirection === -2 && yDirection === 2) xDirection = 2;
}
