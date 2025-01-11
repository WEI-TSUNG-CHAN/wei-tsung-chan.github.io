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
  const role = req.query.role || '1';  // 預設為第一將

  // 使用 SQL_NO_CACHE 來禁用 MySQL 查詢快取
  connection.query('SELECT SQL_NO_CACHE * FROM scores WHERE date=CURDATE() AND role = ? ORDER BY role DESC', [role], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving scores');
    }
    res.json(results);
  });
});

// API 取得目前分數
app.get('/api/news', (req, res) => {
  // 使用 SQL_NO_CACHE 來禁用 MySQL 查詢快取
  connection.query('SELECT * FROM scores WHERE date=CURDATE() AND role= (SELECT distinct max(role) FROM scores WHERE date=CURDATE())', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving scores');
    }
    res.json(results);
  });
});

// 分數排行
app.get('/api/rank', (req, res) => {
  const role = req.query.role || '1';  // 預設為第一將

  // 使用 SQL_NO_CACHE 來禁用 MySQL 查詢快取
  connection.query('SELECT team_name, sum(score) as score FROM scores where true group by team_name order by score desc', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving scores');
    }
    res.json(results);
  });
});

// API 更新隊伍名稱或分數
app.post('/api/update', (req, res) => {
  const { id, team_name, score, role } = req.body;

  connection.query(
    'UPDATE scores SET team_name = ?, score = ? WHERE id = ? AND date=CURDATE() AND role = ?',
    [team_name, score, id, role],
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
  const role = req.query.role || '1';  // 預設為第一將

  connection.query(
    'DELETE FROM scores WHERE id = ? AND date=CURDATE() AND role = ?',
    [id, role],
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
  const { team_name, score, role } = req.body;

  connection.query(
    'INSERT INTO scores (team_name, score, date, role) VALUES (?, ?, now(), ?)',
    [team_name, score, role],
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
  const role = req.query.role || '1';  // 預設為第一將

  connection.query(
    'UPDATE scores SET score = 0 WHERE date=CURDATE() AND role = ?', [role],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error resetting scores');
      }
      res.json({ message: 'All scores have been reset to 0' });
    }
  );
});

// 更新風向
app.post('/api/update-direction', (req, res) => {
  const { value } = req.body;

  connection.query(
    'UPDATE directions SET value_name = ? WHERE key_name = "direction"',
    [value],
    (err, results) => {
      if (err) {
        console.error('Error updating direction:', err);
        return res.status(500).send('Error updating direction');
      }

      // 檢查是否有資料被更新
      if (results.affectedRows === 0) {
        return res.status(400).send('No matching key_name found to update');
      }

      res.json({ message: 'Direction updated successfully' });
    }
  );
});

// API 更新莊家
app.post('/api/update-ranker', (req, res) => {
  const { value } = req.body;

  connection.query(
    'UPDATE directions SET value_name = ? WHERE key_name = "ranker"',
    [value],
    (err, results) => {
      if (err) {
        console.error('Error updating ranker:', err);
        return res.status(500).send('Error updating ranker');
      }

      // 檢查是否有資料被更新
      if (results.affectedRows === 0) {
        return res.status(400).send('No matching key_name found to update');
      }

      res.json({ message: 'Ranker updated successfully' });
    }
  );
});

// 顯示directions
app.get('/api/directions', (req, res) => {
  const query = 'SELECT * FROM directions'; // SQL 查詢語句
  connection.query(query, (err, results) => {
    if (err) {
      console.error('資料庫查詢錯誤:', err);
      res.status(500).send('資料庫錯誤');
      return;
    }
    res.json(results); // 將資料回傳為 JSON 格式
  });
});

// 新增 API 儲存日期
app.post('/api/save-date', (req, res) => {
  const { date } = req.body;  // 從請求中獲取傳來的日期

  if (!date) {
    return res.status(400).send('日期是必須的');
  }

  // 更新 directions 表中的 today 欄位
  connection.query(
    'UPDATE directions SET value_name = ? WHERE key_name = "today"',
    [date],
    (err, results) => {
      if (err) {
        console.error('Error updating today date:', err);
        return res.status(500).send('Error updating today date');
      }

      // 檢查是否有資料被更新
      if (results.affectedRows === 0) {
        return res.status(400).send('No matching key_name found to update');
      }

      res.json({ message: 'Today date updated successfully' });
    }
  );
});

// 新增 API 取得目前設定的日期
app.get('/api/get-today', (req, res) => {
  // 查詢 directions 表中的 today 欄位
  connection.query(
    'SELECT value_name FROM directions WHERE key_name = "today"',
    (err, results) => {
      if (err) {
        console.error('Error retrieving today date:', err);
        return res.status(500).send('Error retrieving today date');
      }

      // 如果沒有設定過日期，則回傳 null
      if (results.length === 0) {
        return res.json({ date: null });
      }

      // 回傳目前的日期設定
      res.json({ date: results[0].value_name });
    }
  );
});




// 啟動伺服器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
