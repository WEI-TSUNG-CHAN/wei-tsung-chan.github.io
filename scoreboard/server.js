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

// API 取得目前分數
app.get('/api/scores', (req, res) => {
  connection.query('SELECT * FROM scores', (err, results) => {
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
    'UPDATE scores SET team_name = ?, score = ? WHERE id = ?',
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
    'DELETE FROM scores WHERE id = ?',
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
    'INSERT INTO scores (team_name, score) VALUES (?, ?)',
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
    'UPDATE scores SET score = 0', // 將所有隊伍的分數更新為 0
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
