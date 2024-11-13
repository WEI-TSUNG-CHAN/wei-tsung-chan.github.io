const boardElement = document.getElementById('board');
const shuffleBtn = document.getElementById('shuffle-btn');
const messageElement = document.getElementById('message');
const timeElement = document.getElementById('time');
const bestTimeElement = document.getElementById('best-time');

// 初始化數字拼圖
let tiles = [];
const rows = 5;
const cols = 5;
const totalTiles = rows * cols - 1; // 除了空格外有 24 塊拼圖

let timer;
let timeElapsed = 0;
let bestTime = localStorage.getItem('bestTime') ? parseInt(localStorage.getItem('bestTime')) : null;
let gameStarted = false;

// 設定拼圖
function createBoard() {
    tiles = [];
    for (let i = 0; i < totalTiles; i++) {
        tiles.push(i + 1);
    }
    tiles.push(null); // 空格
    renderBoard();
}

// 渲染拼圖
function renderBoard() {
    boardElement.innerHTML = '';
    tiles.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile');
        
        if (tile === null) {
            tileElement.classList.add('empty');
        } else {
            tileElement.textContent = tile;
            tileElement.addEventListener('click', () => handleTileClick(index));
        }

        boardElement.appendChild(tileElement);
    });
}

// 處理拼圖塊點擊
function handleTileClick(index) {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [
        -1, // 左
        1,  // 右
        -cols, // 上
        cols  // 下
    ];

    for (let move of validMoves) {
        const newIndex = index + move;
        if (newIndex >= 0 && newIndex < tiles.length && Math.abs(index % cols - newIndex % cols) <= 1) {
            if (newIndex === emptyIndex) {
                swapTiles(index, emptyIndex);
                if (!gameStarted) {
                    startTimer();
                }
                if (checkWin()) {
                    endGame();
                }
                break;
            }
        }
    }
}

// 交換拼圖塊
function swapTiles(i, j) {
    const temp = tiles[i];
    tiles[i] = tiles[j];
    tiles[j] = temp;
    renderBoard();
}

// 檢查遊戲是否結束
function checkWin() {
    for (let i = 0; i < totalTiles; i++) {
        if (tiles[i] !== (i + 1)) {
            return false;
        }
    }
    return true;
}

// 開始計時
function startTimer() {
    gameStarted = true;
    timer = setInterval(() => {
        timeElapsed++;
        timeElement.textContent = `時間：${timeElapsed}秒`;
    }, 1000);
}

// 停止計時
function stopTimer() {
    clearInterval(timer);
}

// 顯示遊戲結束訊息
function endGame() {
    stopTimer();
    messageElement.textContent = `恭喜過關！你花了 ${timeElapsed} 秒。`;

    if (!bestTime || timeElapsed < bestTime) {
        bestTime = timeElapsed;
        localStorage.setItem('bestTime', bestTime);
        bestTimeElement.textContent = `最佳時間：${bestTime}秒`;
    }

    alert(`恭喜你！遊戲結束，花了 ${timeElapsed} 秒。`);
}

// 洗牌功能
function shuffleBoard() {
    let shuffled = false;
    let count = 0;

    while (!shuffled && count < 1000) {
        count++;
        const shuffledTiles = [...tiles];
        for (let i = shuffledTiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledTiles[i], shuffledTiles[j]] = [shuffledTiles[j], shuffledTiles[i]];
        }

        if (isSolvable(shuffledTiles)) {
            tiles = shuffledTiles;
            renderBoard();
            gameStarted = false;
            timeElapsed = 0;
            timeElement.textContent = '時間：0秒';
            messageElement.textContent = '';
            break;
        }
    }
}

// 判斷拼圖是否可解
function isSolvable(shuffledTiles) {
    let inversions = 0;
    for (let i = 0; i < shuffledTiles.length; i++) {
        for (let j = i + 1; j < shuffledTiles.length; j++) {
            if (shuffledTiles[i] !== null && shuffledTiles[j] !== null && shuffledTiles[i] > shuffledTiles[j]) {
                inversions++;
            }
        }
    }
    return inversions % 2 === 0;
}

// 事件綁定
shuffleBtn.addEventListener('click', shuffleBoard);

// 初始化遊戲
createBoard();
if (bestTime !== null) {
    bestTimeElement.textContent = `最佳時間：${bestTime}秒`;
}
