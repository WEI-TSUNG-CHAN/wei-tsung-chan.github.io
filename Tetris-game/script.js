const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const rows = 20;  // 行數
const cols = 10;  // 列數
let blockSize;  // 每個方塊的大小
let score = 0;  // 分數
let gameInterval = null;  // 用於控制遊戲循環
let timerInterval = null;  // 計時器
let timeElapsed = 0;  // 遊戲計時
let isPaused = false;  // 暫停標誌
let board = Array.from({ length: rows }, () => Array(cols).fill(null));  // 初始化遊戲面板
let currentTetromino = null;  // 當前方塊
let currentPos = { x: 0, y: 0 };  // 當前方塊的位置

// 顏色列表
const colors = [
  'cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'
];

// 方塊形狀
const tetrominos = [
  [[1, 1, 1, 1]], // I
  [[1, 1, 1], [0, 1, 0]], // T
  [[1, 1], [1, 1]], // O
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]], // Z
  [[1, 0, 0], [1, 1, 1]], // L
  [[0, 0, 1], [1, 1, 1]]  // J
];

// 生成隨機方塊
function generateTetromino() {
  const type = Math.floor(Math.random() * tetrominos.length);
  const shape = tetrominos[type];
  const color = colors[type];
  currentTetromino = { shape, color };
  currentPos = { x: Math.floor(cols / 2) - Math.floor(shape[0].length / 2), y: 0 };

  // 檢查新生成的方塊是否與現有方塊發生碰撞
  if (isCollision(currentPos, currentTetromino.shape)) {
    gameOver();  // 遊戲結束
  }
}

// 繪製遊戲面板
function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (board[y][x]) {
        ctx.fillStyle = board[y][x];
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  }
}

// 繪製當前方塊
function drawTetromino() {
  const shape = currentTetromino.shape;
  const color = currentTetromino.color;
  
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        ctx.fillStyle = color;
        ctx.fillRect((currentPos.x + x) * blockSize, (currentPos.y + y) * blockSize, blockSize, blockSize);
      }
    }
  }
}

// 方塊移動
function moveTetromino(dx, dy) {
  const newPos = { x: currentPos.x + dx, y: currentPos.y + dy };
  
  if (!isCollision(newPos, currentTetromino.shape)) {
    currentPos = newPos;
    drawBoard();
    drawTetromino();
    return true;
  }
  return false;
}

// 旋轉方塊 (順時針 90 度)
function rotateTetromino() {
  const newShape = currentTetromino.shape[0].map((_, i) => currentTetromino.shape.map(row => row[i])).reverse();
  
  if (!isCollision(currentPos, newShape)) {
    currentTetromino.shape = newShape;
    drawBoard();
    drawTetromino();
  }
}

// 檢查碰撞
function isCollision(position, shape) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const newX = position.x + x;
        const newY = position.y + y;
        if (newX < 0 || newX >= cols || newY >= rows || (newY >= 0 && board[newY][newX])) {
          return true;
        }
      }
    }
  }
  return false;
}

// 固定方塊
function lockTetromino() {
  const shape = currentTetromino.shape;
  const color = currentTetromino.color;
  
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const boardX = currentPos.x + x;
        const boardY = currentPos.y + y;
        if (boardY >= 0) {
          board[boardY][boardX] = color;
        }
      }
    }
  }
  
  clearLines();
  generateTetromino();
}

// 清除已滿行
function clearLines() {
  for (let y = rows - 1; y >= 0; y--) {
    if (board[y].every(cell => cell !== null)) {
      board.splice(y, 1);
      board.unshift(Array(cols).fill(null));
      score += 10;
      document.getElementById('score').textContent = '分數: ' + score;
    }
  }
}

// 主遊戲循環
function gameLoop() {
  if (!moveTetromino(0, 1)) {
    lockTetromino();
  }
  
  drawBoard();
  drawTetromino();
}

