-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 14, 2021 at 08:07 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.5

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
-- Table structure for table `add_to_cart`
--

CREATE TABLE `add_to_cart` (
  `id` int(10) NOT NULL,
  `uid` varchar(50) NOT NULL,
  `pid` varchar(6) NOT NULL,
  `item` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `cid` int(3) NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cid`, `name`, `description`) VALUES
(11, 'Dresses', ''),
(12, 'Scarf', ''),
(13, 'Tops', ''),
(14, 'Pants', ''),
(15, 'Skirts', '');

-- --------------------------------------------------------

--
-- Table structure for table `colour`
--

CREATE TABLE `colour` (
  `clid` int(3) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `colour`
--

INSERT INTO `colour` (`clid`, `name`) VALUES
(101, 'White'),
(102, 'black'),
(103, 'Maroon'),
(104, 'Cream'),
(105, 'Mastard'),
(106, 'Grey'),
(107, 'Olive'),
(108, 'Peach'),
(109, 'Brick Red'),
(110, 'Aubergine'),
(111, 'Wine'),
(112, 'Navy Blue ');

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

CREATE TABLE `discount` (
  `pid` varchar(6) NOT NULL,
  `offer` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `pid` varchar(6) NOT NULL,
  `category` int(3) NOT NULL,
  `title` varchar(250) NOT NULL,
  `price` int(5) NOT NULL,
  `price_without_embroidary` int(5) NOT NULL,
  `description` text NOT NULL,
  `note` text NOT NULL,
  `material` varchar(250) NOT NULL,
  `total_available` int(5) NOT NULL,
  `total_quantity` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`pid`, `category`, `title`, `price`, `price_without_embroidary`, `description`, `note`, `material`, `total_available`, `total_quantity`) VALUES
('HKD01', 11, 'Black Maxi Dress with\r\nHand Embroidery', 2400, 1900, 'Sleeveless maxi pleated dress with hand embroidery in front.\r\n\r\n- Model height: 5\'3\" wearing size S\r\n- Length: 45\"\r\n- Fit: Comfortable\r\n- Side slit', '', 'Linen, Rayon', 50, 50),
('HKD02', 11, 'Green Maxi Dress with\r\nHand Embroidery', 2400, 1900, 'Sleeveless maxi pleated dress with hand embroidery in front.\r\n\r\n- Model height: 5\'3\" wearing size S\r\n- Length: 45\"\r\n- Fit: Comfortable\r\n- Side slit', '', 'Linen, Rayon', 50, 50);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `imageid` varchar(10) NOT NULL,
  `pid` varchar(10) NOT NULL,
  `type` varchar(10) NOT NULL,
  `url` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`imageid`, `pid`, `type`, `url`) VALUES
('1', 'HKD01', 'main', 'https://i.etsystatic.com/13404419/c/2350/1867/0/130/il/c8ffdc/2626521663/il_340x270.2626521663_eo16.jpg'),
('2', 'HKD02', 'main', 'https://i.etsystatic.com/13404419/c/2350/1867/0/130/il/c8ffdc/2626521663/il_340x270.2626521663_eo17.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `product_size`
--

CREATE TABLE `product_size` (
  `id` int(10) NOT NULL,
  `pid` varchar(6) NOT NULL,
  `size` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product_status`
--

CREATE TABLE `product_status` (
  `pid` varchar(6) NOT NULL,
  `quantity` int(3) NOT NULL,
  `tid` varchar(30) NOT NULL,
  `status_locked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `rid` varchar(15) NOT NULL,
  `rating` int(1) NOT NULL,
  `description` text NOT NULL,
  `images` varchar(50) NOT NULL,
  `pid` varchar(6) NOT NULL,
  `uid` varchar(50) NOT NULL,
  `timestamp` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shipping_address`
--

CREATE TABLE `shipping_address` (
  `user_id` varchar(50) NOT NULL,
  `address` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `sid` int(3) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`sid`, `name`) VALUES
(1, 'XS US women\'s letter'),
(2, 'S US women\'s letter'),
(3, 'M US women\'s letter'),
(4, 'L US women\'s letter'),
(5, 'XL US women\'s letter'),
(6, 'XXL US women\'s letter'),
(7, 'OX US women\'s letter');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `stid` int(1) NOT NULL,
  `value` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tracking_order`
--

CREATE TABLE `tracking_order` (
  `id` varchar(10) NOT NULL,
  `tracking_number` varchar(14) NOT NULL,
  `order_id` varchar(10) NOT NULL,
  `tracking_endpoint` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `tid` varchar(30) NOT NULL,
  `pid` varchar(6) NOT NULL,
  `quantity` int(5) NOT NULL,
  `price` decimal(5,0) NOT NULL,
  `uid` varchar(50) NOT NULL,
  `timestamp` varchar(30) NOT NULL,
  `color_code` int(4) NOT NULL,
  `size` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `name` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `profile_picture` varchar(50) NOT NULL,
  `uid` varchar(50) NOT NULL,
  `shipping_address` text NOT NULL,
  `password_token` varchar(100) NOT NULL,
  `phone` int(10) NOT NULL,
  `age` int(3) NOT NULL,
  `created_date` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_order`
--

CREATE TABLE `user_order` (
  `oid` varchar(10) NOT NULL,
  `tid` varchar(30) NOT NULL,
  `status` int(1) NOT NULL,
  `delivery_date` varchar(30) NOT NULL,
  `delivered_by` varchar(30) NOT NULL,
  `delivery_note` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `wish_list`
--

CREATE TABLE `wish_list` (
  `uid` varchar(50) NOT NULL,
  `pid` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_to_cart`
--
ALTER TABLE `add_to_cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cid`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `c1` (`category`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`imageid`);

--
-- Indexes for table `product_size`
--
ALTER TABLE `product_size`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`rid`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`stid`);

--
-- Indexes for table `tracking_order`
--
ALTER TABLE `tracking_order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`tid`);

--
-- Indexes for table `wish_list`
--
ALTER TABLE `wish_list`
  ADD PRIMARY KEY (`uid`,`pid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_to_cart`
--
ALTER TABLE `add_to_cart`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_size`
--
ALTER TABLE `product_size`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

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
