// 開啟側邊欄
function openNav() {
  document.getElementById("sidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

// 關閉側邊欄
function closeNav() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

// 樹狀目錄切換功能
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
      const nestedList = this.parentNode.querySelector('.nested');
      const isVisible = nestedList.style.display === 'block';

      // 切換顯示/隱藏
      if (isVisible) {
          nestedList.style.display = 'none';
          this.textContent = '+'; // 顯示收摺符號
      } else {
          nestedList.style.display = 'block';
          this.textContent = '-'; // 顯示展開符號
      }
      e.stopPropagation(); // 防止事件冒泡
  });
});
