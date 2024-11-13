// 小學三年級字庫與注音
const characters = [
    { char: "日", zhuyin: "ㄖㄧˋ" },
    { char: "月", zhuyin: "ㄩㄝˋ" },
    { char: "山", zhuyin: "ㄕㄢ" },
    { char: "水", zhuyin: "ㄕㄨㄟˇ" },
    { char: "人", zhuyin: "ㄖㄣˊ" },
    { char: "子", zhuyin: "ㄗˇ" },
    { char: "花", zhuyin: "ㄏㄨㄚ" },
    { char: "鳥", zhuyin: "ㄋㄧㄠˇ" },
    { char: "狗", zhuyin: "ㄍㄡˇ" },
    { char: "車", zhuyin: "ㄔㄜ" },
    { char: "書", zhuyin: "ㄕㄨ" },
    { char: "學", zhuyin: "ㄒㄩㄝˊ" },
    { char: "光", zhuyin: "ㄍㄨㄤ" },
    { char: "明", zhuyin: "ㄇㄧㄥˊ" },
    { char: "大", zhuyin: "ㄉㄚˋ" },
    { char: "小", zhuyin: "ㄒㄧㄠˇ" },
    { char: "高", zhuyin: "ㄍㄠ" },
    { char: "低", zhuyin: "ㄉㄧ" },
    { char: "好", zhuyin: "ㄏㄠˇ" },
    { char: "媽媽", zhuyin: "ㄇㄚ˙ ㄇㄚ˙" },
    { char: "爸爸", zhuyin: "ㄅㄚˋ ㄅㄚˋ" },
    { char: "吃", zhuyin: "ㄔ" },
    { char: "喝", zhuyin: "ㄏㄜ" },
    { char: "玩", zhuyin: "ㄨㄢˊ" },
    { char: "跑", zhuyin: "ㄆㄠˇ" },
    { char: "走", zhuyin: "ㄗㄡˇ" },
    { char: "看", zhuyin: "ㄎㄢˋ" },
    { char: "聽", zhuyin: "ㄊㄧㄥ" },
    { char: "說", zhuyin: "ㄕㄨㄛ" },
    { char: "台", zhuyin: "ㄊㄞˊ" },
    { char: "北", zhuyin: "ㄅㄟˇ" },
    { char: "南", zhuyin: "ㄋㄢˊ" },
    { char: "東", zhuyin: "ㄉㄨㄥ" },
    { char: "西", zhuyin: "ㄒㄧ" },
    { char: "魚", zhuyin: "ㄩˊ" },
    { char: "肉", zhuyin: "ㄖㄡˋ" },
    { char: "米", zhuyin: "ㄇㄧˇ" },
    { char: "火", zhuyin: "ㄏㄨㄛˇ" },
    { char: "土", zhuyin: "ㄊㄨˇ" },
    { char: "木", zhuyin: "ㄇㄨˋ" },
    { char: "金", zhuyin: "ㄐㄧㄣ" },
    { char: "土", zhuyin: "ㄊㄨˇ" },
    { char: "人", zhuyin: "ㄖㄣˊ" },
    { char: "日", zhuyin: "ㄖㄧˋ" },
    { char: "月", zhuyin: "ㄩㄝˋ" },
    { char: "年", zhuyin: "ㄋㄧㄢˊ" },
    { char: "天", zhuyin: "ㄊㄧㄢ" },
    { char: "地", zhuyin: "ㄉㄧˋ" },
    { char: "星", zhuyin: "ㄒㄧㄥ" },
    { char: "空", zhuyin: "ㄎㄨㄥ" },
    { char: "花", zhuyin: "ㄏㄨㄚ" },
    { char: "葉", zhuyin: "ㄧㄝˋ" },
    { char: "種", zhuyin: "ㄓㄨㄥˋ" },
    { char: "學", zhuyin: "ㄒㄩㄝˊ" },
    { char: "家", zhuyin: "ㄐㄧㄚ" },
    { char: "門", zhuyin: "ㄇㄣˊ" },
    { char: "窗", zhuyin: "ㄔㄨㄤ" },
    { char: "房", zhuyin: "ㄈㄤˊ" },
    { char: "牆", zhuyin: "ㄑㄧㄤˊ" },
    { char: "桌", zhuyin: "ㄓㄨㄛ" },
    { char: "椅", zhuyin: "ㄧˇ" },
    { char: "燈", zhuyin: "ㄉㄥ" },
    { char: "電", zhuyin: "ㄉㄧㄢˋ" },
    { char: "線", zhuyin: "ㄒㄧㄢˋ" },
    { char: "電", zhuyin: "ㄉㄧㄢˋ" },
    { char: "光", zhuyin: "ㄍㄨㄤ" },
    { char: "陰", zhuyin: "ㄧㄣ" },
    { char: "雨", zhuyin: "ㄩˇ" },
    { char: "雪", zhuyin: "ㄒㄩㄝˇ" },
    { char: "風", zhuyin: "ㄈㄥ" },
    { char: "雷", zhuyin: "ㄌㄟˊ" },
    { char: "電", zhuyin: "ㄉㄧㄢˋ" },
    { char: "冰", zhuyin: "ㄅㄧㄥ" },
    { char: "水", zhuyin: "ㄕㄨㄟˇ" },
    { char: "火", zhuyin: "ㄏㄨㄛˇ" },
    { char: "山", zhuyin: "ㄕㄢ" },
    { char: "石", zhuyin: "ㄕˊ" },
    { char: "土", zhuyin: "ㄊㄨˇ" },
    { char: "草", zhuyin: "ㄘㄠˇ" },
    { char: "泥", zhuyin: "ㄋㄧˊ" },
    { char: "木", zhuyin: "ㄇㄨˋ" },
    { char: "林", zhuyin: "ㄌㄧㄣˊ" },
    { char: "竹", zhuyin: "ㄓㄨˊ" },
    { char: "花", zhuyin: "ㄏㄨㄚ" },
    { char: "葉", zhuyin: "ㄧㄝˋ" },
    { char: "果", zhuyin: "ㄍㄨㄛˇ" },
    { char: "蘋", zhuyin: "ㄆㄧㄥˊ" },
    { char: "梨", zhuyin: "ㄌㄧˊ" },
    { char: "桃", zhuyin: "ㄊㄠˊ" },
    { char: "梅", zhuyin: "ㄇㄟˊ" },
    { char: "香蕉", zhuyin: "ㄒㄧㄤ ㄐㄧㄠ" },
    { char: "葡萄", zhuyin: "ㄆㄨˊ ㄊㄠˊ" },
    { char: "水", zhuyin: "ㄕㄨㄟˇ" },
    { char: "溫", zhuyin: "ㄨㄣ" },
    { char: "冷", zhuyin: "ㄌㄥˇ" },
    { char: "熱", zhuyin: "ㄖㄜˋ" },
    { char: "涼", zhuyin: "ㄌㄧㄤˊ" },
    { char: "食", zhuyin: "ㄕˊ" },
    { char: "衣", zhuyin: "ㄧ" },
    { char: "帽", zhuyin: "ㄇㄠˋ" },
    { char: "鞋", zhuyin: "ㄒㄧㄝˊ" },
    { char: "褲", zhuyin: "ㄎㄨˋ" },
    { char: "裙", zhuyin: "ㄑㄩㄣˊ" },
    { char: "手", zhuyin: "ㄕㄡˇ" },
    { char: "腳", zhuyin: "ㄐㄧㄠˇ" },
    { char: "頭", zhuyin: "ㄊㄡˊ" },
    { char: "眼", zhuyin: "ㄧㄢˇ" },
    { char: "耳", zhuyin: "ㄦˇ" },
    { char: "鼻", zhuyin: "ㄅㄧˊ" },
    { char: "口", zhuyin: "ㄎㄡˇ" },
    { char: "嘴", zhuyin: "ㄗㄨㄟˇ" },
    { char: "牙", zhuyin: "ㄧㄚˊ" },
    { char: "舌", zhuyin: "ㄕㄜˊ" },
    { char: "心", zhuyin: "ㄒㄧㄣ" },
    { char: "血", zhuyin: "ㄒㄧㄝˇ" },
    { char: "肺", zhuyin: "ㄈㄟˋ" },
    { char: "胃", zhuyin: "ㄨㄟˋ" },
    { char: "胃", zhuyin: "ㄨㄟˋ" }
  ];
  
  // 初始化canvas
