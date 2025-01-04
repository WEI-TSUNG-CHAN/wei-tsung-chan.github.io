const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// MySQL 資料庫連線設定
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '730817', // 請填入你的資料庫密碼
  database: 'scoreboard',
});

// 使用 body-parser 解析 POST 請求中的 JSON 資料
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 設置靜態文件夾（假設 HTML 檔案位於 'public' 資料夾中）
app.use(express.static(path.join(__dirname, 'public')));

// 禁用所有 API 的快取，並設置 Cache-Control 標頭
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// API 取得目前分數
app.get('/api/scores', (req, res) => {
  // 使用 SQL_NO_CACHE 來禁用 MySQL 查詢快取
  connection.query('SELECT SQL_NO_CACHE * FROM scores where date=CURDATE()', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving scores');
    }
    res.json(results);
  });
});

// 分數排行
app.get('/api/rank', (req, res) => {
  // 使用 SQL_NO_CACHE 來禁用 MySQL 查詢快取
  connection.query('SELECT team_name, sum(score) as score FROM scores where substring(date,1,7)= substring(CURDATE(),1,7) group by team_name order by score desc', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving scores');
    }
    res.json(results);
  });
});

// API 更新隊伍名稱或分數
app.post('/api/update', (req, res) => {
  const { id, team_name, score } = req.body;

  connection.query(
    'UPDATE scores SET team_name = ?, score = ? WHERE id = ? and date=CURDATE()',
    [team_name, score, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error updating score');
      }
      res.json({ message: 'Score updated successfully' });
    }
  );
});

// API 刪除隊伍
app.delete('/api/delete/:id', (req, res) => {
  const { id } = req.params;

  connection.query(
    'DELETE FROM scores WHERE id = ? and date=CURDATE()',
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error deleting team');
      }
      res.json({ message: 'Team deleted successfully' });
    }
  );
});

// API 新增隊伍
app.post('/api/add', (req, res) => {
  const { team_name, score } = req.body;

  connection.query(
    'INSERT INTO scores (team_name, score, date) VALUES (?, ?, now())',
    [team_name, score],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error adding team');
      }
      res.json({ message: 'Team added successfully' });
    }
  );
});

// API 將所有分數歸0
app.post('/api/reset-scores', (req, res) => {
  connection.query(
    'UPDATE scores SET score = 0 where date=CURDATE()', // 將所有隊伍的分數更新為 0
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error resetting scores');
      }
      res.json({ message: 'All scores have been reset to 0' });
    }
  );
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
