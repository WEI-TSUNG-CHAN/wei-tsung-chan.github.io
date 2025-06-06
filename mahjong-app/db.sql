-- Create the mahjong database and player_records table
CREATE DATABASE IF NOT EXISTS mahjong CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mahjong;

CREATE TABLE IF NOT EXISTS player_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  player_name VARCHAR(50) NOT NULL,
  score INT NOT NULL,
  zi INT NOT NULL,
  hu INT NOT NULL,
  qiang INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
