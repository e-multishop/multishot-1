-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 30, 2021 at 05:08 PM
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
-- Table structure for table `add_to_cart`
--

CREATE TABLE `add_to_cart` (
  `id` int(10) NOT NULL,
  `uid` varchar(50) NOT NULL,
  `pid` int(10) NOT NULL,
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
  `pid` int(10) NOT NULL,
  `offer` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `forgot_password`
--

CREATE TABLE `forgot_password` (
  `email` varchar(50) NOT NULL,
  `pass_token` varchar(100) NOT NULL,
  `timestamp` varchar(25) NOT NULL,
  `visited` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `forgot_password`
--

INSERT INTO `forgot_password` (`email`, `pass_token`, `timestamp`, `visited`) VALUES
('ashishmaurya7054@gmail.com', '$2b$10$0YX1aGCdd7LjxdoxIr00BuQ7qRboi4rYm./CctWAlM04AXHx7Qr1O', '1629974790792', 0),
('ashishmaurya7054@gmail.com', '$2b$10$1UJcRYbHyxJvvHeroY1jSeZV95FGm2HARu/cV6riGJ0d6h8P.To5a', '1629119880841', 0),
('ashishmaurya7054@gmail.com', '$2b$10$cbkjbOE8NJsPLEMnfQL99Ou/mFxktLsjsmhZrHVHTTP/hKbuIomfq', '1629108395844', 0),
('ashishmaurya7054@gmail.com', '$2b$10$dFLu3Bh05kx4nGjSeqUTWekkX/bqCsRPIrCvVlhoj3wBoEqvcTJv.', '1629974974534', 0),
('ashishmaurya7054@gmail.com', '$2b$10$EnAja1dfl0nqgGaJ4D9ti.c7KW564NIhBGxWSRJIiQaY8H4yk5HN6', '1628142331202', 0),
('ashishmaurya7054@gmail.com', '$2b$10$g2VGO1I/SEnHSlVLWn9vxuk7Ayx14n1MVWMe151e4srtMVbVXFokK', '1629970079819', 0),
('ashishmaurya7054@gmail.com', '$2b$10$GTeCP03G85bL5/TVMV/eKOAxYBVNTDrfy/2MpPQMCTb1uGgRMMphW', '1628095566926', 0),
('ashishmaurya7054@gmail.com', '$2b$10$iGwc1dGuyikGZqJ59dPb0.JdfF8xjn1H2ZRm9M8Lig2s5sPHer5hi', '1627750755939', 0),
('ashishmaurya7054@gmail.com', '$2b$10$kdSLCpej5iD//c7o3lMwzeWb9E5dYdF/p8tsSZWVnn64wND0Y15au', '1629716619581', 0),
('ashishmaurya7054@gmail.com', '$2b$10$lhF4hUql5PlmLjycf1rGUOlWk2rXFOGrYYQJr.yf/PK/4hJoLAAUm', '1627748294882', 0),
('ashishmaurya7054@gmail.com', '$2b$10$meE9Abe4./xdEfU6pFcTEOgDkNAYeeoOLgAF2Ea4dFY163uLHVu4.', '1627751051419', 0),
('ashishmaurya7054@gmail.com', '$2b$10$MncFDvwIlhC16vwnDDfFbu6JWGcatNseUFkfKPnDbp15Z9sj.5qHW', '1627750659423', 0),
('ashishmaurya7054@gmail.com', '$2b$10$ms0e9kf/.N43He0A5xOnX.VwiVcyelGDhposls2dqRj3w4QT9LjZ.', '1627749333499', 0),
('ashishmaurya7054@gmail.com', '$2b$10$mWgZ4ggLPzu456Visk1KJO30NwQ9mCz1XEK1kEjTkAhRksYGHaJL.', '1629975876092', 0),
('ashishmaurya7054@gmail.com', '$2b$10$ncDXgLPHqPze4fadGkskne1R1ng.ZkSyg.0Lyr7pP3Q5gLNg99.sK', '1629716240109', 0),
('ashishmaurya7054@gmail.com', '$2b$10$Od86eTZci3Gbxgx5ZKyDKuLXr3Pn0Ok2SywUM0oKjPu7IkOeBLGw2', '1629970775255', 0),
('ashishmaurya7054@gmail.com', '$2b$10$ODCx.Uwx29At9Cyj0vjPS.ScBCgCfHMwSCdIlLlPF5QUnm3oSYxiK', '1629715838355', 0),
('ashishmaurya7054@gmail.com', '$2b$10$qLFs8yVvj7bHoYcfK50Q9.ExsGuPOQBb2BCU94s3ASTKGI6x7yFbC', '1629108343701', 0),
('ashishmaurya7054@gmail.com', '$2b$10$RY0ifX4BPvuNjcoDsgZlxOktEESOS2dtWOmRIonQB03Axhh/aOhYC', '1629970694098', 0),
('ashishmaurya7054@gmail.com', '$2b$10$S05K9ibc2TxZUIv8EGlku.Su2KgHOW2YwZqO793ekQ2L6tjqH0O2e', '1629716081738', 0),
('ashishmaurya7054@gmail.com', '$2b$10$So9MewW.burhPgsaFfpgberYq0AMWGFIe/79LuJ3LAA86iiLAaM.6', '1629716555961', 0),
('ashishmaurya7054@gmail.com', '$2b$10$t2EbnQyDQk/ew2sUj5n33em5PzgcnSsPsb8yASiyZUp/FgNVtQkdq', '1629975064243', 0),
('ashishmaurya7054@gmail.com', '$2b$10$tB2NeEySSlVpFcSETwpYFORTPFVg/quJbeefd1OrsJ4AQ/8iHPjum', '1629715970125', 0),
('ashishmaurya7054@gmail.com', '$2b$10$uZI5l39hFqKMQPGyzgpkSuVVV8saAks/uMYOloVFLNMHO8oR6rhlC', '1629971153052', 0),
('ashishmaurya7054@gmail.com', '$2b$10$V9V8MCY2PauOReMFrMTT0uDAVY9SbTiF3TaFqCpLf1mxIW6Q45B9W', '1629117103707', 0),
('ashishmaurya7054@gmail.com', '$2b$10$Yiaj8lXGaDl1/rTjr/vB9ef.5k8XKmvMBjRHcdzdgYRNLlMSYXQou', '1627747552738', 0);

-- --------------------------------------------------------

--
-- Table structure for table `loginusers`
--

CREATE TABLE `loginusers` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `loginusers`
--

INSERT INTO `loginusers` (`id`, `name`, `email`, `password`) VALUES
(23, '', 'ashish@gmail.com', '$2b$10$TxJQg0xGkNhiq/8zau9WLuJC87SiI78/k57FuE3cyyMtBx7azXiUm'),
(24, '', 'ashi@gmail.com', '$2b$10$v66zvxsaSe83d27JEOmZrusOYIV/hOJ2JYnib/PFcIB7ypEBkQBna'),
(26, '', 'ashishmaurya7054@gmail.com', '$2b$10$815XXZ1abtCSmUxiwqz26.AumfmJryimUrfrebC0Z9LvkU79Ang2C');

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
  `discontinued` tinyint(1) NOT NULL,
  `sku` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `imageid` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `type` varchar(25) NOT NULL,
  `image_data` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product_size`
--

CREATE TABLE `product_size` (
  `id` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `size` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product_status`
--

CREATE TABLE `product_status` (
  `pid` int(10) NOT NULL,
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
  `pid` int(10) NOT NULL,
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
  `pid` int(10) NOT NULL,
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
  `pid` int(10) NOT NULL
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
-- Indexes for table `forgot_password`
--
ALTER TABLE `forgot_password`
  ADD PRIMARY KEY (`pass_token`);

--
-- Indexes for table `loginusers`
--
ALTER TABLE `loginusers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

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
-- AUTO_INCREMENT for table `loginusers`
--
ALTER TABLE `loginusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `pid` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `imageid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
