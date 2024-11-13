const boardElement = document.getElementById('board');
const shuffleBtn = document.getElementById('shuffleBtn');
const resetBtn = document.getElementById('resetBtn');
const statusText = document.getElementById('status');

// 儲存遊戲的格子
let board = Array.from({ length: 16 }, (_, index) => index + 1);

// 初始化遊戲
function initializeBoard() {
    board = Array.from({ length: 16 }, (_, index) => index + 1);
    renderBoard();
    statusText.textContent = "遊戲進行中...";
}

// 渲染遊戲面板
function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((num, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (num === 16) {
            cell.classList.add('empty');
        } else {
            cell.textContent = num;
        }
        cell.addEventListener('click', () => handleClick(index));
        boardElement.appendChild(cell);
    });
    checkWin();
}

// 點擊格子時的處理邏輯
function handleClick(index) {
    const emptyIndex = board.indexOf(16);
    const possibleMoves = [
        emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4
    ];

    if (possibleMoves.includes(index)) {
        [board[emptyIndex], board[index]] = [board[index], board[emptyIndex]];
        renderBoard();
    }
}

// 隨機打亂遊戲板
function shuffleBoard() {
    let shuffled = Array.from(board);
    do {
        shuffled = shuffled.sort(() => Math.random() - 0.5);
    } while (isSolvable(shuffled)); // 保證打亂後是可解的
    board = shuffled;
    renderBoard();
}

// 檢查遊戲是否結束
function checkWin() {
    if (board.every((num, index) => num === index + 1)) {
        statusText.textContent = "恭喜，你贏了！";
        statusText.style.color = '#2ecc71';
    }
}

// 判斷隨機排列是否可解
function isSolvable(arr) {
    let inversions = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j] && arr[i] !== 16 && arr[j] !== 16) {
                inversions++;
            }
        }
    }
    return inversions % 2 === 0;
}

// 綁定按鈕事件
shuffleBtn.addEventListener('click', shuffleBoard);
resetBtn.addEventListener('click', initializeBoard);

// 初始化遊戲
initializeBoard();
