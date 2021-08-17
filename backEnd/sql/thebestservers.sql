-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 01, 2021 at 11:08 AM
-- Server version: 5.7.33
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thebestservers`
--

-- --------------------------------------------------------

--
-- Table structure for table `category_games`
--

CREATE TABLE `category_games` (
  `category_id` int(11) NOT NULL,
  `categoty_name` varchar(100) NOT NULL,
  `category_img` varchar(255) NOT NULL,
  `category_serverTotal` int(11) DEFAULT '0',
  `category_serverActive` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category_games`
--

INSERT INTO `category_games` (`category_id`, `categoty_name`, `category_img`, `category_serverTotal`, `category_serverActive`, `createdAt`, `updatedAt`) VALUES
(2, 'Seal Online', '1623214000011.jpeg', 2, 0, '2021-05-25 11:29:09', '2021-06-09 05:15:13'),
(3, 'MapleStory Online', 'maple-cover.jpg', 6, 3, '2021-05-25 11:29:09', '2021-06-30 17:21:04'),
(4, 'Ragnarok Online', 'ragnarok_01.jpg', 2, 1, '2021-05-25 11:29:32', '2021-06-09 07:42:14'),
(5, 'Minecraft', 'minecraft_01.jpg', 0, 0, '2021-05-25 11:29:32', '2021-05-25 11:29:32'),
(6, 'Dragon Nest', 'dragonnest_01.jpg', 0, 0, '2021-05-28 05:53:43', '2021-05-28 05:53:43'),
(7, 'flyff online', 'flyff_01.jpg', 0, 0, '2021-05-28 05:56:24', '2021-05-28 05:56:24'),
(8, 'WARZ', 'warz_01.jpg', 0, 0, '2021-05-28 05:56:52', '2021-05-28 05:56:52'),
(9, 'PangYa ปังย่า', 'pangya_01.jpg', 0, 0, '2021-05-28 06:00:44', '2021-05-28 06:00:44'),
(10, 'Mu Online มิว', 'muonline_01.jpg', 0, 0, '2021-05-28 06:02:08', '2021-05-28 06:02:08'),
(11, 'Lineage 2 ลินเนจ', 'lineage2_cover.jpg', 0, 0, '2021-05-28 06:04:07', '2021-05-28 06:04:07'),
(12, 'สามก๊กออนไลน์', '3k-cover.jpg', 0, 0, '2021-05-28 06:04:49', '2021-05-28 06:04:49'),
(13, 'TS2 Online', 'ts2_01.png', 0, 0, '2021-05-28 06:05:06', '2021-05-28 06:05:06'),
(14, 'DAYZ Online', 'dayz_01.jpg', 0, 0, '2021-05-28 06:06:23', '2021-05-28 06:06:23'),
(15, 'ARMA3', 'arma3_01.jpg', 0, 0, '2021-05-28 06:06:57', '2021-05-28 06:06:57'),
(16, 'Ran Online แรน', 'ran_01.jpg', 0, 0, '2021-05-28 06:07:24', '2021-05-28 06:07:24'),
(17, 'CABAL Online', 'cabal_01.jpg', 0, 0, '2021-05-28 06:08:06', '2021-05-28 06:08:06'),
(18, 'BOOMZ Online', 'boomz-list-cover.gif', 0, 0, '2021-05-28 06:09:23', '2021-05-28 06:09:23'),
(19, 'เกมส์ อื่น ๆ', '1623228490166.jpeg', 0, 0, '2021-06-09 08:46:54', '2021-06-09 08:48:49');

-- --------------------------------------------------------

--
-- Table structure for table `delay_votes`
--

