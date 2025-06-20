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
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `contacto` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'João Silva','912345678'),(2,'Maria Oliveira','919876543'),(3,'Carlos Pereira','913214567'),(4,'Ana Martins','911112223'),(5,'Bruno Costa','914445556'),(6,'Sofia Ferreira','916667778');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumo`
--

DROP TABLE IF EXISTS `consumo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservaId` int NOT NULL,
  `nomeItem` varchar(100) NOT NULL,
  `quantidade` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reservaId` (`reservaId`),
  CONSTRAINT `consumo_ibfk_1` FOREIGN KEY (`reservaId`) REFERENCES `reserva` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumo`
--

LOCK TABLES `consumo` WRITE;
/*!40000 ALTER TABLE `consumo` DISABLE KEYS */;
INSERT INTO `consumo` VALUES (1,1,'Sopa de Legumes',2),(2,1,'Bife à Portuguesa',2),(3,1,'Vinho Tinto',3),(4,4,'Jantar completo',2),(5,2,'Salada Caesar',1),(6,2,'Sopa de Legumes',1),(7,2,'Sopa de Legumes',1),(8,2,'Sopa de Legumes',1),(9,2,'Sopa de Legumes',1);
/*!40000 ALTER TABLE `consumo` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `menuitem`
--

DROP TABLE IF EXISTS `menuitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menuitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text,
  `tipoItem` enum('Entrada','Prato','Bebida','Sobremesa') NOT NULL,
  `tipoMenu` enum('Normal','Aniversário') NOT NULL DEFAULT 'Normal',
  `precoUnidade` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menuitem`
--

LOCK TABLES `menuitem` WRITE;
/*!40000 ALTER TABLE `menuitem` DISABLE KEYS */;
INSERT INTO `menuitem` VALUES (1,'Sopa de Legumes','Sopa tradicional feita com legumes frescos','Entrada','Normal',3.50),(2,'Bife à Portuguesa','Bife com molho tradicional e batatas fritas','Prato','Normal',12.00),(3,'Vinho Tinto','Taça de vinho tinto regional','Bebida','Normal',4.50),(4,'Bolo de Aniversário','Bolo especial para celebrações','Sobremesa','Aniversário',5.00),(5,'Frango Grelhado','Peito de frango grelhado com legumes','Prato','Normal',10.00),(6,'Água Mineral','Garrafa de água 0.5L','Bebida','Normal',1.50),(7,'Espumante','Taça de espumante para celebração','Bebida','Aniversário',5.00),(8,'Tarte de Maçã','Sobremesa de maçã com canela','Sobremesa','Normal',4.00),(9,'Salada Verde','Salada com alface, rúcula e tomate cherry','Entrada','Normal',3.00),(10,'Jantar completo',NULL,'Prato','Normal',15.00);
/*!40000 ALTER TABLE `menuitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesa`
--

DROP TABLE IF EXISTS `mesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `restauranteId` int NOT NULL,
  `numeroMesa` int NOT NULL,
  `capacidade` int NOT NULL,
  `estado` enum('Disponível','Pendente','Reservada') NOT NULL DEFAULT 'Disponível',
  PRIMARY KEY (`id`),
  KEY `restauranteId` (`restauranteId`),
  CONSTRAINT `mesa_ibfk_1` FOREIGN KEY (`restauranteId`) REFERENCES `restaurante` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesa`
--

LOCK TABLES `mesa` WRITE;
/*!40000 ALTER TABLE `mesa` DISABLE KEYS */;
INSERT INTO `mesa` VALUES (1,1,1,4,'Disponível'),(2,1,2,2,'Reservada'),(3,2,1,6,'Pendente'),(4,1,3,2,'Disponível'),(5,1,4,6,'Reservada'),(6,1,5,4,'Pendente'),(7,2,2,4,'Disponível'),(8,2,3,2,'Disponível'),(9,3,1,4,'Disponível');
/*!40000 ALTER TABLE `mesa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clienteId` int NOT NULL,
  `mesaId` int NOT NULL,
  `nomeCliente` varchar(100) NOT NULL,
  `dataHoraReserva` datetime NOT NULL,
  `numeroPessoas` int NOT NULL,
  `tipoMenu` enum('Normal','Aniversário') NOT NULL DEFAULT 'Normal',
  `dataCriacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `clienteId` (`clienteId`),
  KEY `mesaId` (`mesaId`),
  CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`clienteId`) REFERENCES `cliente` (`id`),
  CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`mesaId`) REFERENCES `mesa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (1,1,1,'João Silva','2025-06-17 20:00:00',2,'Normal','2025-06-15 20:10:00'),(2,2,2,'Maria Oliveira','2025-06-17 19:30:00',4,'Aniversário','2025-06-14 19:30:00'),(3,3,3,'Carlos Pereira','2025-06-20 20:00:00',2,'Normal','2025-06-19 22:03:52'),(4,1,1,'João Silva','2025-06-22 20:00:00',2,'Normal','2025-06-20 01:52:00');
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurante`
--

DROP TABLE IF EXISTS `restaurante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurante` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cidade` varchar(50) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `codigoPostal` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurante`
--

LOCK TABLES `restaurante` WRITE;
/*!40000 ALTER TABLE `restaurante` DISABLE KEYS */;
INSERT INTO `restaurante` VALUES (1,'Porto','Rua Nova das Flores','123','4000-456'),(2,'Lisboa','Avenida da Liberdade','45','1250-456'),(3,'Braga','Rua do Souto','12','4700-123');
/*!40000 ALTER TABLE `restaurante` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-20 10:43:22