let canvas = document.getElementById("writing-canvas");
let ctx = canvas.getContext("2d");

// 設定畫布大小
canvas.width = window.innerWidth - 40;
canvas.height = 300;

// 畫筆設置
let drawing = false;
let lastX = 0;
let lastY = 0;
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// 隨機選擇一個字
function getRandomCharacter() {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}

// 顯示下一個字
function nextCharacter() {
  const currentCharacter = getRandomCharacter(); // 隨機選擇一個字
  document.getElementById("current-character").textContent = currentCharacter.char;
  document.getElementById("current-zhuyin").textContent = currentCharacter.zhuyin;
  clearCanvas();
}

// 清除畫布
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 畫畫筆
function startDrawing(e) {
  drawing = true;
  [lastX, lastY] = getPosition(e);
}

function draw(e) {
  if (!drawing) return;
  const [x, y] = getPosition(e);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  [lastX, lastY] = [x, y];
}

function stopDrawing() {
  drawing = false;
}

// 計算觸控位置
function getPosition(e) {
  const rect = canvas.getBoundingClientRect();
  return [e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top];
}

// 初始化
nextCharacter();

// 事件綁定
canvas.addEventListener("touchstart", startDrawing, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stopDrawing, false);

// 按鈕事件
document.getElementById("next-char").addEventListener("click", nextCharacter);
document.getElementById("clear-canvas").addEventListener("click", clearCanvas);

  