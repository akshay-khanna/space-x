CREATE TABLE `spacedata` (
  `ship_id` varchar(200) NOT NULL,
  `home_port` varchar(255) DEFAULT NULL,
  `weight_kg` bigint(100) DEFAULT NULL,
  `ship_type` varchar(255) DEFAULT NULL,
  `class` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ship_name` varchar(45) DEFAULT NULL,
  `image` longtext,
  `created_dt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ship_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
