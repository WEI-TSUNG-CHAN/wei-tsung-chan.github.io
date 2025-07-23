const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '730817',
  database: 'mahjong'
};

const pool = mysql.createPool(dbConfig);

function sendResponse(res, statusCode, data, contentType = 'application/json') {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(data);
}

function serveStaticFile(req, res) {
  let parsedUrl = url.parse(req.url);
  let pathname = `${parsedUrl.pathname}`;
  if (pathname === '/') pathname = '/index.html';
  const filepath = path.join(__dirname, 'public', pathname);
  fs.stat(filepath, (err, stats) => {
    if (err || !stats.isFile()) {
      sendResponse(res, 404, 'File Not Found', 'text/plain');
    } else {
      const ext = path.extname(filepath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json'
      };
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      fs.readFile(filepath, (err, content) => {
        if (err) {
          sendResponse(res, 500, 'Server Error', 'text/plain');
        } else {
          sendResponse(res, 200, content, contentType);
        }
      });
    }
  });
}

function getStats(req, res) {
  const query = url.parse(req.url, true).query;
  const date = query.date;
  const roundNumber = parseInt(query.round_number, 10);

  if (!date) {
    sendResponse(res, 400, JSON.stringify({ error: 'Missing date' }));
    return;
  }

  let sql = `
    SELECT player_name,
           SUM(score) AS total_score,
           SUM(zi) AS total_zi,
           SUM(hu) AS total_hu,
           SUM(qiang) AS total_qiang
    FROM player_records
    WHERE date = ?
  `;

  const params = [date];

  if (roundNumber) {
    sql += ' AND round_number = ?';
    params.push(roundNumber);
  }

  sql += ' GROUP BY player_name';

  pool.query(sql, params, (err, results) => {
    if (err) {
      sendResponse(res, 500, JSON.stringify({ error: 'Database query error' }));
    } else {
      sendResponse(res, 200, JSON.stringify(results || []));
    }
  });
}

function getMonthlyStats(req, res) {
  const query = url.parse(req.url, true).query;
  const date = query.date; // yyyy-mm-dd

  if (!date) {
    sendResponse(res, 400, JSON.stringify({ error: 'Missing date' }));
    return;
  }

  const month = date.slice(0, 7); // yyyy-mm

  const sql = `
    SELECT player_name,
           SUM(score) AS total_score,
           SUM(zi) AS total_zi,
           SUM(hu) AS total_hu,
           SUM(qiang) AS total_qiang,
          COUNT(DISTINCT date,round_number) as round_number
    FROM player_records
    WHERE DATE_FORMAT(date, '%Y-%m') = ?
    GROUP BY player_name
    ORDER BY total_score DESC
    LIMIT 10
  `;

  pool.query(sql, [month], (err, results) => {
    if (err) {
      sendResponse(res, 500, JSON.stringify({ error: 'DB error' }));
    } else {
      sendResponse(res, 200, JSON.stringify(results || []));
    }
  });
}

function recordGame(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk.toString(); });
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      const date = data.date;
      const roundNumber = parseInt(data.round_number, 10);
      const players = data.players;
      if (!date || !Array.isArray(players) || players.length !== 4) {
        sendResponse(res, 400, JSON.stringify({ error: 'Invalid data format' }));
        return;
      }
      const insertSql = `
        INSERT INTO player_records (date, round_number, player_name, score, zi, hu, qiang)
        VALUES ${players.map(() => '(?, ?, ?, ?, ?, ?, ?)').join(',')}
      `;
      const values = players.flatMap(p => [date, roundNumber, p.name, p.score, p.zi, p.hu, p.qiang]);
      pool.query(insertSql, values, err => {
        if (err) {
          console.error('DB insert failed:', err);
          sendResponse(res, 500, JSON.stringify({ error: 'Database insert error' }));
        } else {
          sendResponse(res, 200, JSON.stringify({ success: true }));
        }
      });
    } catch (e) {
      sendResponse(res, 400, JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
}

function getAllDirections(req, res) {
  const sql = 'SELECT * FROM directions';
  pool.query(sql, (err, results) => {
    if (err) {
      sendResponse(res, 500, JSON.stringify({ error: 'DB read error' }));
    } else {
      sendResponse(res, 200, JSON.stringify(results || []));
    }
  });
}

function updateDirection(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk.toString(); });
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      if (!data.key_name || !data.value_name) {
        sendResponse(res, 400, JSON.stringify({ error: 'Missing key or value' }));
        return;
      }
      const sql = 'REPLACE INTO directions (key_name, value_name) VALUES (?, ?)';
      pool.query(sql, [data.key_name, data.value_name], err => {
        if (err) {
          console.error('REPLACE failed:', err);
          sendResponse(res, 500, JSON.stringify({ error: 'DB replace error' }));
        } else {
          sendResponse(res, 200, JSON.stringify({ success: true }));
        }
      });
    } catch (e) {
      sendResponse(res, 400, JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (req.method === 'GET' && parsedUrl.pathname === '/directions/all') {
    getAllDirections(req, res);
  } else if (req.method === 'POST' && parsedUrl.pathname === '/directions') {
    updateDirection(req, res);
  } else if (req.method === 'GET' && parsedUrl.pathname === '/stats') {
    getStats(req, res);
  } else if (req.method === 'GET' && parsedUrl.pathname === '/stats/month') {
    getMonthlyStats(req, res);
  } else if (req.method === 'POST' && parsedUrl.pathname === '/record') {
    recordGame(req, res);
  } else if (req.method === 'GET' && parsedUrl.pathname === '/challenge') {
    getRandomChallenge(req, res);
  } else if (req.method === 'GET' && parsedUrl.pathname === '/challenge/all') {
    getAllChallenges(req, res);
  } else if (req.method === 'POST' && parsedUrl.pathname === '/challenge/reset') {
    resetAllChallenges(req, res);
  } else if (req.method === 'GET' && parsedUrl.pathname === '/challenge/current') {
    getCurrentChallenge(req, res);
  } else if (req.method === 'GET' && parsedUrl.pathname === '/get-mahjong-data') {
    getMahjongData(req, res);
  } else if (req.method === 'POST' && parsedUrl.pathname === '/calculate/active') {
    getCalActive(req, res);
  } else if (req.method === 'POST' && parsedUrl.pathname === '/submit') {
    submitMahjongResults(req, res);
  } else {
    serveStaticFile(req, res);
  }
});

