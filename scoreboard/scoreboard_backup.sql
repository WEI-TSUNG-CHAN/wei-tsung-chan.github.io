-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: scoreboard
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `directions`
--

DROP TABLE IF EXISTS `directions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `directions` (
  `key_name` varchar(50) NOT NULL,
  `value_name` varchar(255) NOT NULL,
  PRIMARY KEY (`key_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directions`
--

LOCK TABLES `directions` WRITE;
/*!40000 ALTER TABLE `directions` DISABLE KEYS */;
INSERT INTO `directions` VALUES ('direction','東'),('ranker','莊1'),('tie_conut','底5台2'),('times','0'),('today','2025-06-06');
/*!40000 ALTER TABLE `directions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `team_name` varchar(100) NOT NULL,
  `score` int NOT NULL,
  `date` date NOT NULL,
  `role` int DEFAULT '1',
  `times` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
INSERT INTO `scores` VALUES (9,'老王',28,'2025-06-01',1,0),(10,'莎菈',-102,'2025-06-01',1,0),(11,'閃亮',39,'2025-06-01',1,0),(12,'老詹',35,'2025-06-01',1,0),(13,'老詹',-20,'2025-06-01',2,0),(14,'閃亮',-77,'2025-06-01',2,0),(15,'莎菈',10,'2025-06-01',2,0),(16,'老王',87,'2025-06-01',2,0),(17,'小龍',72,'2025-06-01',3,0),(18,'莎菈',-84,'2025-06-01',3,0),(19,'老王',-78,'2025-06-01',3,0),(20,'胖澤',90,'2025-06-01',3,0),(21,'莎菈',92,'2025-06-01',4,0),(22,'老王',31,'2025-06-01',4,0),(23,'老詹',-117,'2025-06-01',4,0),(24,'閃亮',-6,'2025-06-01',4,0);
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores_history`
--

DROP TABLE IF EXISTS `scores_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scores_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `team_name` varchar(100) NOT NULL,
  `score` int NOT NULL,
  `direction` varchar(50) DEFAULT NULL,
  `ranker` varchar(50) DEFAULT NULL,
  `times` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores_history`
--

LOCK TABLES `scores_history` WRITE;
/*!40000 ALTER TABLE `scores_history` DISABLE KEYS */;
INSERT INTO `scores_history` VALUES (1,'老詹',33,'東','莊4','0','2025-06-06 07:03:42'),(2,'老詹',33,'東','莊4','0','2025-06-06 07:03:42'),(3,'小龍',-32,'東','莊4','0','2025-06-06 07:07:22'),(4,'小龍',-32,'東','莊4','0','2025-06-06 07:07:22'),(5,'嫚嫚',-33,'東','莊4','0','2025-06-06 07:07:27'),(6,'嫚嫚',-33,'東','莊4','0','2025-06-06 07:07:27'),(7,'苦瓜',54,'東','莊4','0','2025-06-06 07:07:32'),(8,'苦瓜',54,'東','莊4','0','2025-06-06 07:07:32'),(9,'老詹',0,'東','莊1','0','2025-06-06 07:08:47'),(10,'老王',28,'東','莊1','0','2025-06-06 07:08:52'),(11,'閃亮',-102,'東','莊1','0','2025-06-06 07:08:52'),(12,'莎菈',-102,'東','莊1','0','2025-06-06 07:08:57'),(13,'閃亮',39,'東','莊1','0','2025-06-06 07:09:02'),(14,'老詹',35,'東','莊1','0','2025-06-06 07:09:07'),(15,'老詹',0,'東','莊1','0','2025-06-06 07:09:27'),(16,'閃亮',0,'東','莊1','0','2025-06-06 07:09:32'),(17,'莎菈',0,'東','莊1','0','2025-06-06 07:09:32'),(18,'老王',0,'東','莊1','0','2025-06-06 07:09:37'),(19,'閃亮',-77,'東','莊1','0','2025-06-06 07:09:47'),(20,'老王',87,'東','莊1','0','2025-06-06 07:10:17'),(21,'老詹',-20,'東','莊1','0','2025-06-06 07:10:24'),(22,'閃亮',-77,'東','莊1','0','2025-06-06 07:10:24'),(23,'莎菈',10,'東','莊1','0','2025-06-06 07:10:24'),(24,'老王',87,'東','莊1','0','2025-06-06 07:10:24'),(25,'小龍',0,'東','莊1','0','2025-06-06 07:10:47'),(26,'老王',0,'東','莊1','0','2025-06-06 07:10:52'),(27,'小龍',72,'東','莊1','0','2025-06-06 07:11:02'),(28,'莎菈',-84,'東','莊1','0','2025-06-06 07:11:07'),(29,'老王',-78,'東','莊1','0','2025-06-06 07:11:12'),(30,'胖澤',90,'東','莊1','0','2025-06-06 07:11:17'),(31,'小龍',72,'東','莊1','0','2025-06-06 07:11:24'),(32,'莎菈',-84,'東','莊1','0','2025-06-06 07:11:24'),(33,'老王',-78,'東','莊1','0','2025-06-06 07:11:24'),(34,'胖澤',90,'東','莊1','0','2025-06-06 07:11:24'),(35,'莎菈',0,'東','莊1','0','2025-06-06 07:11:32'),(36,'老王',0,'東','莊1','0','2025-06-06 07:11:42'),(37,'閃亮',0,'東','莊1','0','2025-06-06 07:11:42'),(38,'莎菈',92,'東','莊1','0','2025-06-06 07:11:47'),(39,'老王',31,'東','莊1','0','2025-06-06 07:11:52'),(40,'老詹',-117,'東','莊1','0','2025-06-06 07:11:57'),(41,'莎菈',92,'東','莊1','0','2025-06-06 07:12:24'),(42,'老王',31,'東','莊1','0','2025-06-06 07:12:24'),(43,'老詹',-117,'東','莊1','0','2025-06-06 07:12:24'),(44,'閃亮',-6,'東','莊1','0','2025-06-06 07:12:24'),(45,'老王',7,'東','莊1','0','2025-06-06 07:14:07'),(46,'小龍',-7,'東','莊1','0','2025-06-06 07:14:07'),(47,'老詹',33,'東','莊1','0','2025-06-06 07:14:07'),(48,'胖澤',0,'東','莊1','0','2025-06-06 07:14:07');
/*!40000 ALTER TABLE `scores_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-06 15:28:32
