-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 12 月 27 日 10:35
-- 服务器版本: 5.5.53
-- PHP 版本: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `claws2`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `startTime` varchar(255) NOT NULL,
  `endTime` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `startTime`, `endTime`) VALUES
(1, 'admin', 'admin', '2017/11/15 00:00:00', '2017/12/31 00:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `get_prize_info`
--

CREATE TABLE IF NOT EXISTS `get_prize_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(255) NOT NULL,
  `prize_index` int(11) NOT NULL COMMENT '几等奖',
  `prize_name` varchar(255) NOT NULL COMMENT '奖品名',
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL COMMENT '省',
  `time` int(11) NOT NULL COMMENT '抽奖时间',
  `ip` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `get_prize_info`
--

INSERT INTO `get_prize_info` (`id`, `openId`, `prize_index`, `prize_name`, `name`, `phone`, `address`, `province`, `time`, `ip`) VALUES
(1, 'ougW4w4Vb2wxJil7kGpnYjF53_uM', 0, '未中奖', '', '', '', '海南省', 1503900524, '192.168.3.70'),
(2, 'ougW4w4Vb2wxJil7kGpnYjF53_uM', 1, '一等奖', '', '', '', '海南省', 1503900600, '192.168.3.70'),
(3, 'ougW4w4Vb2wxJil7kGpnYjF53_uM', 0, '未中奖', '', '', '', '江苏省', 1503902260, '192.168.3.6'),
(4, 'ougW4w4Vb2wxJil7kGpnYjF53_uM2', 0, '未中奖', '', '', '', '江苏省', 1503902327, '192.168.3.6');

-- --------------------------------------------------------

--
-- 表的结构 `member`
--

CREATE TABLE IF NOT EXISTS `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(255) NOT NULL,
  `surplus_num` int(11) NOT NULL DEFAULT '3' COMMENT '今日剩余次数',
  `is_two` int(11) NOT NULL DEFAULT '0' COMMENT '第二次进',
  `isUsed` int(2) NOT NULL DEFAULT '0' COMMENT '1:打开',
  `ip` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `member`
--

INSERT INTO `member` (`id`, `openId`, `surplus_num`, `is_two`, `isUsed`, `ip`) VALUES
(1, 'ougW4w4Vb2wxJil7kGpnYjF53_uM', 2, 1, 0, '192.168.3.70'),
(2, 'ougW4wz5n2_2uNKl_N8ypC-dFESI', 3, 0, 0, '192.168.3.11');

-- --------------------------------------------------------

--
-- 表的结构 `prize_chance`
--

CREATE TABLE IF NOT EXISTS `prize_chance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(255) NOT NULL,
  `prize_index` int(11) NOT NULL COMMENT '几等奖',
  `prize_name` varchar(255) NOT NULL COMMENT '奖品名',
  `prize_describe` varchar(255) NOT NULL COMMENT '奖品描述',
  `chance` float NOT NULL COMMENT '中奖几率(百分率)',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

--
-- 转存表中的数据 `prize_chance`
--

INSERT INTO `prize_chance` (`id`, `img`, `prize_index`, `prize_name`, `prize_describe`, `chance`) VALUES
(7, 'upload/images/17-12-26-10-18-52.png', 1, '一等奖', '111xxx2', 0.11),
(26, 'upload/images/17-12-26-10-20-02.png', 3, '三等奖', '333xxx', 0.35),
(25, 'upload/images/17-12-26-10-19-02.png', 2, '二2等奖', '2223~', 0.22);

-- --------------------------------------------------------

--
-- 表的结构 `prize_info`
--

CREATE TABLE IF NOT EXISTS `prize_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prize_index` int(11) NOT NULL DEFAULT '0' COMMENT '几等奖',
  `region` varchar(255) NOT NULL COMMENT '地区',
  `max` int(11) NOT NULL COMMENT '此地区最多获奖人数',
  `surplus_num` int(11) NOT NULL COMMENT '剩余数量',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=47 ;

--
-- 转存表中的数据 `prize_info`
--

INSERT INTO `prize_info` (`id`, `prize_index`, `region`, `max`, `surplus_num`) VALUES
(1, 1, '北京市', 1, 1),
(2, 1, '山东省', 1, 1),
(3, 1, '河北省', 1, 1),
(4, 1, '辽宁省', 1, 1),
(5, 1, '四川省', 1, 1),
(6, 1, '上海市', 1, 1),
(7, 1, '广东省', 1, 1),
(8, 1, '浙江省', 1, 1),
(9, 1, '江苏省', 1, 1),
(10, 1, '湖北省', 1, 1),
(11, 2, '北京市', 30, 30),
(12, 2, '山东省', 30, 30),
(13, 2, '河北省', 30, 30),
(14, 2, '辽宁省', 30, 30),
(15, 2, '四川省', 30, 30),
(16, 2, '湖南省', 30, 30),
(17, 2, '上海市', 30, 30),
(18, 2, '广东省', 30, 30),
(19, 2, '浙江省', 30, 30),
(20, 2, '江苏省', 30, 30),
(21, 2, '湖北省', 30, 30),
(22, 2, '安徽省', 15, 15),
(23, 2, '河南省', 15, 15),
(24, 3, '北京市', 60, 60),
(25, 3, '山东省', 60, 60),
(26, 3, '河北省', 60, 60),
(27, 3, '辽宁省', 60, 60),
(28, 3, '四川省', 60, 60),
(29, 3, '湖南省', 60, 60),
(30, 3, '上海市', 60, 60),
(31, 3, '广东省', 60, 60),
(32, 3, '浙江省', 60, 60),
(33, 3, '江苏省', 60, 60),
(34, 3, '湖北省', 60, 60),
(35, 3, '安徽省', 30, 30),
(36, 3, '河南省', 30, 30),
(37, 3, '广西省', 30, 30),
(38, 3, '海南省', 30, 30),
(46, 2, '海南省', 15, 14);

-- --------------------------------------------------------

--
-- 表的结构 `update_test`
--

CREATE TABLE IF NOT EXISTS `update_test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `position` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `center1` varchar(255) NOT NULL,
  `center2` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='测试上传' AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
