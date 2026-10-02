-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.4.11 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             12.21.0.7344
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db_dry_dock
CREATE DATABASE IF NOT EXISTS `db_dry_dock` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_dry_dock`;

-- Dumping structure for table db_dry_dock.checklist
CREATE TABLE IF NOT EXISTS `checklist` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_dry_dock.checklist: ~5 rows (approximately)
INSERT INTO `checklist` (`id`, `name`, `description`, `is_active`) VALUES
	(48, 'Safety', 'Standard Safety checks', 1),
	(49, 'Cleaning', 'Cleanliness Checklist', 1),
	(50, 'Audit Checklist', 'Audit the kitchen equipment and storage and units', 1);

-- Dumping structure for table db_dry_dock.checklist_item
CREATE TABLE IF NOT EXISTS `checklist_item` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `checklist_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_checklist_item_checklist_id` (`checklist_id`),
  CONSTRAINT `fk_checklist_item_checklist` FOREIGN KEY (`checklist_id`) REFERENCES `checklist` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_dry_dock.checklist_item: ~2 rows (approximately)
INSERT INTO `checklist_item` (`id`, `checklist_id`, `title`, `data_type`) VALUES
	(7, 50, 'Were the locks inspected', 'Inspection Check'),
	(8, 50, 'Were the security cameras checked', 'Inspection Check'),
	(9, 50, 'Which of the following items were consumed?', 'Multiple Choice'),
	(10, 50, 'What is the meter Reading for Auxilliary Engine?', 'Meter Reading'),
	(11, 50, 'Describe the condition of the ballast tank', ' Text field'),
	(12, 50, 'How many Defects were found', 'Number field'),
	(13, 50, 'False', 'Status');

-- Dumping structure for table db_dry_dock.dry_dock
CREATE TABLE IF NOT EXISTS `dry_dock` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `vessel` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dock_list_no` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `shipyard_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipyard_detail` text COLLATE utf8mb4_unicode_ci,
  `planned_start_date` date DEFAULT NULL,
  `planned_end_date` date DEFAULT NULL,
  `actual_start_date` date DEFAULT NULL,
  `actual_end_date` date DEFAULT NULL,
  `account_code` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `budget` decimal(18,2) DEFAULT NULL,
  `responsible_bank` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('PLANNING','EXECUTION','COMPLETED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PLANNING',
  `priority` enum('LOW','MEDIUM','HIGH') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'MEDIUM',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_dry_dock.dry_dock: ~23 rows (approximately)
INSERT INTO `dry_dock` (`id`, `vessel`, `dock_list_no`, `description`, `shipyard_name`, `shipyard_detail`, `planned_start_date`, `planned_end_date`, `actual_start_date`, `actual_end_date`, `account_code`, `budget`, `responsible_bank`, `status`, `priority`) VALUES
	(28, 'Ocean Star', 'SEPT2020/DD1', 'DD Required to change BWT', 'Kempell', 'Bombay', '2026-10-02', '2026-10-09', '2026-10-01', '2026-10-08', 'ABC-123', 200000000.00, 'Roshan Ahluwalia/CE', 'PLANNING', 'MEDIUM'),
	(29, 'MV Happy', 'OCT2020DD2', 'DD Needed to change OIL TANK\n\n', 'Kempell', 'Bombay', '2026-09-30', '2026-10-07', '2026-09-29', '2026-10-06', 'ABC-123', 40000000.00, 'Mark/Master', 'PLANNING', 'LOW'),
	(30, 'Ocean Star', 'SEPT2020/DD1', 'DD Required to change BWT', 'Kempell', 'Bombay', '2026-10-01', '2026-10-08', '2026-09-30', '2026-10-07', 'ABC-123', 200000000.00, 'Roshan Ahluwalia/CE', 'EXECUTION', 'HIGH'),
	(31, 'MV Glory', 'SEPT2020/DD1', 'DD Required to change BWT', 'Bombay Dockyard', 'Calcutta', '2026-09-27', '2026-10-01', '2026-09-28', '2026-10-02', 'TEST', 3000000.00, 'TEST', 'PLANNING', 'MEDIUM'),
	(32, 'MV Judas', 'OCT2020DD2', 'DD to repair cranes', 'Timblo Drydocks Private Limited', 'Bombay', '2026-09-25', '2026-09-29', '2026-09-26', '2026-09-30', 'TEST', 50000000.00, 'TEST', 'COMPLETED', 'HIGH');

-- Dumping structure for table db_dry_dock.specification_group
CREATE TABLE IF NOT EXISTS `specification_group` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `group_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_specification_group_number` (`group_no`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_dry_dock.specification_group: ~2 rows (approximately)
INSERT INTO `specification_group` (`id`, `group_no`, `name`, `sort_order`) VALUES
	(5, 'B1', 'Hull', 3),
	(6, 'E1', 'Equipment for Crew', 2),
	(7, 'A1', 'General', 1);

-- Dumping structure for table db_dry_dock.work_order_master
CREATE TABLE IF NOT EXISTS `work_order_master` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `specification_group_id` bigint unsigned NOT NULL,
  `job_code` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `job_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `job_category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_standar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_critical` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_internal` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estimated_hours` int DEFAULT NULL,
  `job_desc` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `idx_wom_specification_group_id` (`specification_group_id`),
  CONSTRAINT `fk_wom_specification_group` FOREIGN KEY (`specification_group_id`) REFERENCES `specification_group` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_dry_dock.work_order_master: ~3 rows (approximately)
INSERT INTO `work_order_master` (`id`, `specification_group_id`, `job_code`, `job_name`, `job_category`, `job_standar`, `job_type`, `job_critical`, `job_internal`, `estimated_hours`, `job_desc`) VALUES
	(10, 7, 'C001', '3 Month Routine Check and Inspection El. Motor', NULL, 'Yes', 'PMS Job', 'Yes', 'Yes', 40, 'NOTE-: REFER ATTACHED DOCUMENT FOR DETAILED MAINTENANCE JOB DESCRIPTION\n\n1. CHECK THAT ALL VALVES HAVE FREEDOM OF MOVEMENT AND ARE IN THE CORRECT POSITION, EITHER NORMALLY OPENED OR CLOSED.\n2. CHECK LEVEL OF FOAM LIQUID MAIN FOAM LIQUID STORAGE TANK.\n3. CHECK FOR FREEDOM OF MOVEMENT OF ALL MONITORS AND SECURE IN "PARKED" POSITION.\n4. CHECK ELECTRIC SUPPLY TO FOAM LIQUID PUMP. DO NOT RUN PUMP DRY.\n5. OPEN FIRE WATER SEA INLET TO PUMP. OPEN FIRE WATER DISTRIBUTION VALVE AND START FIRE WATER PUMPS. OPEN MONITOR WATER STOP VALVE ON FURTHEST MONITOR AND RUN FOR A FEW MINUTES ENSURING THAT THERE IN NO TRACE OF FOAM LIQUID IN SYSTEM AND THAT MONITOR PERFORMANCE IN SATISFACTORY.\nSTOP FIRE WATER PUMPS AND RETURN ALL VALVES TO NORMAL POSITION.'),
	(11, 7, 'C001', '3 Month Routine Check and Inspection El. Motor', 'Check', 'Yes', 'PMS Job', 'Yes', 'Yes', 40, 'NOTE-: REFER ATTACHED DOCUMENT FOR DETAILED MAINTENANCE JOB DESCRIPTION\n\n1. CHECK THAT ALL VALVES HAVE FREEDOM OF MOVEMENT AND ARE IN THE CORRECT POSITION, EITHER NORMALLY OPENED OR CLOSED.\n2. CHECK LEVEL OF FOAM LIQUID MAIN FOAM LIQUID STORAGE TANK.\n3. CHECK FOR FREEDOM OF MOVEMENT OF ALL MONITORS AND SECURE IN "PARKED" POSITION.\n4. CHECK ELECTRIC SUPPLY TO FOAM LIQUID PUMP. DO NOT RUN PUMP DRY.\n5. OPEN FIRE WATER SEA INLET TO PUMP. OPEN FIRE WATER DISTRIBUTION VALVE AND START FIRE WATER PUMPS. OPEN MONITOR WATER STOP VALVE ON FURTHEST MONITOR AND RUN FOR A FEW MINUTES ENSURING THAT THERE IN NO TRACE OF FOAM LIQUID IN SYSTEM AND THAT MONITOR PERFORMANCE IN SATISFACTORY.\nSTOP FIRE WATER PUMPS AND RETURN ALL VALVES TO NORMAL POSITION.'),
	(12, 6, 'C001', 'Grease of Main AC FW Cooling Pump', 'Lubrication', 'No', 'Dock Job', 'No', 'No', 10, 'Carry out #2(P/S)WBT inspection where condition of coating, and structural checking inspected. Photos and reports to be filled and submitted to office by uploading it here.'),
	(13, 5, 'H001', '3 Month Routine Check and Inspection El. Motor', 'Check', 'Yes', 'UPM Job', 'Yes', 'Yes', 800, 'NOTE-: REFER ATTACHED DOCUMENT FOR DETAILED MAINTENANCE JOB DESCRIPTION\n\n1. CHECK THAT ALL VALVES HAVE FREEDOM OF MOVEMENT AND ARE IN THE CORRECT POSITION, EITHER NORMALLY OPENED OR CLOSED.\n2. CHECK LEVEL OF FOAM LIQUID MAIN FOAM LIQUID STORAGE TANK.\n3. CHECK FOR FREEDOM OF MOVEMENT OF ALL MONITORS AND SECURE IN "PARKED" POSITION.\n4. CHECK ELECTRIC SUPPLY TO FOAM LIQUID PUMP. DO NOT RUN PUMP DRY.\n5. OPEN FIRE WATER SEA INLET TO PUMP. OPEN FIRE WATER DISTRIBUTION VALVE AND START FIRE WATER PUMPS. OPEN MONITOR WATER STOP VALVE ON FURTHEST MONITOR AND RUN FOR A FEW MINUTES ENSURING THAT THERE IN NO TRACE OF FOAM LIQUID IN SYSTEM AND THAT MONITOR PERFORMANCE IN SATISFACTORY.\nSTOP FIRE WATER PUMPS AND RETURN ALL VALVES TO NORMAL POSITION.');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
