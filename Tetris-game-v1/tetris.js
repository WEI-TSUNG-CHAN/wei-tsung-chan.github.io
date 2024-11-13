const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const rows = 20;
const cols = 10;
const blockSize = 30;

let board = Array.from({ length: rows }, () => Array(cols).fill(0));

const colors = [
    null,
    'red',     // I形狀
    'blue',    // O形狀
    'green',   // T形狀
    'yellow',  // S形狀
    'cyan',    // Z形狀
    'purple',  // L形狀
    'orange'   // J形狀
];

const tetrominos = [
    [],
    [[1, 1, 1, 1]],  // I
    [[1, 1], [1, 1]],  // O
    [[0, 1, 0], [1, 1, 1]],  // T
    [[0, 1, 1], [1, 1, 0]],  // S
    [[1, 1, 0], [0, 1, 1]],  // Z
    [[1, 0, 0], [1, 1, 1]],  // L
    [[0, 0, 1], [1, 1, 1]]   // J
];

let currentPiece = generatePiece();
let gameInterval;
let score = 0;
let timer = 0;
let gamePaused = false;
let gameStarted = false;
let timerInterval;

// 生成新的方塊
function generatePiece() {
    const type = Math.floor(Math.random() * 7) + 1;
    const shape = tetrominos[type];
    return {
        x: Math.floor(cols / 2) - Math.floor(shape[0].length / 2),
        y: 0,
        shape: shape,
        color: colors[type]
    };
}

// 開始計時
function startTimer() {
    timerInterval = setInterval(() => {
        if (!gamePaused) {
            timer++;
            document.getElementById('timer').textContent = `時間: ${timer}`;
        }
    }, 1000);
}

// 停止計時
function stopTimer() {
    clearInterval(timerInterval);
}

// 重新啟動遊戲
function restartGame() {
    clearInterval(gameInterval);
    stopTimer();
    score = 0;
    timer = 0;
    gamePaused = false;
    gameStarted = false;
    board = Array.from({ length: rows }, () => Array(cols).fill(0));
    currentPiece = generatePiece();
    startGame();
}

// 初始化遊戲狀態
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col] !== 0) {
                ctx.fillStyle = board[row][col];
                ctx.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
            }
        }
    }

    // Draw the current piece
    for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
            if (currentPiece.shape[row][col]) {
                ctx.fillStyle = currentPiece.color;
                ctx.fillRect((currentPiece.x + col) * blockSize, (currentPiece.y + row) * blockSize, blockSize, blockSize);
            }
        }
    }

    // Draw the score
    document.getElementById('score').textContent = `分數: ${score}`;
}

function rotatePiece() {
    const newShape = currentPiece.shape[0].map((_, index) =>
        currentPiece.shape.map(row => row[index])
    ).reverse();

    const newPiece = { ...currentPiece, shape: newShape };
    if (isValidMove(newPiece)) {
        currentPiece = newPiece;
    }
}

function isValidMove(piece) {
    for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
            if (piece.shape[row][col]) {
                const newX = piece.x + col;
                const newY = piece.y + row;
                if (newX < 0 || newX >= cols || newY >= rows || board[newY] && board[newY][newX]) {
                    return false;
                }
            }
        }
    }
    return true;
}

function movePiece() {
    const newPiece = { ...currentPiece, y: currentPiece.y + 1 };

    if (isValidMove(newPiece)) {
        currentPiece = newPiece;
    } else {
        placePiece();
        currentPiece = generatePiece();

        if (!isValidMove(currentPiece)) {
            clearInterval(gameInterval);
            stopTimer();
            alert('遊戲結束');
        }
    }
}

function placePiece() {
    for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
            if (currentPiece.shape[row][col]) {
                board[currentPiece.y + row][currentPiece.x + col] = currentPiece.color;
            }
        }
    }

    clearLines();
}

function clearLines() {
    for (let row = rows - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== 0)) {
            board.splice(row, 1);
            board.unshift(Array(cols).fill(0));
            score += 10;
        }
    }
}

function moveLeft() {
    const newPiece = { ...currentPiece, x: currentPiece.x - 1 };
    if (isValidMove(newPiece)) {
        currentPiece = newPiece;
    }
}

function moveRight() {
    const newPiece = { ...currentPiece, x: currentPiece.x + 1 };
    if (isValidMove(newPiece)) {
        currentPiece = newPiece;
    }
}

function gameLoop() {
    drawBoard();
    movePiece();
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        startTimer();
    }
    gameInterval = setInterval(gameLoop, 500);
}

function togglePause() {
    if (gamePaused) {
        gamePaused = false;
        gameInterval = setInterval(gameLoop, 500);
        startTimer();
    } else {
        gamePaused = true;
        clearInterval(gameInterval);
        stopTimer();
    }
}

// 虛擬控制按鈕事件
document.getElementById('leftButton').addEventListener('click', moveLeft);
document.getElementById('rightButton').addEventListener('click', moveRight);
document.getElementById('rotateButton').addEventListener('click', rotatePiece);
document.getElementById('downButton').addEventListener('click', movePiece);
document.getElementById('pauseButton').addEventListener('click', togglePause);
document.getElementById('restartButton').addEventListener('click', restartGame);

startGame();
