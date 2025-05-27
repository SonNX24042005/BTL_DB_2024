use qldt;
--
-- Table structure for table `KyHoc`
--
DROP TABLE IF EXISTS `KyHoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `KyHoc` (
  `MaKyHoc` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`MaKyHoc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `KyHoc`
--
LOCK TABLES `KyHoc` WRITE;
/*!40000 ALTER TABLE `KyHoc` DISABLE KEYS */;
INSERT INTO `KyHoc` (`MaKyHoc`) VALUES
('2020.1'),('2020.2'),('2020.3'),
('2021.1'),('2021.2'),('2021.3'),
('2022.1'),('2022.2'),('2022.3'),
('2023.1'),('2023.2'),('2023.3'),
('2024.1'),('2024.2'),('2024.3'),
('2025.1'),('2025.2'),('2025.3');
/*!40000 ALTER TABLE `KyHoc` ENABLE KEYS */;
UNLOCK TABLES;