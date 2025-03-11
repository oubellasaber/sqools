-- MySQL dump 10.13  Distrib 8.3.0, for Win64 (x86_64)
--
-- Host: localhost    Database: sqools
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `absence`
--

DROP TABLE IF EXISTS `absence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `absence` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `personne_id` int unsigned NOT NULL,
  `filiere_modele_matiere_id` int unsigned NOT NULL,
  `date_absence` date NOT NULL,
  `justifie` tinyint(1) NOT NULL DEFAULT '0',
  `justification` text,
  PRIMARY KEY (`id`),
  KEY `personne_id` (`personne_id`),
  KEY `filiere_modele_matiere_id` (`filiere_modele_matiere_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absence`
--

LOCK TABLES `absence` WRITE;
/*!40000 ALTER TABLE `absence` DISABLE KEYS */;
INSERT INTO `absence` VALUES (1,1,1,'2025-09-25',1,'Certificat médical fourni'),(2,2,1,'2025-09-28',0,NULL),(3,3,2,'2025-10-02',1,'Rendez-vous administratif'),(4,4,2,'2025-11-06',0,NULL),(5,5,3,'2025-12-07',1,'Maladie déclarée avec justificatif'),(6,6,3,'2025-12-27',0,NULL);
/*!40000 ALTER TABLE `absence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int unsigned NOT NULL,
  `date_ajoute` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_room`
--

DROP TABLE IF EXISTS `class_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_room` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `capacite` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_room`
--