CREATE TABLE `delay_votes` (
  `id` int(11) NOT NULL,
  `time` time DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `reset_rankings`
--

CREATE TABLE `reset_rankings` (
  `id` int(11) NOT NULL,
  `reset_type` varchar(255) DEFAULT NULL,
  `reset_datetime` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `servers`
--

CREATE TABLE `servers` (
  `server_id` int(11) NOT NULL,
  `server_name` varchar(100) NOT NULL,
  `server_user` int(11) NOT NULL,
  `server_detail` text NOT NULL,
  `category_id` int(3) NOT NULL,
  `server_vip` int(1) NOT NULL DEFAULT '0',
  `server_img` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `facebook_group` varchar(255) DEFAULT NULL,
  `score_vote` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `servers`
--

INSERT INTO `servers` (`server_id`, `server_name`, `server_user`, `server_detail`, `category_id`, `server_vip`, `server_img`, `website`, `facebook`, `facebook_group`, `score_vote`, `createdAt`, `updatedAt`) VALUES
(2, '⭐Angeling-RO EP4.0⭐แจกปันสุขมูลค่ากว่า 1 แสนบาท!!', 1, '<p class=\"serverdetail-leftdiv-contentarea-detail-content\">Angeling-RO Easy Play EP 4.0 By TLROTEAM <br>\r\nตัวเกมส์เป็น ปีล่าสุด 2021 Full HD ไม่มีที่ไหนแน่นอน <br>\r\n⛏ขุดกระทู้ x10 ตั้งแต่ 15พฤษภาคมถึง 5มิถุนายน นี้เท่านั้น!! ⛏<br>\r\n⚔เปิดรับลงทะเบียนกิลด์ เพื่อแย่งชิงความเป็นหนึ่ง แผ่นดินแห่งTRO Server Angling-RO Classic EP4.0⚔<br>\r\nจะเป็นหัวหมาหรือเป็นหางราชสีห์อยู่ที่คุณ!!รับเงินสบทบ 2000บาทและ3000CC หลังจบวอแรก<br>\r\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬<br>\r\n✤ กำหนดการณ์ ✤<br>\r\nClose Beta : 30 พฤษภาคม 2564 เวลา 18.00 น.<br>\r\nOpen Beta : 04 มิถุนายน 2564 เวลา 18.00 น.<br>\r\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬<br>\r\n✤ กิจกรรมก่อน Close Beta ✤<br>\r\nรายละเอียดลงทะเบียนกิลด์ : <a class=\"outlink\" href=\"https://bit.ly/3o3qykE\" target=\"_blank\">https://bit.ly/3o3qykE</a><br>\r\nรายละเอียดลงทะเบียนล่วงหน้า : <a class=\"outlink\" href=\"https://bit.ly/3f3Tbdm\" target=\"_blank\">https://bit.ly/3f3Tbdm</a><br>\r\nรายละเอียดLike &amp; Share : <a class=\"outlink\" href=\"https://bit.ly/3eCsOfG\" target=\"_blank\">https://bit.ly/3eCsOfG</a><br>\r\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬<br>\r\n★แนะนำตัว★<br>\r\nเราเป็นเซิฟที่กำลังจะเปิดโดยทีมงาน TLROTEAM By Yo-Cons หรือน้าโยโอเพ่นคอร์ พวกเราเป็นตัวแทนจำหน่าย Openkore หรือเรียกกันว่า Ukore ที่ใหญ่ที่สุดในประเทศไทย เครดิต มากกว่า 8 หลัก!! ที่ต้องการทำเซิร์ฟแนวคลาสสิก สมดุล ระยะยาว แจกหนัก แจกจริง!! การันตรีเซิร์ฟนี้ไร้บอท ไร้โปร<br>\r\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬<br>\r\n✤ Balance server :: ความสมดุล ของเซิฟเวอร์ ✤<br>\r\nเซิฟเวอร์รูปแบบ Pre-Renewal แบบ 19 ปีก่อน (ไม่ใช่ระบบ Renewal แบบ GGT ในปัจจุบัน)<br>\r\n✅ Fire Pillar วางใต้เท้า <br>\r\n✅ไม่สามารถ Trap ใต้เท้าได้ (ในกิลวอปรับระยะเวลาลงเหลือ 5 วินาที )<br>\r\n✅Sanctuary ไม่สามารถใช้ในกิลด์วอได้ <br>\r\n✅สามารถตั้งร้าน รับซื้อไอเท็มได้ <br>\r\n✅Flee หารเมื่อลากมอนสเตอร์ 2 ตัวขึ้นไป <br>\r\n✅Def ไม่หาร <br>\r\n✅Hunterนกออกไม่หาร DMG <br>\r\n✅Double Critical <br>\r\n✅endure นับเวลา<br>\r\n✅สกิลเสริม Sonic Acceleration เพิ่มความรุนแรงในการโจมตี 50% ด้วย สกิล Sonic Blow<br>\r\n✅ผู้เล่นทุกคน สามารถคลิกขวาที่ตัวละครเพื่อดู อุปกรณ์ ของตัวละครท่านอื่นได้ <br>\r\n✅ปรับสกิล Steal ของอาชีพโจร ใช้เอสพี 30 <br>\r\n✅Emergency Call ไม่สามารถใช้งานได้<br>\r\n✅ปิดสถานะ การ์ด Creamy และนำ Card ออก ไม่สามารถหาได้ในเกมส์ <br>\r\n✅ตีบวก ชุดเกราะ จะเป็นรูปแบบ ใหม่ คือ +1 ถึง+4 โอกาศสำเร็จ 90%<br>\r\n✅อาวุธ Lv.1 Lv.2 แก้ไข ใช้ Rough Oridecon ในการตีบวก<br>\r\n✅ตั้งร้านเสียภาษี 2% ทุกๆการขาย <br>\r\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬<br>\r\n:: อัตราการคูณต่างๆของ Server ::<br>\r\nBase Lv &amp; Job Rate : x 3<br>\r\nEtc Rate : x 1<br>\r\nUsable Item : x 1<br>\r\nNormal Card Rate : x 3<br>\r\nEquipment Rate : x 2<br>\r\nBoss Card Rate : x 1<br>\r\nBoss Equipment Rate : x 1<br>\r\n★ ระบบ ★<br>\r\nทีมงาน พัฒนาระบบ และ วางแผนระบบ แนวทาง การจัดการและ npc กิจกรรม ต่างๆ แบบแนวทาง <br>\r\nเล่นง่าย เน้น สมดุล ทุกคนสิทธิ์ เท่าเทียมกัน  ทีมงานมีความรู้เรื่องบอทเป็นอย่างดี การันตรีไร้บอท  ไร้โปร ด้วย Gepard Shield 3.0<br>\r\n★ความตั้งใจ★<br>\r\nเราทำการโปรโหมดอย่างต่อเนื่อง ดูแลผู้เล่นแบบไม่ทิ้งเซิฟ นโยบาย รักษาผู้เล่นเก่าและเพิ่มผู้เล่นใหม่<br>\r\nเล่นยาว เปิดยาว ไร้บอท ไร้โปร ไร้เส้น วอมัน แจกหนัก จัดเต็ม แจกจิง <br>\r\n★ระบบ Guild★<br>\r\nสมาชิกกิลสูงสุด 26 คน (บ้านเล็ก16คน / บ้านใหญ่26คน)<br>\r\nไม่สามารถจับ พันธมิตรได้<br>\r\n★คำสั่งเปิดใช้★<br>\r\n@time ดูเวลาของเซิร์ฟเวอร์<br>\r\n@mi / @mobinfo ตรวจสอบ Monster<br>\r\n@at ตั้งร้านค้าออฟไลน์ (24ชั่วโมง)<br>\r\n#itemlist : ตรวจสอบ Item ผู้เล่น<br>\r\n#stats : ตรวจสอบ Status ผู้เล่น<br>\r\n#cartlist : ตรวจสอบ Item ในรถเข็น ผู้เล่น<br>\r\n#storagelist : ตรวจสอบ Kafra ผู้เล่น<br>\r\n<br>\r\nรายละเอียดอื่นๆ ติดตามได้ ทางเว็บไซต์<br>\r\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬<br>\r\n รับสิทธิ์ เมื่อร่วมวอร์กับ Angeling-RO EP4.0 <br>\r\n- เพื่อความเท่าเทียมและไม่ยุ่งยากเพียงคุณร่วมวอร์ใน Server ของเราก็สามารถรับสนับสนุนได้<br>\r\n1. เงินรางวัลสมทบ First War สูงสุด 2,000บาทและ 3000CC (มีสมาชิกเข้าร่วม First War 16คนขึ้นไป)<br>\r\nหลังจบ First War รับรางวัลได้ทันที <br>\r\n2.หลังจบแต่ละ Tournament SUPPORT สูงสุด5000บาท/เดือน (ถ้ายังวออยู่กับServer ของเรา)<br>\r\n3. SUPPORT MEETING GUILD สนับสนุนสูงสุด 10,000<br>\r\n4. SUPPORT กิลด์นอนวัด (พากิลด์มาวอร์มากกว่า 16 คน แล้วไม่ได้บ้าน จะได้รับเงินสนับสนุนกิลด์ละ 500 บาท)<br>\r\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬<br>\r\n#tlroteam #ro #ragnarok #rag #roเถื่อน #แร็คนาร็อคออนไลน์ #คราสสิค #Classic<br>\r\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬<br>\r\n✤ Line official : <a class=\"outlink\" href=\"https://playserver.in.th/index.php/Server/out/angeling40-29916/3\" data-outlink=\"https://bit.ly/3e1hj0L\" target=\"_blank\">https://bit.ly/3e1hj0L</a>รับitem ฟรีทุกวัน<br>\r\n✤ Website : <a class=\"outlink\" href=\"https://playserver.in.th/index.php/Server/out/angeling40-29916/4\" data-outlink=\"http://www.angeling-ro.com/\" target=\"_blank\">http://www.angeling-ro.com/</a><br>\r\n✤ Style : แนว หาของ เก็บLv PvP GvG ล่าบอส Classic 99/50<br>\r\n✤ สมัครสมาชิก : <a class=\"outlink\" href=\"https://playserver.in.th/index.php/Server/out/angeling40-29916/5\" data-outlink=\"https://bit.ly/3bf3QR8\" target=\"_blank\">https://bit.ly/3bf3QR8</a><br>\r\n✤ กลุ่ม พูดคุย-ซื้อขาย : <a class=\"outlink\" href=\"https://bit.ly/3u5e12l\" target=\"_blank\">https://bit.ly/3u5e12l</a><br>\r\n✤ Page : <a class=\"outlink\" href=\"https://playserver.in.th/index.php/Server/out/angeling40-29916/7\" data-outlink=\"https://bit.ly/3e5bsaI\" target=\"_blank\">https://bit.ly/3e5bsaI</a><br>\r\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</p>', 4, 0, '92614_2947581.gif', 'http://www.angeling-ro.com/', 'https://bit.ly/3e5bsaI', 'https://bit.ly/3u5e12l', 3, '2021-05-25 11:30:28', '2021-06-09 07:15:41'),
(3, 'PARTY-RO HiClass พึ่งเปิด คนเยอะต้องลอง มีมือถือ', 68, 'PARTY-RO HiClass พึ่งเปิด คนเยอะต้องลอง มีมือถือ', 4, 0, '92614_2947581.gif', 'http://www.angeling-ro.com/', 'https://bit.ly/3e5bsaI', 'https://bit.ly/3u5e12l', 0, '2021-05-25 11:30:44', '2021-05-28 10:28:33'),
(4, 'Seal PK Online Plus อยากมันต้องลอง บอกเลย', 1, 'Seal PK Online Plus อยากมันต้องลอง บอกเลย', 2, 0, '40099_1161897710.gif', 'http://www.angeling-ro.com/', 'https://bit.ly/3e5bsaI', 'https://bit.ly/3u5e12l', 0, '2021-05-25 11:31:12', '2021-06-09 07:36:56'),
(5, 'Seal - Comeback แนวคลาสิกย้อนยุก 16 อาชีพ หาของเวล', 1, 'Seal - Comeback แนวคลาสิกย้อนยุก 16 อาชีพ หาของเวล', 2, 0, '92614_2947581.gif', 'http://www.angeling-ro.com/', 'https://bit.ly/3e5bsaI', NULL, 0, '2021-05-25 11:31:56', '2021-05-28 10:27:00'),
(6, 'MapleSiam', 1, 'MapleSiam Class 5\r\n', 3, 0, '40774_795158039.png', 'http://www.angeling-ro.com/', 'https://bit.ly/3e5bsaI', 'https://bit.ly/3u5e12l', 35, '2021-05-25 11:32:30', '2021-06-30 17:31:45'),
(7, 'MapleStoryPro - MapleSEA v.203', 1, 'MapleStoryPro - MapleSEA v.203\r\n', 3, 0, '92614_2947581.gif', 'http://www.angeling-ro.com/', 'https://bit.ly/3e5bsaI', 'https://bit.ly/3u5e12l', 6, '2021-05-25 11:33:04', '2021-06-09 07:42:03'),
(8, 'OctopusMS', 68, 'OctopusMS', 3, 0, '98203_1116584593.png', 'http://www.angeling-ro.com/', 'https://bit.ly/3e5bsaI', NULL, 1, '2021-05-25 11:33:17', '2021-06-30 17:21:04'),
(12, 'ดราโกนิก้า เซิฟฟินิกซ - ไลค์&แชร์ แจกแคชฟรี 100', 1, 'ดราโกนิก้า เซิฟฟินิกซ - ไลค์&แชร์ แจกแคชฟรี 100\r\n', 3, 0, '97389_1705402983.gif', 'http://www.angeling-ro.com/', 'https://bit.ly/3e5bsaI', 'https://bit.ly/3u5e12l', 0, '2021-05-25 11:33:52', '2021-06-09 08:42:20'),
(14, 'ฤฆฆฟห', 1, '&lt;p&gt;ฤฆฤหฤฆ&lt;&#x2F;p&gt;', 3, 0, '1623213911055.jpeg', NULL, NULL, NULL, 0, '2021-06-09 04:45:11', '2021-06-09 07:37:55'),
(15, '(ฉ()(', 1, '&lt;p&gt;(ป&lt;&#x2F;p&gt;', 2, 0, '1623213922790.jpeg', NULL, NULL, NULL, 0, '2021-06-09 04:45:22', '2021-06-09 05:15:13'),
(21, 'asdsad', 1, '&lt;p&gt;asdasdasd&lt;&#x2F;p&gt;', 4, 0, '1623224452897.jpeg', NULL, NULL, NULL, 0, '2021-06-09 07:40:52', '2021-06-09 07:42:14'),
(22, 'qwewqe', 1, '&lt;p&gt;asdsadas&lt;&#x2F;p&gt;', 4, 0, '1623224503561.png', NULL, NULL, NULL, 0, '2021-06-09 07:41:43', '2021-06-09 07:41:43'),
(23, 'serverName', 1, 'serverDetail', 6, 0, '1624868841001.jpeg', NULL, 'undefined', 'undefined', 0, '2021-06-28 15:27:21', '2021-06-28 15:27:21'),
(24, 'serverName', 1, 'serverDetail', 6, 0, '1624868882581.jpeg', NULL, 'undefined', 'undefined', 0, '2021-06-28 15:28:02', '2021-06-28 15:28:02'),
(25, 'serverName', 1, 'serverDetail', 6, 0, '1624869051604.jpeg', NULL, 'undefined', 'undefined', 0, '2021-06-28 15:30:51', '2021-06-28 15:30:51'),
(26, 'serverName', 1, 'serverDetail', 6, 0, '1624869085884.jpeg', NULL, 'undefined', 'undefined', 0, '2021-06-28 15:31:25', '2021-06-28 15:31:25'),
(27, 'serverName', 1, 'serverDetail', 6, 0, '1624869141005.jpeg', NULL, 'undefined', 'undefined', 0, '2021-06-28 15:32:21', '2021-06-28 15:32:21'),
(28, 'serverNamea', 1, 'serverDetail', 6, 0, '1624869442270.jpeg', NULL, 'undefined', 'undefined', 0, '2021-06-28 15:37:22', '2021-06-28 15:37:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(10) NOT NULL,
  `email` varchar(120) NOT NULL,
  `role` int(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `phoneNumber`, `email`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '$2y$12$OO/1LdvluL.lAX6vIdk/..3NhwZNdBtuGBmZSp2kLXJ3i9S6fsygK', '0980173318', 'admin@admin.com', 1, '2021-05-25 11:14:05', '2021-05-25 11:14:05'),
(68, 'mahdee007', '$2a$10$pQpfPfBXCJPwVyESM8J55O0ITzg2aM5a9XqTZA/dUJQPLK8mCjzXG', '0843958782', 'mahdeedaao@gmail.com', 0, '2021-05-27 06:44:06', '2021-05-27 06:44:06'),
(69, 'xxx123xxx123', '$2a$10$.jXqW7rp9i0E3pYFJzxxHOV9z2Ch96t0l8eLtATkUJ4P7xle38WxW', '1234567789', 'xxx123@xxx123.com', 0, '2021-05-31 06:05:47', '2021-05-31 06:05:47'),
(70, '1asdaswqeqw', '1asdaswqeqw', '0810990397', '1asdaswqeqw@1asdaswqeqw.com', 0, '2021-06-26 23:02:09', '2021-06-26 23:02:09'),
(71, '1asdaswqeqw1', '$2a$10$nbwxlhhDT96xEV31rR50we8aAYUgqDXT60XSTZyrH2VVZpm8vA2Ru', '0810990397', '1asdaswqeqw1@1asdaswqeqw.com', 0, '2021-06-26 23:15:47', '2021-06-26 23:15:47'),
(72, '1asdaswqeqw1s', '$2a$10$QUQpwHJvCb7t.ZrGzUVkge7nR0BFVNuzHHHfja9zBNZOOr5zMEnLK', '0810990397', '1asdaswqeqw1@1asdaswqeqw.comd', 0, '2021-06-26 23:23:10', '2021-06-26 23:23:10'),
(73, '1asdaswqeqw1ss', '$2a$10$SPiGhuQo3i/88Q/2K0Ovbe7kz.InXruaVDzhy9uTQhQpx0mryM3UG', '0810990397', '1asdaswqeqw1@1asdaswqeqw.comdd', 0, '2021-06-26 23:23:52', '2021-06-26 23:23:52'),
(74, '1asdaswqeqw1ssd', '$2a$10$45fSQyN08PcHsUnVNLhTZOoW1yAzcXqvjTIDC4lDuGdjDR.8ZlCGi', '0810990397', '1asdaswqeqw1@1asdaswqeqw.comddq', 0, '2021-06-26 23:24:51', '2021-06-26 23:24:51'),
(75, 'qweasdqwe', '$2a$10$/Y7dHQMisH.c4GFssgEvbuTJ8r5xLwyD3JjCd577Nmp.mdbOU1UI.', '0810990397', '1asdaswaqeqw1@1asdaswqeqw.comddq', 0, '2021-06-26 23:26:04', '2021-06-26 23:26:04');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `vote_id` int(11) NOT NULL,
  `vote_user` int(11) DEFAULT NULL,
  `vote_server` int(11) NOT NULL,
  `vote_score` int(11) NOT NULL DEFAULT '1',
  `ip_address` varchar(255) NOT NULL,
  `id_game` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`vote_id`, `vote_user`, `vote_server`, `vote_score`, `ip_address`, `id_game`, `createdAt`, `updatedAt`) VALUES
(16, NULL, 4, 1, '', 'asdsaddd', '2021-05-28 07:59:09', '2021-05-28 07:59:09'),
(17, NULL, 4, 1, 'ipAddress', 'asdsadddd', '2021-05-28 08:00:08', '2021-05-28 08:00:08'),
(18, NULL, 4, 1, '::ffff:192.168.47.124', 'asdsaddd', '2021-05-28 08:00:31', '2021-05-28 08:00:31'),
(19, NULL, 4, 1, '::ffff:192.168.47.124', 'asdsadddaasw', '2021-05-28 08:01:37', '2021-05-28 08:01:37'),
(20, NULL, 4, 1, '::ffff:192.168.47.124', '', '2021-05-28 08:02:45', '2021-05-28 08:02:45'),
(21, NULL, 5, 1, '::ffff:192.168.47.124', 'sadsad', '2021-05-28 08:02:52', '2021-05-28 08:02:52'),
(22, NULL, 5, 1, '::ffff:192.168.47.124', 'sadsad', '2021-05-28 08:10:48', '2021-05-28 08:10:48'),
(23, NULL, 5, 1, '::ffff:192.168.47.124', 'sadsad', '2021-05-28 08:11:48', '2021-05-28 08:11:48'),
(24, NULL, 5, 1, '::ffff:192.168.47.124', 'sadsad', '2021-05-28 08:12:48', '2021-05-28 08:12:48'),
(25, NULL, 2, 1, '::ffff:192.168.47.124', 'pstpmn', '2021-05-28 08:12:58', '2021-05-28 08:12:58'),
(26, NULL, 2, 1, '::ffff:192.168.47.124', '', '2021-05-28 08:14:17', '2021-05-28 08:14:17'),
(27, NULL, 2, 1, '::ffff:192.168.47.124', '', '2021-05-28 08:18:32', '2021-05-28 08:18:32'),
(28, NULL, 2, 1, '::ffff:192.168.47.124', '', '2021-05-28 08:19:41', '2021-05-28 08:19:41'),
(29, NULL, 2, 1, '::ffff:192.168.47.123', 'asdwq', '2021-05-28 08:19:43', '2021-05-28 08:19:43'),
(30, NULL, 3, 1, '::ffff:192.168.47.124', '', '2021-05-28 08:20:36', '2021-05-28 08:20:36'),
(31, NULL, 3, 1, '::ffff:192.168.47.123', 'l;l;', '2021-05-28 08:21:11', '2021-05-28 08:21:11'),
(32, NULL, 3, 1, '::ffff:192.168.47.124', '', '2021-05-28 08:22:44', '2021-05-28 08:22:44'),
(33, NULL, 2, 1, '::ffff:192.168.47.124', '', '2021-05-28 08:23:11', '2021-05-28 08:23:11'),
(34, NULL, 2, 1, '::ffff:192.168.47.124', '', '2021-05-28 08:24:11', '2021-05-28 08:24:11'),
(35, NULL, 3, 1, '::ffff:192.168.47.124', '', '2021-05-28 08:24:29', '2021-05-28 08:24:29'),
(36, NULL, 3, 1, '::ffff:192.168.47.123', '', '2021-05-28 08:24:48', '2021-05-28 08:24:48'),
(37, NULL, 2, 1, '::ffff:192.168.47.123', 'kang', '2021-05-28 08:25:09', '2021-05-28 08:25:09'),
(38, NULL, 2, 1, '::ffff:192.168.47.124', 'kang1', '2021-05-28 08:25:37', '2021-05-28 08:25:37'),
(39, NULL, 2, 1, '::ffff:192.168.47.124', 'kang1', '2021-05-28 08:58:25', '2021-05-28 08:58:25'),
(40, NULL, 2, 1, '::ffff:192.168.47.124', 'kang1', '2021-05-28 09:15:31', '2021-05-28 09:15:31'),
(41, NULL, 2, 1, '::ffff:192.168.47.124', 'kang1', '2021-05-28 09:18:42', '2021-05-28 09:18:42'),
(42, NULL, 2, 1, '::ffff:192.168.47.124', 'kang1', '2021-05-28 09:19:58', '2021-05-28 09:19:58'),
(43, NULL, 2, 1, '::ffff:192.168.47.124', 'kang1', '2021-05-28 09:21:20', '2021-05-28 09:21:20'),
(44, NULL, 2, 1, '::ffff:192.168.47.124', 'kang1', '2021-05-28 09:24:32', '2021-05-28 09:24:32'),
(47, NULL, 2, 1, '::ffff:192.168.47.124', 'kang1', '2021-05-28 09:35:47', '2021-05-28 09:35:47'),
(48, NULL, 3, 1, '::ffff:192.168.47.124', 'kang1', '2021-05-28 09:35:52', '2021-05-28 09:35:52'),
(49, NULL, 4, 1, '::ffff:192.168.47.124', 'kang', '2021-05-28 09:36:23', '2021-05-28 09:36:23'),
(50, NULL, 3, 1, '::ffff:192.168.47.124', '', '2021-05-28 09:36:54', '2021-05-28 09:36:54'),
(51, NULL, 2, 1, '::ffff:192.168.47.124', '4545', '2021-05-28 09:37:07', '2021-05-28 09:37:07'),
(52, NULL, 4, 1, '::ffff:192.168.47.124', '4545', '2021-05-28 09:37:24', '2021-05-28 09:37:24'),
(54, NULL, 5, 1, '::ffff:192.168.47.124', '4545', '2021-05-28 09:37:33', '2021-05-28 09:37:33'),
(55, NULL, 2, 1, '::ffff:192.168.47.110', 'rrr', '2021-05-28 10:09:43', '2021-05-28 10:09:43'),
(56, NULL, 2, 1, '::ffff:192.168.47.110', 'sss', '2021-05-28 10:12:30', '2021-05-28 10:12:30'),
(57, NULL, 2, 1, '::ffff:192.168.47.110', 'aaa', '2021-05-28 10:14:57', '2021-05-28 10:14:57'),
(58, NULL, 4, 1, '::ffff:192.168.47.110', '', '2021-05-28 10:16:22', '2021-05-28 10:16:22'),
(59, NULL, 4, 1, '::ffff:192.168.47.110', 'sss', '2021-05-28 10:17:28', '2021-05-28 10:17:28'),
(60, NULL, 5, 1, '::ffff:192.168.47.124', '4545', '2021-05-28 10:19:27', '2021-05-28 10:19:27'),
(61, NULL, 5, 1, '::ffff:192.168.47.124', '4545', '2021-05-28 10:24:23', '2021-05-28 10:24:23'),
(62, NULL, 4, 1, '::ffff:192.168.47.124', '4545', '2021-05-28 10:25:23', '2021-05-28 10:25:23'),
(63, NULL, 2, 1, '::ffff:192.168.47.124', '4545', '2021-05-28 10:26:00', '2021-05-28 10:26:00'),
(64, NULL, 3, 1, '::ffff:192.168.47.124', '4545', '2021-05-28 10:26:15', '2021-05-28 10:26:15'),
(65, NULL, 4, 1, '::ffff:192.168.47.124', '4545', '2021-05-28 10:26:34', '2021-05-28 10:26:34'),
(66, NULL, 5, 1, '::ffff:192.168.47.124', '4545', '2021-05-28 10:27:00', '2021-05-28 10:27:00'),
(67, NULL, 3, 1, '::ffff:192.168.47.124', '4545', '2021-05-28 10:27:33', '2021-05-28 10:27:33'),
(68, NULL, 3, 1, '::ffff:192.168.47.124', '4545', '2021-05-28 10:28:33', '2021-05-28 10:28:33'),
(69, NULL, 4, 1, '::ffff:192.168.47.124', '4545', '2021-05-28 10:28:42', '2021-05-28 10:28:42'),
(70, NULL, 4, 1, '::ffff:192.168.47.110', 'dd', '2021-05-28 10:30:13', '2021-05-28 10:30:13'),
(71, NULL, 4, 1, '::ffff:192.168.47.110', 'aaaa', '2021-05-28 10:31:51', '2021-05-28 10:31:51'),
(72, NULL, 4, 1, '::ffff:192.168.47.110', 'aaaa', '2021-05-28 10:32:53', '2021-05-28 10:32:53'),
(73, NULL, 4, 1, '::ffff:192.168.47.124', 'aaaa1', '2021-05-28 10:33:43', '2021-05-28 10:33:43'),
(74, NULL, 4, 1, '::ffff:192.168.47.110', 'ggggg', '2021-05-31 02:36:51', '2021-05-31 02:36:51'),
(75, NULL, 4, 1, '::ffff:192.168.47.110', 'fff', '2021-05-31 02:38:13', '2021-05-31 02:38:13'),
(76, NULL, 4, 1, '::ffff:192.168.47.124', 'adasd', '2021-05-31 02:38:38', '2021-05-31 02:38:38'),
(77, NULL, 4, 1, '::ffff:192.168.47.124', 'adasd', '2021-05-31 02:39:56', '2021-05-31 02:39:56'),
(78, NULL, 4, 1, '::ffff:192.168.47.124', 'asdsad', '2021-05-31 02:41:50', '2021-05-31 02:41:50'),
(79, NULL, 8, 1, '::ffff:192.168.47.124', 'qweqwe', '2021-05-31 02:42:16', '2021-05-31 02:42:16'),
(80, NULL, 15, 1, '::ffff:192.168.47.124', '', '2021-06-09 05:15:13', '2021-06-09 05:15:13'),
(81, NULL, 4, 1, '::ffff:192.168.47.124', '', '2021-06-09 07:09:06', '2021-06-09 07:09:06'),
(82, NULL, 12, 1, '::ffff:192.168.47.124', '', '2021-06-09 07:09:22', '2021-06-09 07:09:22'),
(83, NULL, 6, 1, '::ffff:192.168.47.124', '', '2021-06-09 07:10:35', '2021-06-09 07:10:35'),
(84, NULL, 2, 1, '::ffff:192.168.47.124', '', '2021-06-09 07:15:41', '2021-06-09 07:15:41'),
(85, NULL, 4, 1, '::ffff:192.168.47.110', '', '2021-06-09 07:36:56', '2021-06-09 07:36:56'),
(86, NULL, 12, 1, '::ffff:192.168.47.110', '', '2021-06-09 07:37:18', '2021-06-09 07:37:18'),
(87, NULL, 14, 1, '::ffff:192.168.47.110', '', '2021-06-09 07:37:55', '2021-06-09 07:37:55'),
(88, NULL, 7, 1, '::ffff:192.168.47.124', '', '2021-06-09 07:42:03', '2021-06-09 07:42:03'),
(89, NULL, 21, 1, '::ffff:192.168.47.124', '', '2021-06-09 07:42:14', '2021-06-09 07:42:14'),
(90, NULL, 12, 1, '::ffff:192.168.47.124', 'กั้ง', '2021-06-09 08:44:20', '2021-06-09 08:42:20'),
(91, NULL, 6, 1, '127.0.0.1', '', '2021-06-27 16:25:35', '2021-06-09 10:12:35'),
(92, NULL, 6, 1, '127.0.0.1', 'undefined', '2021-06-27 16:34:51', '2021-06-27 16:34:51'),
(93, NULL, 6, 1, '127.0.0.1', 'undefined', '2021-06-27 17:06:08', '2021-06-27 17:06:08'),
(94, NULL, 6, 1, '127.0.0.1', 'undefined', '2021-06-27 17:24:20', '2021-06-27 17:24:20'),
(95, NULL, 5, 1, '127.0.0.1', 'undefined', '2021-06-27 17:24:42', '2021-06-27 17:24:42'),
(96, NULL, 5, 1, '127.0.0.1', 'undefined', '2021-06-27 17:45:51', '2021-06-27 17:45:51'),
(97, NULL, 5, 1, '127.0.0.1', 'undefined', '2021-06-27 17:50:24', '2021-06-27 17:50:24'),
(102, NULL, 6, 1, '127.0.0.1', 'undefined', '2021-06-27 20:44:19', '2021-06-27 20:44:19'),
(103, NULL, 6, 1, '127.0.0.1', 'undefined', '2021-06-27 20:45:19', '2021-06-27 20:45:19'),
(104, NULL, 6, 1, '127.0.0.1', 'undefined', '2021-06-27 20:47:08', '2021-06-27 20:47:08'),
(105, NULL, 6, 1, '127.0.0.1', 'undefined', '2021-06-27 20:48:26', '2021-06-27 20:48:26'),
(106, NULL, 6, 1, '127.0.0.1', 'undefined', '2021-06-27 20:50:02', '2021-06-27 20:50:02'),
(107, NULL, 7, 1, '127.0.0.1', 'undefined', '2021-06-27 20:50:42', '2021-06-27 20:50:42'),
(108, NULL, 7, 1, '127.0.0.1', 'undefined', '2021-06-27 20:51:42', '2021-06-27 20:51:42'),
(109, NULL, 7, 1, '127.0.0.1', 'undefined', '2021-06-27 20:53:13', '2021-06-27 20:53:13'),
(110, NULL, 7, 1, '127.0.0.1', 'undefined', '2021-06-27 20:54:14', '2021-06-27 20:54:14'),
(111, NULL, 7, 1, '127.0.0.1', 'undefined', '2021-06-27 20:59:11', '2021-06-27 20:59:11'),
(112, NULL, 7, 1, '127.0.0.1', 'undefined', '2021-06-27 21:00:20', '2021-06-27 21:00:20'),
(113, NULL, 7, 1, '127.0.0.1', 'undefined', '2021-06-27 21:01:20', '2021-06-27 21:01:20'),
(114, NULL, 7, 1, '127.0.0.1', 'undefined', '2021-06-27 21:12:20', '2021-06-27 21:12:20'),
(115, NULL, 6, 1, '127.0.0.1', 'undefined', '2021-06-27 21:13:11', '2021-06-27 21:13:11'),
(116, NULL, 7, 1, '127.0.0.1', 'undefined', '2021-06-27 21:13:20', '2021-06-27 21:13:20'),
(117, NULL, 7, 1, '127.0.0.1', 'undefined', '2021-06-27 22:33:12', '2021-06-27 22:33:12'),
(124, NULL, 2, 1, '127.0.0.1', 'undefined', '2021-06-27 22:36:04', '2021-06-27 22:36:04'),
(125, NULL, 6, 1, '127.0.0.1', 'undefined', '2021-06-27 22:36:14', '2021-06-27 22:36:14'),
(143, NULL, 2, 1, '127.0.0.1', 'undefined', '2021-06-27 22:45:08', '2021-06-27 22:45:08'),
(144, NULL, 2, 1, '127.0.0.1', 'undefined', '2021-06-27 22:56:56', '2021-06-27 22:56:56'),
(145, NULL, 6, 3, '::ffff:127.0.0.1', NULL, '2021-06-30 17:10:06', '2021-06-30 17:10:06'),
(146, NULL, 6, 3, '::ffff:127.0.0.1', NULL, '2021-06-30 17:11:10', '2021-06-30 17:11:10'),
(147, NULL, 6, 3, '::ffff:127.0.0.1', NULL, '2021-06-30 17:12:10', '2021-06-30 17:12:10'),
(148, NULL, 6, 3, '::ffff:127.0.0.1', NULL, '2021-06-30 17:13:10', '2021-06-30 17:13:10'),
(149, NULL, 6, 1, '::ffff:127.0.0.1', NULL, '2021-06-30 17:16:27', '2021-06-30 17:16:27'),
(150, NULL, 6, 1, '::ffff:127.0.0.1', NULL, '2021-06-30 17:17:27', '2021-06-30 17:17:27'),
(151, NULL, 6, 1, '::ffff:127.0.0.1', NULL, '2021-06-30 17:18:27', '2021-06-30 17:18:27'),
(152, NULL, 6, 3, '::ffff:127.0.0.1', NULL, '2021-06-30 17:19:27', '2021-06-30 17:19:27'),
(153, NULL, 6, 3, '::ffff:127.0.0.1', NULL, '2021-06-30 17:20:27', '2021-06-30 17:20:27'),
(154, NULL, 8, 1, '::ffff:127.0.0.1', NULL, '2021-06-30 17:21:04', '2021-06-30 17:21:04'),
(155, NULL, 6, 3, '::ffff:127.0.0.1', NULL, '2021-06-30 17:22:40', '2021-06-30 17:22:40'),
(156, NULL, 6, 3, '::ffff:127.0.0.1', NULL, '2021-06-30 17:23:59', '2021-06-30 17:23:59'),
(157, NULL, 6, 3, '::ffff:127.0.0.1', NULL, '2021-06-30 17:25:56', '2021-06-30 17:25:56'),
(159, NULL, 6, 1, '::ffff:127.0.0.1', NULL, '2021-06-30 17:27:35', '2021-06-30 17:27:35'),
(160, NULL, 6, 3, '::ffff:127.0.0.1', NULL, '2021-06-30 17:29:43', '2021-06-30 17:29:43'),
(161, NULL, 6, 3, '::ffff:127.0.0.1', NULL, '2021-06-30 17:30:44', '2021-06-30 17:30:44'),
(162, NULL, 6, 1, '::ffff:127.0.0.1', NULL, '2021-06-30 17:31:45', '2021-06-30 17:31:45');

-- --------------------------------------------------------

--
-- Table structure for table `wheeltovotes`
--

CREATE TABLE `wheeltovotes` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `server_id` int(255) NOT NULL,
  `score_votes` int(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dueDate` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wheeltovotes`
--

INSERT INTO `wheeltovotes` (`id`, `user_id`, `server_id`, `score_votes`, `createdAt`, `dueDate`) VALUES
(1, 1, 6, 3, '2021-06-30 20:27:01', '1625145899991'),
(2, 1, 6, 5, '2021-06-30 13:27:10', '1625146029935'),
(3, 1, 6, 3, '2021-06-30 13:29:13', '1625146153765'),
(4, 1, 6, 1, '2021-06-30 13:29:15', '1625146155701'),
(5, 1, 6, 3, '2021-06-30 13:29:16', '1625146156578'),
(6, 1, 6, 5, '2021-06-30 13:29:32', '1625146172152'),
(7, 1, 6, 7, '2021-06-30 14:32:40', '1625149960103'),
(8, 1, 6, 1, '2021-06-30 14:34:14', '1625150054646'),
(9, 1, 6, 7, '2021-06-30 14:44:17', '1625150657105'),
(10, 1, 6, 5, '2021-06-30 14:44:54', '1625150694108'),
(11, 1, 6, 7, '2021-06-30 14:45:40', '1625150740664'),
(12, 1, 6, 1, '2021-06-30 14:46:16', '1625150776061'),
(13, 1, 6, 1, '2021-06-30 14:46:33', '1625150793263'),
(14, 1, 6, 5, '2021-06-30 14:47:56', '1625150876045'),
(15, 1, 6, 7, '2021-06-30 14:48:19', '1625150899558'),
(16, 1, 6, 5, '2021-06-30 14:49:08', '1625150948010'),
(17, 1, 6, 1, '2021-06-30 14:53:09', '1625151188931'),
(18, 1, 6, 7, '2021-06-30 14:53:38', '1625151217942'),
(19, 1, 6, 1, '2021-06-30 14:53:58', '1625064855671'),
(20, 1, 6, 10, '2021-06-30 14:54:36', '1625064855671'),
(21, 1, 6, 10, '2021-06-30 14:55:35', '1625151335851'),
(22, 1, 6, 5, '2021-06-30 14:55:55', '1625151355847'),
(23, 1, 6, 5, '2021-06-30 14:56:50', '1625065016393'),
(24, 1, 6, 10, '2021-06-30 14:57:06', '1625065033069'),
(25, 1, 6, 1, '2021-06-30 14:57:55', '1625151475790'),
(26, 1, 6, 5, '2021-06-30 14:58:22', '1625151502119'),
(27, 1, 6, 10, '2021-06-30 14:58:33', '1625151513452'),
(28, 1, 6, 3, '2021-06-30 14:58:52', '1625151532183'),
(29, 1, 6, 7, '2021-06-30 14:59:05', '1625151545366'),
(30, 1, 6, 5, '2021-06-30 14:59:14', '1625151554588'),
(31, 1, 6, 3, '2021-06-30 14:59:44', '1625151584590'),
(32, 1, 6, 1, '2021-06-30 14:59:58', '1625151597903'),
(33, 1, 6, 10, '2021-06-30 15:00:05', '1625151605120'),
(34, 1, 6, 10, '2021-06-30 15:00:13', '1625065226805'),
(35, 1, 6, 10, '2021-06-30 15:00:44', '1625151644660'),
(36, 1, 6, 3, '2021-06-30 15:00:48', '1625073785502'),
(37, 69, 6, 3, '2021-06-30 15:09:05', '1625073785502'),
(38, 69, 6, 3, '2021-06-30 17:24:21', '1625073785502'),
(39, 69, 6, 7, '2021-06-30 17:25:44', '1625160344916'),
(40, 1, 6, 3, '2021-06-30 17:29:22', '1625073785502');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category_games`
--
ALTER TABLE `category_games`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `delay_votes`
--
ALTER TABLE `delay_votes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reset_rankings`
--
ALTER TABLE `reset_rankings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `servers`
--
ALTER TABLE `servers`
  ADD PRIMARY KEY (`server_id`),
  ADD KEY `server_user` (`server_user`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`vote_id`),
  ADD KEY `vote_server` (`vote_server`),
  ADD KEY `vote_user` (`vote_user`);

--
-- Indexes for table `wheeltovotes`
--
ALTER TABLE `wheeltovotes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category_games`
--
ALTER TABLE `category_games`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `delay_votes`
--
ALTER TABLE `delay_votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reset_rankings`
--
ALTER TABLE `reset_rankings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `servers`
--
ALTER TABLE `servers`
  MODIFY `server_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `vote_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT for table `wheeltovotes`
--
ALTER TABLE `wheeltovotes`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `servers`
--
ALTER TABLE `servers`
  ADD CONSTRAINT `servers_ibfk_1` FOREIGN KEY (`server_user`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `servers_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category_games` (`category_id`);

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`vote_user`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`vote_server`) REFERENCES `servers` (`server_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
