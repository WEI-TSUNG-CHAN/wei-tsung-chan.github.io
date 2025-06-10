-- Create the mahjong database and player_records table
CREATE DATABASE IF NOT EXISTS mahjong CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mahjong;

CREATE TABLE `player_records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `player_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `score` int NOT NULL,
  `zi` int NOT NULL,
  `hu` int NOT NULL,
  `qiang` int NOT NULL,
  `round_number` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `directions` (
  `key_name` varchar(50) NOT NULL,
  `value_name` varchar(255) NOT NULL,
  PRIMARY KEY (`key_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
SELECT * FROM mahjong.directions;