const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');


const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '730817', // Update with your MySQL root password
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
  const year = parseInt(query.year, 10);
  const month = parseInt(query.month, 10);
  if (!year || !month) {
    sendResponse(res, 400, JSON.stringify({ error: 'Missing year or month' }));
    return;
  }
  const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
  const endDate = new Date(year, month, 0).toISOString().slice(0, 10);

  const sql = `
    SELECT player_name,
           SUM(score) AS total_score,
           SUM(zi) AS total_zi,
           SUM(hu) AS total_hu,
           SUM(qiang) AS total_qiang
    FROM player_records
    WHERE date BETWEEN ? AND ?
    GROUP BY player_name
  `;
  pool.query(sql, [startDate, endDate], (err, results) => {
    if (err) {
      sendResponse(res, 500, JSON.stringify({ error: 'Database query error' }));
    } else {
      // 保險檢查 results 是否為陣列
      if (Array.isArray(results) && results.length > 0) {
        sendResponse(res, 200, JSON.stringify(results));
      } else {
        // 查無資料，回傳空陣列
        sendResponse(res, 200, JSON.stringify([]));
      }
    }
  });

}

function recordGame(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      const date = data.date;
      const players = data.players; // Array of { name, score, zi, hu, qiang }
      if (!date || !Array.isArray(players) || players.length !== 4) {
        sendResponse(res, 400, JSON.stringify({ error: 'Invalid data format' }));
        return;
      }
      const insertSql = `
  INSERT INTO player_records (date, player_name, score, zi, hu, qiang)
  VALUES ${players.map(() => '(?, ?, ?, ?, ?, ?)').join(',')}
`;

      const values = players.flatMap(p => [date, p.name, p.score, p.zi, p.hu, p.qiang]);

      pool.query(insertSql, values, (err) => {
        if (err) {
          console.error('DB insert failed:', err);  // 加這行幫你看錯誤
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

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (req.method === 'GET' && parsedUrl.pathname === '/stats') {
    getStats(req, res);
  } else if (req.method === 'POST' && parsedUrl.pathname === '/record') {
    recordGame(req, res);
  } else {
    serveStaticFile(req, res);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