LOCK TABLES `class_room` WRITE;
/*!40000 ALTER TABLE `class_room` DISABLE KEYS */;
INSERT INTO `class_room` VALUES (1,'B01C01',30),(2,'B01C02',25),(3,'B01C03',35),(4,'B01C04',40),(5,'B01C05',25),(6,'B01C06',35),(7,'B01C07',35),(8,'B01C08',20),(9,'B01C09',30),(10,'B01C10',25);
/*!40000 ALTER TABLE `class_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classe`
--

DROP TABLE IF EXISTS `classe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classe` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `filiere_id` int unsigned NOT NULL,
  `semestre_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `filiere_id` (`filiere_id`),
  KEY `semestre_id` (`semestre_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classe`
--

LOCK TABLES `classe` WRITE;
/*!40000 ALTER TABLE `classe` DISABLE KEYS */;
INSERT INTO `classe` VALUES (1,'GI',1,1),(2,'GI',1,2);
/*!40000 ALTER TABLE `classe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departement`
--

DROP TABLE IF EXISTS `departement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departement` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departement`
--

LOCK TABLES `departement` WRITE;
/*!40000 ALTER TABLE `departement` DISABLE KEYS */;
INSERT INTO `departement` VALUES (1,'departement genie informatique');
/*!40000 ALTER TABLE `departement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eleve`
--

DROP TABLE IF EXISTS `eleve`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eleve` (
  `id` int unsigned NOT NULL,
  `filiere_id` int unsigned DEFAULT NULL,
  `promotion_annee` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `filiere_id` (`filiere_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eleve`
--

LOCK TABLES `eleve` WRITE;
/*!40000 ALTER TABLE `eleve` DISABLE KEYS */;
INSERT INTO `eleve` VALUES (1,1,2025),(2,1,2025),(3,1,2025),(4,1,2025),(5,1,2025),(6,1,2025),(7,1,2025),(8,1,2025),(9,1,2025),(10,1,2025),(11,1,2025),(12,1,2025),(13,1,2025),(14,1,2025),(15,1,2025),(16,1,2025),(17,1,2025),(18,1,2025),(19,1,2025),(20,1,2025);
/*!40000 ALTER TABLE `eleve` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eleve_classe`
--

DROP TABLE IF EXISTS `eleve_classe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eleve_classe` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `eleve_id` int unsigned NOT NULL,
  `section_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `eleve_id` (`eleve_id`),
  KEY `section_id` (`section_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eleve_classe`
--

LOCK TABLES `eleve_classe` WRITE;
/*!40000 ALTER TABLE `eleve_classe` DISABLE KEYS */;
INSERT INTO `eleve_classe` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,1),(5,5,1),(6,6,1),(7,7,1),(8,8,1),(9,9,1),(10,10,1),(11,11,1),(12,12,1),(13,13,1),(14,14,1),(15,15,1),(16,16,1),(17,17,1),(18,18,1),(19,19,1),(20,20,1);
/*!40000 ALTER TABLE `eleve_classe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filiere`
--

DROP TABLE IF EXISTS `filiere`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filiere` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `date_ajoute` date NOT NULL DEFAULT (curdate()),
  `annee_ajout` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filiere`
--

LOCK TABLES `filiere` WRITE;
/*!40000 ALTER TABLE `filiere` DISABLE KEYS */;
INSERT INTO `filiere` VALUES (1,'genie informatique','2025-02-26',NULL);
/*!40000 ALTER TABLE `filiere` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filiere_modele`
--

DROP TABLE IF EXISTS `filiere_modele`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filiere_modele` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `filiere_id` int unsigned NOT NULL,
  `modele_id` int unsigned NOT NULL,
  `date_ajoute` date NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`id`),
  KEY `filiere_id` (`filiere_id`),
  KEY `modele_id` (`modele_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filiere_modele`
--

LOCK TABLES `filiere_modele` WRITE;
/*!40000 ALTER TABLE `filiere_modele` DISABLE KEYS */;
INSERT INTO `filiere_modele` VALUES (1,1,1,'2025-02-27'),(2,1,2,'2025-02-27'),(3,1,3,'2025-02-27'),(4,1,4,'2025-02-27');
/*!40000 ALTER TABLE `filiere_modele` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filiere_modele_matiere`
--

DROP TABLE IF EXISTS `filiere_modele_matiere`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filiere_modele_matiere` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `filiere_modele_id` int unsigned NOT NULL,
  `matiere_id` int unsigned NOT NULL,
  `prof_id` int unsigned NOT NULL,
  `classroom_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `filiere_modele_id` (`filiere_modele_id`),
  KEY `matiere_id` (`matiere_id`),
  KEY `prof_id` (`prof_id`),
  KEY `classroom_id` (`classroom_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filiere_modele_matiere`
--

LOCK TABLES `filiere_modele_matiere` WRITE;
/*!40000 ALTER TABLE `filiere_modele_matiere` DISABLE KEYS */;
INSERT INTO `filiere_modele_matiere` VALUES (1,1,1,1,1),(2,1,2,2,2),(3,2,3,3,3),(4,2,4,4,4),(5,3,5,5,5),(6,3,6,6,6),(7,4,7,7,7),(8,4,8,8,8);
/*!40000 ALTER TABLE `filiere_modele_matiere` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matiere`
--

DROP TABLE IF EXISTS `matiere`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matiere` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matiere`
--

LOCK TABLES `matiere` WRITE;
/*!40000 ALTER TABLE `matiere` DISABLE KEYS */;
INSERT INTO `matiere` VALUES (1,'Algorithmique'),(2,'Programmation C'),(3,'Codage numérique et Architecture des ordinateurs'),(4,'Les circuits logiques Informatique industrielle'),(5,'Analyse'),(6,'Algèbre'),(7,'Français'),(8,'Anglais');
/*!40000 ALTER TABLE `matiere` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modele`
--

DROP TABLE IF EXISTS `modele`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modele` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modele`
--

LOCK TABLES `modele` WRITE;
/*!40000 ALTER TABLE `modele` DISABLE KEYS */;
INSERT INTO `modele` VALUES (1,'TEC - Anglais'),(2,'Analyse1 - Algèbre1'),(3,'Algorithmique - Programmation'),(4,'Architecture des ordinateurs');
/*!40000 ALTER TABLE `modele` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `eleve_id` int unsigned NOT NULL,
  `filiere_modele_matiere_id` int unsigned NOT NULL,
  `score` decimal(5,2) NOT NULL,
  `date_evaluation` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `eleve_id` (`eleve_id`),
  KEY `filiere_modele_matiere_id` (`filiere_modele_matiere_id`)
) ENGINE=MyISAM AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
INSERT INTO `note` VALUES (1,1,1,15.35,'2026-01-20'),(2,1,2,16.82,'2026-01-20'),(3,1,3,18.05,'2026-01-21'),(4,1,4,19.80,'2026-01-21'),(5,1,5,16.84,'2026-01-22'),(6,1,6,12.81,'2026-01-22'),(7,1,7,17.52,'2026-01-23'),(8,1,8,13.18,'2026-01-23'),(9,2,1,17.34,'2026-01-20'),(10,2,2,19.15,'2026-01-20'),(11,2,3,15.72,'2026-01-21'),(12,2,4,17.17,'2026-01-21'),(13,2,5,18.68,'2026-01-22'),(14,2,6,13.89,'2026-01-22'),(15,2,7,17.43,'2026-01-23'),(16,2,8,17.47,'2026-01-23'),(17,3,1,15.04,'2026-01-20'),(18,3,2,18.81,'2026-01-20'),(19,3,3,12.93,'2026-01-21'),(20,3,4,12.20,'2026-01-21'),(21,3,5,18.20,'2026-01-22'),(22,3,6,18.43,'2026-01-22'),(23,3,7,17.53,'2026-01-23'),(24,3,8,12.37,'2026-01-23'),(25,4,1,13.27,'2026-01-20'),(26,4,2,17.21,'2026-01-20'),(27,4,3,18.27,'2026-01-21'),(28,4,4,19.69,'2026-01-21'),(29,4,5,15.65,'2026-01-22'),(30,4,6,15.18,'2026-01-22'),(31,4,7,16.97,'2026-01-23'),(32,4,8,19.28,'2026-01-23'),(33,5,1,17.50,'2026-01-20'),(34,5,2,17.68,'2026-01-20'),(35,5,3,15.88,'2026-01-21'),(36,5,4,14.38,'2026-01-21'),(37,5,5,12.25,'2026-01-22'),(38,5,6,14.11,'2026-01-22'),(39,5,7,13.82,'2026-01-23'),(40,5,8,14.74,'2026-01-23'),(41,6,1,12.25,'2026-01-20'),(42,6,2,13.01,'2026-01-20'),(43,6,3,16.33,'2026-01-21'),(44,6,4,14.59,'2026-01-21'),(45,6,5,19.98,'2026-01-22'),(46,6,6,12.14,'2026-01-22'),(47,6,7,12.73,'2026-01-23'),(48,6,8,15.26,'2026-01-23'),(49,7,1,18.12,'2026-01-20'),(50,7,2,16.79,'2026-01-20'),(51,7,3,17.60,'2026-01-21'),(52,7,4,17.63,'2026-01-21'),(53,7,5,15.37,'2026-01-22'),(54,7,6,19.95,'2026-01-22'),(55,7,7,17.63,'2026-01-23'),(56,7,8,16.30,'2026-01-23'),(57,8,1,16.61,'2026-01-20'),(58,8,2,14.15,'2026-01-20'),(59,8,3,16.92,'2026-01-21'),(60,8,4,14.14,'2026-01-21'),(61,8,5,15.96,'2026-01-22'),(62,8,6,17.36,'2026-01-22'),(63,8,7,18.91,'2026-01-23'),(64,8,8,14.50,'2026-01-23'),(65,9,1,19.77,'2026-01-20'),(66,9,2,19.34,'2026-01-20'),(67,9,3,17.38,'2026-01-21'),(68,9,4,16.88,'2026-01-21'),(69,9,5,12.27,'2026-01-22'),(70,9,6,14.73,'2026-01-22'),(71,9,7,16.80,'2026-01-23'),(72,9,8,19.84,'2026-01-23'),(73,10,1,12.80,'2026-01-20'),(74,10,2,16.47,'2026-01-20'),(75,10,3,15.96,'2026-01-21'),(76,10,4,18.37,'2026-01-21'),(77,10,5,16.00,'2026-01-22'),(78,10,6,12.87,'2026-01-22'),(79,10,7,12.34,'2026-01-23'),(80,10,8,19.12,'2026-01-23'),(81,11,1,14.56,'2026-01-20'),(82,11,2,19.44,'2026-01-20'),(83,11,3,17.54,'2026-01-21'),(84,11,4,17.36,'2026-01-21'),(85,11,5,14.20,'2026-01-22'),(86,11,6,14.93,'2026-01-22'),(87,11,7,12.02,'2026-01-23'),(88,11,8,19.31,'2026-01-23'),(89,12,1,16.52,'2026-01-20'),(90,12,2,12.65,'2026-01-20'),(91,12,3,17.69,'2026-01-21'),(92,12,4,14.49,'2026-01-21'),(93,12,5,15.41,'2026-01-22'),(94,12,6,13.54,'2026-01-22'),(95,12,7,17.51,'2026-01-23'),(96,12,8,18.90,'2026-01-23'),(97,13,1,13.97,'2026-01-20'),(98,13,2,17.17,'2026-01-20'),(99,13,3,15.92,'2026-01-21'),(100,13,4,16.10,'2026-01-21'),(101,13,5,12.75,'2026-01-22'),(102,13,6,19.46,'2026-01-22'),(103,13,7,15.02,'2026-01-23'),(104,13,8,12.73,'2026-01-23'),(105,14,1,14.60,'2026-01-20'),(106,14,2,14.80,'2026-01-20'),(107,14,3,18.22,'2026-01-21'),(108,14,4,18.68,'2026-01-21'),(109,14,5,18.76,'2026-01-22'),(110,14,6,17.76,'2026-01-22'),(111,14,7,12.53,'2026-01-23'),(112,14,8,13.35,'2026-01-23'),(113,15,1,17.17,'2026-01-20'),(114,15,2,17.80,'2026-01-20'),(115,15,3,17.51,'2026-01-21'),(116,15,4,14.11,'2026-01-21'),(117,15,5,14.05,'2026-01-22'),(118,15,6,15.92,'2026-01-22'),(119,15,7,17.44,'2026-01-23'),(120,15,8,19.46,'2026-01-23'),(121,16,1,16.97,'2026-01-20'),(122,16,2,14.47,'2026-01-20'),(123,16,3,17.44,'2026-01-21'),(124,16,4,15.77,'2026-01-21'),(125,16,5,14.55,'2026-01-22'),(126,16,6,13.42,'2026-01-22'),(127,16,7,19.45,'2026-01-23'),(128,16,8,13.00,'2026-01-23'),(129,17,1,18.65,'2026-01-20'),(130,17,2,18.24,'2026-01-20'),(131,17,3,15.25,'2026-01-21'),(132,17,4,17.55,'2026-01-21'),(133,17,5,14.01,'2026-01-22'),(134,17,6,13.37,'2026-01-22'),(135,17,7,12.81,'2026-01-23'),(136,17,8,19.97,'2026-01-23'),(137,18,1,17.42,'2026-01-20'),(138,18,2,15.19,'2026-01-20'),(139,18,3,19.69,'2026-01-21'),(140,18,4,16.88,'2026-01-21'),(141,18,5,13.31,'2026-01-22'),(142,18,6,19.94,'2026-01-22'),(143,18,7,15.74,'2026-01-23'),(144,18,8,14.90,'2026-01-23'),(145,19,1,15.29,'2026-01-20'),(146,19,2,19.76,'2026-01-20'),(147,19,3,16.92,'2026-01-21'),(148,19,4,13.31,'2026-01-21'),(149,19,5,19.79,'2026-01-22'),(150,19,6,15.01,'2026-01-22'),(151,19,7,19.68,'2026-01-23'),(152,19,8,17.38,'2026-01-23'),(153,20,1,15.85,'2026-01-20'),(154,20,2,15.12,'2026-01-20'),(155,20,3,16.06,'2026-01-21'),(156,20,4,14.93,'2026-01-21'),(157,20,5,14.48,'2026-01-22'),(158,20,6,15.59,'2026-01-22'),(159,20,7,14.52,'2026-01-23'),(160,20,8,13.82,'2026-01-23');
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prof`
--

DROP TABLE IF EXISTS `prof`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prof` (
  `id` int unsigned NOT NULL,
  `departement_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `departement_id` (`departement_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prof`
--

LOCK TABLES `prof` WRITE;
/*!40000 ALTER TABLE `prof` DISABLE KEYS */;
INSERT INTO `prof` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1);
/*!40000 ALTER TABLE `prof` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prof_timetable`
--

DROP TABLE IF EXISTS `prof_timetable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prof_timetable` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `prof_id` int unsigned NOT NULL,
  `filiere_modele_matiere_id` int unsigned NOT NULL,
  `datetime` datetime NOT NULL,
  `duration` time NOT NULL,
  `classroom_id` int unsigned NOT NULL,
  `science_type` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `prof_id` (`prof_id`),
  KEY `filiere_modele_matiere_id` (`filiere_modele_matiere_id`),
  KEY `classroom_id` (`classroom_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prof_timetable`
--

LOCK TABLES `prof_timetable` WRITE;
/*!40000 ALTER TABLE `prof_timetable` DISABLE KEYS */;
INSERT INTO `prof_timetable` VALUES (1,1,1,'2025-09-09 08:00:00','02:00:00',1,1),(2,2,2,'2025-09-09 10:00:00','02:00:00',2,1),(3,3,3,'2025-09-10 08:00:00','02:00:00',3,1),(4,4,4,'2025-09-10 10:00:00','02:00:00',4,1),(5,5,5,'2025-09-11 08:00:00','02:00:00',5,1),(6,6,6,'2025-09-11 10:00:00','02:00:00',6,1),(7,7,7,'2025-09-12 08:00:00','02:00:00',7,1),(8,8,8,'2025-09-12 10:00:00','02:00:00',8,1);
/*!40000 ALTER TABLE `prof_timetable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ressource`
--

DROP TABLE IF EXISTS `ressource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ressource` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `eleve_id` int unsigned NOT NULL,
  `filiere_modele_matiere_id` int unsigned NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text,
  `type_id` int unsigned NOT NULL,
  `resource_url` varchar(255) NOT NULL,
  `date_ajoute` date NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`id`),
  KEY `eleve_id` (`eleve_id`),
  KEY `filiere_modele_matiere_id` (`filiere_modele_matiere_id`),
  KEY `type_id` (`type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ressource`
--

LOCK TABLES `ressource` WRITE;
/*!40000 ALTER TABLE `ressource` DISABLE KEYS */;
/*!40000 ALTER TABLE `ressource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ressource_type`
--

DROP TABLE IF EXISTS `ressource_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ressource_type` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ressource_type`
--

LOCK TABLES `ressource_type` WRITE;
/*!40000 ALTER TABLE `ressource_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `ressource_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `classe_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classe_id` (`classe_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES (1,'SECTION A',1);
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semestre`
--

DROP TABLE IF EXISTS `semestre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semestre` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `semestre_number` int unsigned NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semestre`
--

LOCK TABLES `semestre` WRITE;
/*!40000 ALTER TABLE `semestre` DISABLE KEYS */;
INSERT INTO `semestre` VALUES (1,1,'2025-09-09','2026-01-31'),(2,2,'2026-02-01','2026-05-31');
/*!40000 ALTER TABLE `semestre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `date_naissance` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `adresse_actuelle` varchar(255) NOT NULL,
  `adresse_permanente` varchar(255) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `role` tinyint NOT NULL,
  `hashed_password` varchar(60) NOT NULL,
  `date_ajoute` date NOT NULL DEFAULT (curdate()),
  `gender` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

INSERT INTO `utilisateur` (
  `id`, `nom`, `prenom`, `date_naissance`, `email`, `img_url`, 
  `adresse_actuelle`, `adresse_permanente`, `telephone`, `is_active`, 
  `role`, `hashed_password`, `date_ajoute`, `gender`
) VALUES (
  1, 'Saber', 'Oubella', '2005-07-01', 'oubellasaber@gmail.com', '/imgs/saberoubella.png', 
  'Hay tayert el ouleya bloc d n 24', 'Hay tayert el ouleya bloc d n 24', '0673734828', 1, 
  0, '$2b$12$KBPJ3W/Uqh5cZrRxHAhACOUljIVIWrPrDfsrXJZGPTYVqddBMoTTS', '2025-02-26', 0
);
/*!40101 SET character_set_client = @saved_cs_client */;


