-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: db_g08
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `fatura`
--

DROP TABLE IF EXISTS `fatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fatura` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservaId` int NOT NULL,
  `dataHora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pedidosResumo` text,
  `subtotal` decimal(10,2) NOT NULL,
  `iva` decimal(5,2) NOT NULL,
  `totalFinal` decimal(10,2) NOT NULL,
  `estPagamento` enum('Pendente','Pago') NOT NULL DEFAULT 'Pendente',
  PRIMARY KEY (`id`),
  KEY `reservaId` (`reservaId`),
  CONSTRAINT `fatura_ibfk_1` FOREIGN KEY (`reservaId`) REFERENCES `reserva` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fatura`
--

LOCK TABLES `fatura` WRITE;
/*!40000 ALTER TABLE `fatura` DISABLE KEYS */;
INSERT INTO `fatura` VALUES (1,1,'2025-06-19 22:03:52','2x Sopa de Legumes, 2x Bife à Portuguesa, 3x Vinho Tinto',51.50,10.33,61.83,'Pendente'),(2,2,'2025-06-19 22:03:52','1x Bolo de Aniversário, 4x Vinho Tinto',23.00,4.60,27.60,'Pago'),(3,3,'2025-06-19 22:03:52','2x Salada Verde, 2x Frango Grelhado',26.00,5.46,31.46,'Pago'),(4,1,'2025-06-20 01:37:39','2x Sopa de Legumes, 2x Bife à Portuguesa, 3x Vinho Tinto',44.50,8.90,53.40,'Pendente'),(5,4,'2025-06-20 02:20:24','2x Jantar completo',30.00,6.00,36.00,'Pendente');
/*!40000 ALTER TABLE `fatura` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-20  5:37:55