function getRandomChallenge(req, res) {
  const sql = `
    SELECT id, question FROM challenge_questions
    ORDER BY RAND()
    LIMIT 1
  `;

  pool.query(sql, (err, results) => {
    if (err || results.length === 0) {
      return sendResponse(res, 500, JSON.stringify({ error: 'DB error or no question' }));
    }

    const { id, question } = results[0];

    // 更新所有題目為未選中，然後將目前這一題設為 true
    const resetSql = `UPDATE challenge_questions SET used = FALSE`;
    const setSelectedSql = `UPDATE challenge_questions SET used = TRUE WHERE id = ?`;

    pool.query(resetSql, (err1) => {
      if (err1) {
        console.error('重設 used 欄失敗:', err1);
        return sendResponse(res, 500, JSON.stringify({ error: 'DB reset error' }));
      }

      pool.query(setSelectedSql, [id], (err2) => {
        if (err2) {
          console.error('標記目前選定題目失敗:', err2);
        }
        return sendResponse(res, 200, JSON.stringify({ question }));
      });
    });
  });
}

function getAllChallenges(req, res) {
  const sql = `SELECT id, question, used FROM challenge_questions ORDER BY id ASC`;
  pool.query(sql, (err, results) => {
    if (err) {
      sendResponse(res, 500, JSON.stringify({ error: 'DB query failed' }));
    } else {
      sendResponse(res, 200, JSON.stringify(results || []));
    }
  });
}

function resetAllChallenges(req, res) {
  const sql = `UPDATE challenge_questions SET used = FALSE`;
  pool.query(sql, (err) => {
    if (err) {
      sendResponse(res, 500, JSON.stringify({ error: 'Reset failed' }));
    } else {
      sendResponse(res, 200, JSON.stringify({ success: true }));
    }
  });
}
function getCurrentChallenge(req, res) {
  const sql = `SELECT question FROM challenge_questions WHERE used = TRUE LIMIT 1`;
  pool.query(sql, (err, results) => {
    if (err || results.length === 0) {
      return sendResponse(res, 200, JSON.stringify({ question: '' }));
    }
    return sendResponse(res, 200, JSON.stringify({ question: results[0].question }));
  });
}



// 取得所有牌型資料並根據台數排序
function getMahjongData(req, res) {
  const sql = 'SELECT * FROM calculate ORDER BY tie ASC';
  pool.query(sql, (err, results) => {
    if (err) {
      sendResponse(res, 500, JSON.stringify({ error: 'Database query error' }));
    } else {
      sendResponse(res, 200, JSON.stringify(results || []));
    }
  });
}

// 提交計算結果並更新資料庫
function submitMahjongResults(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk.toString(); });
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

      // 更新所有資料的 flag 和 now 欄位為 NULL
      const resetSql = 'UPDATE calculate SET flag = NULL, now = NULL';
      pool.query(resetSql, (err) => {
        if (err) {
          sendResponse(res, 500, JSON.stringify({ error: 'Failed to reset flag' }));
          return;
        }

        // 更新選中的牌型資料
        data.forEach(item => {
          const updateSql = 'UPDATE calculate SET flag = 1, now = ? WHERE type = ?';
          pool.query(updateSql, [currentTime, item.type], (err) => {
            if (err) {
              console.error('Update failed for type:', item.type, err);
            }
          });
        });

        sendResponse(res, 200, JSON.stringify({ message: '提交成功' }));
      });
    } catch (e) {
      sendResponse(res, 400, JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
}

// 顯示台數結果
function getCalActive(req, res) {
  const sql = 'SELECT type,tie,now FROM calculate where flag=1 ORDER BY tie ASC';
  pool.query(sql, (err, results) => {
    if (err) {
      sendResponse(res, 500, JSON.stringify({ error: 'Database query error' }));
    } else {
      sendResponse(res, 200, JSON.stringify(results || []));
    }
  });
}


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