INSERT INTO `utilisateur` VALUES ()
--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `
























` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
// 0 admin, 1 student, 2 teacher
INSERT INTO `utilisateur` VALUES (1,'EL AKIL','MOHAMED','2002-05-15','mohamed.elakil@gmail.com','/imgs/mohamed_elakil.png','Hay Universitaire','Hay Universitaire','0600000001',1,1,'','2025-02-26'),(2,'ALAHYANE','OUSSAMA','2001-11-22','oussama.alahyane@gmail.com','/imgs/oussama_alahyane.png','Hay Universitaire','Hay Universitaire','0600000002',1,1,'','2025-02-26'),(3,'AMAAYOU','KARIM','2003-04-10','karim.amaayou@gmail.com','/imgs/karim_amaayou.png','Hay Universitaire','Hay Universitaire','0600000003',1,1,'','2025-02-26'),(4,'AMARR','MOHAMED RE','2000-07-08','mohamedre.amarr@gmail.com','/imgs/mohamedre_amarr.png','Hay Universitaire','Hay Universitaire','0600000004',1,1,'','2025-02-26'),(5,'AMARIR','SOUMIA','2004-01-30','soumia.amarir@gmail.com','/imgs/soumia_amarir.png','Hay Universitaire','Hay Universitaire','0600000005',1,1,'','2025-02-26'),(6,'AMAZAL','OSAMA','2002-06-18','osama.amazal@gmail.com','/imgs/osama_amazal.png','Hay Universitaire','Hay Universitaire','0600000006',1,1,'','2025-02-26'),(7,'ARJDAL','HECHAM','2003-09-25','hecham.arjdal@gmail.com','/imgs/hecham_arjdal.png','Hay Universitaire','Hay Universitaire','0600000007',1,1,'','2025-02-26'),(8,'Asnai','Nouhaila','2001-12-05','nouhaila.asnai@gmail.com','/imgs/nouhaila_asnai.png','Hay Universitaire','Hay Universitaire','0600000008',1,1,'','2025-02-26'),(9,'AYAOU','Khalid','2002-08-14','khalid.ayaou@gmail.com','/imgs/khalid_ayaou.png','Hay Universitaire','Hay Universitaire','0600000009',1,1,'','2025-02-26'),(10,'AYOUBI','YASSINE','2000-10-21','yassine.ayoubi@gmail.com','/imgs/yassine_ayoubi.png','Hay Universitaire','Hay Universitaire','0600000010',1,1,'','2025-02-26'),(11,'AZOUGGAGHO','Yazid','2003-03-03','yazid.azouggagho@gmail.com','/imgs/yazid_azouggagho.png','Hay Universitaire','Hay Universitaire','0600000011',1,1,'','2025-02-26'),(12,'BABILE','SOUHAIL','2001-07-09','souhail.babile@gmail.com','/imgs/souhail_babile.png','Hay Universitaire','Hay Universitaire','0600000012',1,1,'','2025-02-26'),(13,'BADANNI','Chaimae','2004-05-17','chaimae.badanni@gmail.com','/imgs/chaimae_badanni.png','Hay Universitaire','Hay Universitaire','0600000013',1,1,'','2025-02-26'),(14,'BADRI','AHMED','2002-09-28','ahmed.badri@gmail.com','/imgs/ahmed_badri.png','Hay Universitaire','Hay Universitaire','0600000014',1,1,'','2025-02-26'),(15,'BAIDAR','YASSINE','2000-02-11','yassine.baidar@gmail.com','/imgs/yassine_baidar.png','Hay Universitaire','Hay Universitaire','0600000015',1,1,'','2025-02-26'),(16,'BAKRIM','MARYEM','2003-08-07','maryem.bakrim@gmail.com','/imgs/maryem_bakrim.png','Hay Universitaire','Hay Universitaire','0600000016',1,1,'','2025-02-26'),(17,'BALLAHI','Wiame','2001-04-23','wiame.ballah@gmail.com','/imgs/wiame_ballah.png','Hay Universitaire','Hay Universitaire','0600000017',1,1,'','2025-02-26'),(18,'BARRAHOU','MOHAMED','2004-11-12','mohamed.barrah@gmail.com','/imgs/mohamed_barrah.png','Hay Universitaire','Hay Universitaire','0600000018',1,1,'','2025-02-26'),(19,'BATTAH','Sara','2002-06-30','sara.battah@gmail.com','/imgs/sara_battah.png','Hay Universitaire','Hay Universitaire','0600000019',1,1,'','2025-02-26'),(20,'BELANAYA','MARIYAM','2003-10-19','mariyam.belanaya@gmail.com','/imgs/mariyam_belanaya.png','Hay Universitaire','Hay Universitaire','0600000020',1,1,'','2025-02-26'),(21,'Elmrabty','Adnane','1985-03-12','adnane.elmrabty@gmail.com','/imgs/adnane_elmrabty.png','Quartier des professeurs','Quartier des professeurs','0610000001',1,2,'','2025-02-26'),(22,'Rachidi','Youssef','1980-07-25','youssef.rachidi@gmail.com','/imgs/youssef_rachidi.png','Quartier des professeurs','Quartier des professeurs','0610000002',1,2,'','2025-02-26'),(23,'Sabri','Yassine','1988-11-08','yassine.sabri@gmail.com','/imgs/yassine_sabri.png','Quartier des professeurs','Quartier des professeurs','0610000003',1,2,'','2025-02-26'),(24,'Tifroute','Ahmed','1979-05-18','ahmed.tifroute@gmail.com','/imgs/ahmed_tifroute.png','Quartier des professeurs','Quartier des professeurs','0610000004',1,2,'','2025-02-26'),(25,'Hamout','Hamza','1983-09-30','hamza.hamout@gmail.com','/imgs/hamza_hamout.png','Quartier des professeurs','Quartier des professeurs','0610000005',1,2,'','2025-02-26'),(26,'Elidrissi','Ayoub','1987-01-22','ayoub.elidrissi@gmail.com','/imgs/ayoub_elidrissi.png','Quartier des professeurs','Quartier des professeurs','0610000006',1,2,'','2025-02-26'),(27,'Ouallal','Mohamed','1977-06-14','mohamed.ouallal@gmail.com','/imgs/mohamed_ouallal.png','Quartier des professeurs','Quartier des professeurs','0610000007',1,2,'','2025-02-26');
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-05 13:21:42