// 計時器
function startTimer() {
  timerInterval = setInterval(() => {
    timeElapsed++;
    document.getElementById('timer').textContent = '時間: ' + timeElapsed + '秒';
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// 遊戲結束處理
function gameOver() {
  alert('遊戲結束！你的分數是: ' + score);
  stopTimer();
  disableButtons();
  clearInterval(gameInterval);
  startGame();
}

// 初始化遊戲
function startGame() {
  board = Array.from({ length: rows }, () => Array(cols).fill(null));
  score = 0;
  timeElapsed = 0;
  
  document.getElementById('score').textContent = '分數: ' + score;
  document.getElementById('timer').textContent = '時間: 0';

  enableButtons();
  generateTetromino();
  gameInterval = setInterval(gameLoop, 500);
  startTimer();
}

// 暫停遊戲
function pauseGame() {
  clearInterval(gameInterval);
  stopTimer();
  isPaused = true;
  document.getElementById('pauseButton').textContent = '繼續遊戲';
}

// 恢復遊戲
function resumeGame() {
  gameInterval = setInterval(gameLoop, 500);
  startTimer();
  isPaused = false;
  document.getElementById('pauseButton').textContent = '暫停遊戲';
}

// 重置遊戲
function resetGame() {
  clearInterval(gameInterval);
  stopTimer();
  startGame();
}

// 控制鍵盤事件
document.addEventListener('keydown', (event) => {
  if (isPaused) return;

  if (event.key === 'ArrowLeft') {
    moveTetromino(-1, 0);
  } else if (event.key === 'ArrowRight') {
    moveTetromino(1, 0);
  } else if (event.key === 'ArrowDown') {
    moveTetromino(0, 1);
  } else if (event.key === ' ') {  // 空白鍵旋轉
    rotateTetromino();
  }
});

// 控制按鈕事件
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('pauseButton').addEventListener('click', () => {
  if (isPaused) {
    resumeGame();
  } else {
    pauseGame();
  }
});
document.getElementById('resetButton').addEventListener('click', resetGame);

// 啟用按鈕
function enableButtons() {
  document.getElementById('pauseButton').disabled = false;
  document.getElementById('resetButton').disabled = false;
  document.getElementById('startButton').disabled = true;
}

// 禁用按鈕
function disableButtons() {
  document.getElementById('pauseButton').disabled = true;
  document.getElementById('resetButton').disabled = true;
  document.getElementById('startButton').disabled = false;
}

// 動態調整畫布大小
function resizeCanvas() {
  const width = window.innerWidth < 600 ? window.innerWidth - 20 : 300;
  const height = window.innerHeight < 800 ? window.innerHeight - 50 : 600;

  canvas.width = width;
  canvas.height = height;
  blockSize = Math.floor(Math.min(canvas.width / cols, canvas.height / rows));
  drawBoard();
  drawTetromino();
}

// 設置虛擬按鈕控制事件 - 長按連擊效果
let leftInterval, rightInterval, downInterval, rotateInterval;

// 添加觸控事件支持
function addTouchEventListener(element, startCallback, endCallback) {
  element.addEventListener('mousedown', startCallback);
  element.addEventListener('mouseup', endCallback);
  element.addEventListener('mouseleave', endCallback);
  
  // 支援觸控事件
  element.addEventListener('touchstart', startCallback);
  element.addEventListener('touchend', endCallback);
  element.addEventListener('touchcancel', endCallback);
}

// 處理左移
addTouchEventListener(document.getElementById('leftButton'), () => {
  leftInterval = setInterval(() => {
    moveTetromino(-1, 0);  // 左移
  }, 50);  // 每 50 毫秒執行一次
}, () => {
  clearInterval(leftInterval);  // 停止左移
});

// 處理右移
addTouchEventListener(document.getElementById('rightButton'), () => {
  rightInterval = setInterval(() => {
    moveTetromino(1, 0);  // 右移
  }, 50);  // 每 50 毫秒執行一次
}, () => {
  clearInterval(rightInterval);  // 停止右移
});

// 處理下移
addTouchEventListener(document.getElementById('downButton'), () => {
  downInterval = setInterval(() => {
    moveTetromino(0, 1);  // 下移
  }, 50);  // 每 50 毫秒執行一次
}, () => {
  clearInterval(downInterval);  // 停止下移
});

// 處理旋轉
addTouchEventListener(document.getElementById('rotateButton'), () => {
  rotateInterval = setInterval(() => {
    rotateTetromino();  // 旋轉方塊
  }, 50);  // 每 50 毫秒執行一次
}, () => {
  clearInterval(rotateInterval);  // 停止旋轉
});

// 畫布初始化
resizeCanvas();
window.addEventListener('resize', resizeCanvas); // 當視窗大小改變時重新計算畫布大小
