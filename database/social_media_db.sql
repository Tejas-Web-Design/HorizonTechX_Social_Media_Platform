CREATE DATABASE  IF NOT EXISTS `social_media_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `social_media_db`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: social_media_db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,10,'Great work! ?','2026-07-09 04:33:22'),(2,8,10,'Very informative, thanks for sharing.','2026-07-09 04:33:54'),(3,3,10,'Keep it up! ?','2026-07-09 04:34:17'),(4,19,9,'Thanks for sharing your experience.','2026-07-09 05:28:10'),(5,17,9,'Amazing explanation!','2026-07-09 05:28:33'),(6,16,9,'That\'s really inspiring','2026-07-09 05:28:52'),(7,15,9,'Completely agree with you.','2026-07-09 05:29:15');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `follower_id` int NOT NULL,
  `following_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `follower_id` (`follower_id`,`following_id`),
  KEY `following_id` (`following_id`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (1,10,1,'2026-07-09 04:31:56'),(2,10,2,'2026-07-09 04:32:04'),(3,10,3,'2026-07-09 04:32:05'),(4,10,9,'2026-07-09 04:32:10'),(5,1,10,'2026-07-09 05:11:29'),(6,1,9,'2026-07-09 05:11:31'),(7,1,3,'2026-07-09 05:11:37'),(8,2,4,'2026-07-09 05:13:58'),(9,2,10,'2026-07-09 05:14:07'),(10,2,6,'2026-07-09 05:14:09'),(11,3,5,'2026-07-09 05:16:07'),(12,3,1,'2026-07-09 05:16:18'),(13,3,9,'2026-07-09 05:16:21'),(14,4,2,'2026-07-09 05:19:19'),(15,4,10,'2026-07-09 05:19:22'),(16,5,1,'2026-07-09 05:20:33'),(17,5,6,'2026-07-09 05:20:35'),(18,6,3,'2026-07-09 05:21:31'),(19,6,1,'2026-07-09 05:21:32'),(20,6,10,'2026-07-09 05:21:36'),(22,7,6,'2026-07-09 05:23:04'),(23,7,10,'2026-07-09 05:23:07'),(24,8,5,'2026-07-09 05:25:43'),(25,8,9,'2026-07-09 05:25:45'),(26,9,8,'2026-07-09 05:26:55'),(27,9,5,'2026-07-09 05:26:59');
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_id` (`post_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,4,10,'2026-07-09 04:42:39'),(2,3,10,'2026-07-09 04:42:44'),(3,9,10,'2026-07-09 04:42:51'),(4,10,3,'2026-07-09 05:16:53'),(5,11,3,'2026-07-09 05:16:55'),(6,8,3,'2026-07-09 05:17:02'),(7,16,9,'2026-07-09 05:28:53'),(8,15,9,'2026-07-09 05:29:16'),(9,14,9,'2026-07-09 05:29:18'),(10,13,9,'2026-07-09 05:29:21'),(11,12,9,'2026-07-09 05:29:22'),(12,11,9,'2026-07-09 05:29:23'),(13,10,9,'2026-07-09 05:29:26'),(14,9,9,'2026-07-09 05:29:28'),(15,8,9,'2026-07-09 05:29:29'),(16,7,9,'2026-07-09 05:29:30'),(17,5,9,'2026-07-09 05:29:35'),(18,6,9,'2026-07-09 05:29:37'),(19,4,9,'2026-07-09 05:29:38'),(20,3,9,'2026-07-09 05:29:40'),(21,2,9,'2026-07-09 05:29:42'),(22,1,9,'2026-07-09 05:29:44');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `caption` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,'Successfully completed my REST API project using Node.js and Express! ?',NULL,'2026-07-09 03:51:54'),(2,2,'Designing clean and accessible interfaces is just as important as writing good code. ?',NULL,'2026-07-09 03:55:36'),(3,3,'React + Express + MySQL is a powerful combination for full-stack applications.',NULL,'2026-07-09 03:57:48'),(4,4,'Every picture tells a story. Captured another beautiful sunset today. ??',NULL,'2026-07-09 04:00:51'),(5,5,'AI isn\'t replacing developers; it\'s helping them become more productive.',NULL,'2026-07-09 04:07:20'),(6,6,'Consistency beats motivation every single day.',NULL,'2026-07-09 04:13:45'),(7,7,'Docker makes deployment so much easier.',NULL,'2026-07-09 04:18:53'),(8,8,'Ethical hacking is about protecting systems, not breaking them.',NULL,'2026-07-09 04:23:27'),(9,9,'User experience is just as important as app performance.',NULL,'2026-07-09 04:26:30'),(10,10,'Excited to complete my SocialConnect project! Authentication, likes, comments, followers, and profile management are finally working perfectly. ?',NULL,'2026-07-09 04:28:44'),(11,10,'Learning something new every day. Today\'s focus: Express.js middleware and JWT authentication. ?',NULL,'2026-07-09 05:02:27'),(12,1,'? REST APIs become much easier once you understand resources and HTTP methods and Debugging isn\'t a problem—it\'s part of becoming a better developer.',NULL,'2026-07-09 05:11:01'),(13,2,'A beautiful interface creates a great first impression. Design matters.Minimal design with smooth animations always wins. ✨',NULL,'2026-07-09 05:13:34'),(14,3,'Built a complete CRUD application using React, Express, Node.js, and MySQL. ?Every bug teaches something valuable.',NULL,'2026-07-09 05:15:59'),(15,4,'Nature is the best artist. Capture moments, not things. ?',NULL,'2026-07-09 05:19:09'),(16,5,'Started learning neural networks today. Amazing technology!',NULL,'2026-07-09 05:20:25'),(17,6,'Small improvements every day lead to huge success.',NULL,'2026-07-09 05:21:20'),(18,7,'Exploring AWS services today. Learning never stops!',NULL,'2026-07-09 05:22:53'),(19,8,'Strong passwords and MFA are simple steps that improve security. ?',NULL,'2026-07-09 05:25:35'),(20,9,'Flutter makes cross-platform development enjoyable.',NULL,'2026-07-09 05:26:48');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` text,
  `profile_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ravi ','ravi@gmail.com','$2b$10$WoP09Ww9B7lO9nNBwH1ZW.eXR2LjO2bRPtITZP8484LvhMJ/qzP9q','Java Backend Developer ☕','1783569080003-Ravi.png','2026-07-09 03:37:05'),(2,'Priya','priya@gmail.com','$2b$10$M2A5mRps52/axDqUacDbIeh1tdo.2/siGQHMQtC4uw/k6J/rREifW','UI/UX Designer ?','1783569255864-Priya.png','2026-07-09 03:53:06'),(3,'Arjun','arjun@gmail.com','$2b$10$vckEi6QalyfEuqetzNLU2OfWf7oREYyRp1O.BphIqHQpZDyQBAl/2','MERN Stack Developer ⚡','1783569442035-Arjun.png','2026-07-09 03:56:28'),(4,'Sneha','sneha@gmail.com','$2b$10$emXS.0BZVhzgAumEEFpnhuNVKvljpK5olQbHMbRQIz.OL7qkmk92.','Photographer ?','1783569631214-Sneha.png','2026-07-09 03:59:16'),(5,'Kiran','kiran@gmail.com','$2b$10$j4n/rfRoWfwIfg2TDXVB7epMZtU1xrU2ksIAyVkZwxyJd5mHD8tYu','AI & Machine Learning Enthusiast ?','1783569838790-Kiran.png','2026-07-09 04:03:05'),(6,'Neha','neha@gmail.com','$2b$10$QlnQhln87aReJxlRN7uj/.KGGHCfzk/29NcIKaLj1hocHwIolZPDO','Software Engineer ?','1783570404219-Neha.png','2026-07-09 04:11:02'),(7,'Rahul','rahul@gmail.com','$2b$10$qtzJ1a/UMy3docG9oRBE1OmBGv6w4GluGqDjyqxQyNxhuqU8HdqvC','Cloud Computing Enthusiast ☁️','1783570707115-Rahul.png','2026-07-09 04:16:00'),(8,'Anjali','anjali@gmail.com','$2b$10$11zdf.2Ado0UxdEoP8mjo.kGRPLcYMj9c66Q0cXIOSk0FgnleTSN2','Cybersecurity Learner ?','1783570975330-Anjali.png','2026-07-09 04:20:56'),(9,'Vikram','vikram@gmail.com','$2b$10$K6.D3pwxiDmg7T0B/cOPjeqS06qulKL/S6Mt8lyw2hsvXesYjHGsK','Mobile App Developer ?','1783571168759-Vikram.png','2026-07-09 04:24:31'),(10,'Tejasri','tejasri@gmail.com','$2b$10$UK9GGUZRgisJMKjAWquT3eUkttRfUTMrBfAh51bIjgdvAkm7cmvMm','Full Stack Developer | Passionate about Web Development ?','1783571303051-Tejasri.png','2026-07-09 04:27:31');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-09 12:16:31
