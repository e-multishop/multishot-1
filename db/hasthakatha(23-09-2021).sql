-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 23, 2021 at 12:53 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hasthakatha`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `pid` int(10) NOT NULL,
  `category` int(3) NOT NULL,
  `title` varchar(250) NOT NULL,
  `price` int(5) NOT NULL,
  `price_without_embroidary` int(5) NOT NULL,
  `description` text NOT NULL,
  `note` text NOT NULL,
  `material` varchar(250) NOT NULL,
  `total_available` int(5) NOT NULL,
  `total_quantity` int(5) NOT NULL,
  `available` tinyint(1) NOT NULL,
  `sku` varchar(30) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDate` varchar(25) NOT NULL,
  `updatedDate` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`pid`, `category`, `title`, `price`, `price_without_embroidary`, `description`, `note`, `material`, `total_available`, `total_quantity`, `available`, `sku`, `status`, `createdDate`, `updatedDate`) VALUES
(81, 11, 'Mint green linen dress, Shift dress for women, Frill dress, Made to order, Custom made, Plus size', 570, 570, '', 'Mint green linen dress, Shift dress for women, Frill dress, Made to order, Custom made, Plus size', 'cotton', 50, 60, 1, 'HKC005', 1, '13/09/2021', '0'),
(82, 11, 'Mint green linen dress, Shift dress for women, Frill dress, Made to order, Custom made, Plus size', 570, 570, '', 'Mint green linen dress, Shift dress for women, Frill dress, Made to order, Custom made, Plus size', 'cotton', 50, 60, 1, 'HKC001', 1, '13/09/2021', '0'),
(83, 16, 'green perale anklet', 570, 570, '', 'Mint green linen dress, Shift dress for women, Frill dress, Made to order, Custom made, Plus size', 'cotton', 50, 60, 1, 'CA001', 1, '13/09/2021', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `c1` (`category`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `pid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `c1` FOREIGN KEY (`category`) REFERENCES `category` (`cid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
