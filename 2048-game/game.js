// 游戏初始化和状态
const gridSize = 4;
let grid = [];
let score = 0;
let highScore = localStorage.getItem('highScore') || 0; // 读取本地存储的最高分
let timer = 0;
let timerInterval = null;

// 生成一个新的空格子
function initGrid() {
    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    score = 0;
    timer = 0;
    updateHighScore();
    addRandomTile();
    addRandomTile();
    renderGrid();
    startTimer();
}

// 随机生成一个2或4
function getRandomTileValue() {
    return Math.random() < 0.9 ? 2 : 4;
}

// 在空白位置添加一个新格子
function addRandomTile() {
    let emptyCells = [];
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (grid[r][c] === 0) {
                emptyCells.push({ row: r, col: c });
            }
        }
    }

    if (emptyCells.length > 0) {
        let { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[row][col] = getRandomTileValue();
    }
}

// 渲染游戏面板
function renderGrid() {
    grid.forEach((row, r) => {
        row.forEach((cell, c) => {
            let cellElem = document.getElementById(`cell-${r * gridSize + c}`);
            cellElem.textContent = cell === 0 ? '' : cell;
            cellElem.setAttribute('data-value', cell);
            cellElem.style.backgroundColor = getCellColor(cell);
        });
    });

    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timer;
    document.getElementById('high-score').textContent = highScore;
}

// 获取不同数值的背景颜色
function getCellColor(value) {
    switch (value) {
        case 2: return '#4f4a3d';
        case 4: return '#6f5e3e';
        case 8: return '#a67c4f';
        case 16: return '#d88a3e';
        case 32: return '#d67a3c';
        case 64: return '#d5631d';
        case 128: return '#d44b0a';
        case 256: return '#cc3e00';
        case 512: return '#e80000';
        case 1024: return '#ff6f00';
        case 2048: return '#ff8f00';
        default: return '#3c3a32'; 
    }
}

// 移动和合并格子逻辑
function slideLeft() {
    let moved = false;
    for (let r = 0; r < gridSize; r++) {
        let newRow = grid[r].filter(val => val !== 0);
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                score += newRow[i];
                newRow.splice(i + 1, 1);
            }
        }
        newRow = [...newRow, ...Array(gridSize - newRow.length).fill(0)];
        if (JSON.stringify(grid[r]) !== JSON.stringify(newRow)) {
            grid[r] = newRow;
            moved = true;
        }
    }
    return moved;
}

// 键盘控制方向
function move(direction) {
    let moved = false;
    if (direction === 'left') {
        moved = slideLeft();
    } else if (direction === 'right') {
        grid = grid.map(row => row.reverse());
        moved = slideLeft();
        grid = grid.map(row => row.reverse());
    } else if (direction === 'up') {
        grid = transposeGrid(grid);
        moved = slideLeft();
        grid = transposeGrid(grid);
    } else if (direction === 'down') {
        grid = transposeGrid(grid);
        grid = grid.map(row => row.reverse());
        moved = slideLeft();
        grid = grid.map(row => row.reverse());
        grid = transposeGrid(grid);
    }

    if (moved) {
        addRandomTile();
        renderGrid();
    }
}

// 转置网格
function transposeGrid(grid) {
    return grid[0].map((_, i) => grid.map(row => row[i]));
}

// 更新最高分数
function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
}

// 计时器
function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById('timer').textContent = timer;
    }, 1000);
}

// 重新开始游戏
document.getElementById('restart-btn').addEventListener('click', () => {
    clearInterval(timerInterval); // 清除现有计时器
    initGrid(); // 重新初始化游戏
    startTimer(); // 启动新游戏的计时器
});

// 监听键盘事件
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') move('left');
    if (e.key === 'ArrowRight') move('right');
    if (e.key === 'ArrowUp') move('up');
    if (e.key === 'ArrowDown') move('down');
});

// 监听触摸事件
let touchStart = { x: 0, y: 0 };

window.addEventListener('touchstart', (e) => {
    touchStart.x = e.touches[0].pageX;
    touchStart.y = e.touches[0].pageY;
});

window.addEventListener('touchend', (e) => {
    const touchEnd = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY };
    const diffX = touchEnd.x - touchStart.x;
    const diffY = touchEnd.y - touchStart.y;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) move('right');
        else move('left');
    } else {
        if (diffY > 0) move('down');
        else move('up');
    }
});

// 初始化游戏
initGrid();
