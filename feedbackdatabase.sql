-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Dec 20, 2024 at 07:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `feedbackdatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedbackdb`
--

CREATE TABLE `feedbackdb` (
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `feedback_message` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedbackdb`
--

INSERT INTO `feedbackdb` (`name`, `email`, `feedback_message`) VALUES
('Bishara Babish', 'bishara.babish23@gmail.com', 'hello,this is a test for final document.'),
('بشارة البعبيش', 'bishara.babish23@gmail.com', 'مرحبا هذا اختبار للمشروع النهائي\r\n'),
('بشارة البعبيش', 'bishara.babish23@gmail.com', 'مرحبا هذا اختبار للمشروع نهائي'),
('بشارة البعبيش', 'bishara.babish23@gmail.com', 'مرحبا هذا اختبار للمشروع النهائي'),
('Bishara Babish', 'bishara.babish23@gmail.com', 'hello,this is a test for final document.');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
