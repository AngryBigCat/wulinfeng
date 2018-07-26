-- Adminer 4.3.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `accesstoken`;
CREATE TABLE `accesstoken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accessToken` varchar(255) NOT NULL,
  `expireTime` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `accesstoken` (`id`, `accessToken`, `expireTime`) VALUES
(1,	'8_SbsTIjDrBp5L5IDa5uTd2MjUJWWvxef7WlrMbIAaB5qKcA41UvXyv1g89utZVIrP2uGRGgoW8-q09VTCu6rx-XpH1kklKYazyYvi73sFF4VtepmwDeiZSFdl2InLle5lWfMuA1ZGN5abB0cIWUFiABAGEP',	1523420925);

DROP TABLE IF EXISTS `activityset`;
CREATE TABLE `activityset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `startTime` varchar(255) DEFAULT NULL,
  `endTime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

INSERT INTO `activityset` (`id`, `username`, `password`, `startTime`, `endTime`) VALUES
(1,	'admin',	'admin',	'2018-2-12 00:00:00',	'2019-2-12 00:00:00');

DROP TABLE IF EXISTS `information`;
CREATE TABLE `information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pv` int(11) NOT NULL DEFAULT '0' COMMENT '访问量',
  `uv` int(11) NOT NULL DEFAULT '0' COMMENT '独立访客',
  `pjsc` int(11) NOT NULL DEFAULT '0' COMMENT '平均时长',
  `zsc` int(11) NOT NULL DEFAULT '0' COMMENT '总时长',
  `jishu` int(11) NOT NULL DEFAULT '0' COMMENT '访问量基数',
  `jishu2` int(11) NOT NULL DEFAULT '0' COMMENT '独立访客基数',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `information` (`id`, `pv`, `uv`, `pjsc`, `zsc`, `jishu`, `jishu2`) VALUES
(1,	85,	26,	100,	8527,	44,	30);

DROP TABLE IF EXISTS `ips`;
CREATE TABLE `ips` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `ips` (`id`, `ip`) VALUES
(1,	'180.124.132.12'),
(2,	'61.151.178.174'),
(3,	'61.148.243.63'),
(4,	'114.242.249.148'),
(5,	'123.117.249.249'),
(6,	'1.89.224.15'),
(7,	'111.196.243.128'),
(8,	'117.136.0.232'),
(9,	'123.151.77.121'),
(10,	'125.39.132.92'),
(11,	'117.136.38.147'),
(12,	'123.117.254.21'),
(13,	'125.39.132.94'),
(14,	'61.52.149.151'),
(15,	'123.151.77.74'),
(16,	'125.39.46.47'),
(17,	'117.136.38.32'),
(18,	'117.136.104.223'),
(19,	'61.158.149.142'),
(20,	'114.242.250.154'),
(21,	'61.158.148.120'),
(22,	'123.151.77.123'),
(23,	'111.198.239.97'),
(24,	'111.196.242.94'),
(25,	'114.242.248.33'),
(26,	'123.120.172.11'),
(27,	'123.120.194.0'),
(28,	'115.35.178.42'),
(29,	'125.39.240.204');

DROP TABLE IF EXISTS `matchs`;
CREATE TABLE `matchs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matchName` varchar(255) NOT NULL,
  `imgUrl` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `matchs` (`id`, `matchName`, `imgUrl`) VALUES
(1,	'全国选拔赛',	'http://wlf.prh5.com/test13/server/admin/upload/images/18-03-14-18-25-35.png'),
(2,	'拳新一代晋级赛',	'http://wlf.prh5.com/test13/server/admin/upload/images/18-03-14-18-25-44.png'),
(3,	'世界功夫王者挑战赛',	'http://wlf.prh5.com/test13/server/admin/upload/images/18-03-14-18-25-52.png'),
(4,	'世界自由搏击排位赛',	'http://wlf.prh5.com/test13/server/admin/upload/images/18-03-14-18-25-58.png');

DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(255) NOT NULL DEFAULT '',
  `nickName` varchar(255) NOT NULL DEFAULT '' COMMENT '微信昵称',
  `topScore` int(11) NOT NULL DEFAULT '0',
  `hstScore` int(11) NOT NULL DEFAULT '0',
  `startNum` int(11) NOT NULL DEFAULT '0',
  `endNum` int(11) NOT NULL DEFAULT '0',
  `registerTime` int(11) NOT NULL DEFAULT '0',
  `remarks` varchar(255) NOT NULL DEFAULT '',
  `gameCode` varchar(255) NOT NULL DEFAULT '',
  `firstgame` varchar(255) NOT NULL DEFAULT '1',
  `headImg` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `mobile` varchar(255) NOT NULL DEFAULT '',
  `address` varchar(255) NOT NULL DEFAULT '',
  `ip` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

INSERT INTO `member` (`id`, `openId`, `nickName`, `topScore`, `hstScore`, `startNum`, `endNum`, `registerTime`, `remarks`, `gameCode`, `firstgame`, `headImg`, `name`, `mobile`, `address`, `ip`) VALUES
(1,	'oNh4m0_SSWJ5MVKICMj1IBJjZI6g',	'6K+66KiA',	0,	0,	0,	0,	1520918887,	'',	'',	'1',	'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL2kJiagfnZwtsDGV8oIumUqeylrdMMdeOBeamPEHrRWyIOuGbyJmaibEyCXrXzefob2Or2B69GLQ0Q/132',	'',	'',	'',	''),
(2,	'oNh4m07vJ-K87cx7ORraF52ILDDU',	'QW5ncnlDYXQ=',	400,	400,	2,	2,	1520918999,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/dSWf8qeSqSnWnNHFYuicyovq1VoaiaiajGJp4SIvQia9mvhGWTWcOB5icG93RQ8zUOXicJxuvQKWiaQpAalotjicfndfuA/132',	'',	'',	'',	'111.196.242.94'),
(3,	'oNh4m0-1sMmub5_fhLyF-U9kJPcY',	'5YiY5qC55p2J',	413,	413,	16,	5,	1520935273,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqS6wCEdy5tich7WBlpmYcynibDuVN6X4Vx1hTOULa5awyk1n0JUQkQFbOj6OzzkjZu2ibLuEhm09DBw/132',	'',	'',	'',	'180.124.132.12'),
(4,	'oNh4m02uycF9kVwXwTGKdDSWUL-A',	'5aiH',	448,	448,	11,	5,	1521007433,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLNkFNIUa4TP2Nsmhr1dv8temkOCwcgav3ib0OpsTzSrmRBG6ibOiaTVZmKqfLhgTR2fJegPpPyNsmGA/132',	'',	'',	'',	'180.124.132.12'),
(5,	'oNh4m07bOOSlYJ9D0fLJ-L3BQzso',	'5aSn5qmZ5a2Q',	574,	574,	4,	1,	1521007844,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/PKjByrJq0fUuyPYY7oPKFyc5htOGppxzSib6jI79QjKKz3cPibbA9hCOex0353t6lbTIEDcx1x0qQcEOlGB10AoQ/132',	'',	'',	'',	'180.124.132.12'),
(6,	'oNh4m00HiSGQoly73QLGV7nXmyyw',	'54Wn6YeO',	366,	366,	4,	1,	1521008427,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJSEM2Z8wJOIA05PmEFLI8iaIkSpVSzbbESYgRicjEnnFwKqIfAZricszKDjfA37WWcktSL3Vzssyxzg/132',	'',	'',	'',	'101.226.225.85'),
(7,	'oNh4m03jdfr9RuYs1rXAYEV2EJYA',	'5pat5rWq',	492,	492,	2,	1,	1521008499,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/jMPRSzmqMZiafuAicOKuHhJn6Fkz98xpabqJt7qhQiaBJtWdbTIhbuP3K5jWCC2SxnCgDmCZF93wzsibNowPQFibLBw/132',	'',	'',	'',	'61.151.179.84'),
(8,	'oNh4m0_Dt1EnBoKJRErs9cP8CBqs',	'5piO',	0,	0,	1,	0,	1521009293,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep3rdbnfxJzE5kduOhpRFquETQsicT3few9icUXO9uH1404lbE7Uu0bL8vRcttOcZpiamGr4oc0VNMQg/132',	'',	'',	'',	''),
(9,	'oNh4m068k01alQCa0fg3rYpa8lEs',	'6Iy55q2k55qE44CB5aSo6JC9',	470,	470,	4,	2,	1521009321,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLC7J2Pc268VcPySxRp6loSsicNQpeoha9M1rKgbfwsibf6HncYvD9HUic0cF1cfttFUiciah9Wt5PLriaA/132',	'',	'',	'',	'180.124.132.12'),
(10,	'oNh4m0yViDRxqzzIvLk3qNWoH8jQ',	'fuaciOS6ruWQm34=',	0,	0,	0,	0,	1521018790,	'',	'',	'1',	'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKF8P8qL3jHVkzqLOGjx5IKxSficNW24ic4gZXYs9uHsRKBP2DsSIm5KAzicSffSI3Uic5ZrdVibPNBRiag/132',	'',	'',	'',	''),
(11,	'oNh4m02VuNEv7WW9bc7rIk4UVGZE',	'V2FuZ1powq4=',	616,	616,	4,	3,	1521021119,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epKDoraVXuEEfhry3jIvqwzaoBKJZrU8L3Q0O9YaY0D3kzTRuiblq6JMUxj9logcUXxHG8NEialwibFA/132',	'',	'',	'',	'111.196.243.128'),
(12,	'oNh4m08kc6DXf3E0XlgRofF6S-E0',	'Te+8hzZlcg==',	703,	703,	8,	8,	1521079015,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIqGqvykdEJVDFOMM0ELdBMtBC9ajjafFHgSFiazHc6qjZnaaKBuaRCcSoVPmdZ7X6xuw5PHxAgFow/132',	'',	'',	'',	'123.117.254.21'),
(13,	'oNh4m09jNpvSgOF2XVOT1R_vt9e0',	'5r2H5r2H',	524,	524,	4,	4,	1521081095,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epfbhxngsrZsDAibMaJq6drLhLslxgFFPY8sIoPib1zjkNOibZaelMyYZbIEhb7PDcULP2XDfjMgo8JQ/132',	'',	'',	'',	'123.120.172.11'),
(14,	'oNh4m0_kggLsWTNfQRZEbM46IzcU',	'QWdpbGUgYmVhc3Qq',	354,	354,	1,	1,	1521081408,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/1jjYm2P76PZYkzsRaam7AQUK0esENj91zIiabUiaMnz92ibdVgbQje9YJicKBTict3mJCqvdOtHPQCQmMZQNYEK3xUw/132',	'',	'',	'',	'1.89.224.15'),
(15,	'oNh4m03IOkcvbLPV0w3IxbzLyIqU',	'5b6Q5bm/5b+X',	40,	40,	1,	1,	1521427305,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er0zSvSVnvd3FonwHN8XvicwhumPq2W2gZqR8tJfe4CEVr0DetqUiamF6Ia3hGH3u3LkdibzVdfam3bA/132',	'',	'',	'',	'125.39.132.92'),
(16,	'oNh4m09avKASzNdLwPK45RgZx5Uo',	'5LiW5bmz',	91,	91,	3,	3,	1521446452,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq0yibzmfxulkysUJrMduSdQnLTicQCcDhPW3wlXDgfFS44CDJh3Tam1CcZa33ajRIOn7ch0KtyInmQ/132',	'',	'',	'',	'125.39.132.94'),
(17,	'oNh4m04Jfq-GeAe8j68emG99JjkA',	'56uH5a+25a+2',	231,	231,	2,	2,	1521447249,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqTHPJxrNanicydPZV3LSrj9geCdDjaicXDemt0bzR3YvnicUjZ9zWKoTCUQgRicqykK0ITebCAAnCTeA/132',	'',	'',	'',	'61.52.149.151'),
(18,	'oNh4m02VIjs3ltSY_ODdAbQg8CXc',	'54Sh6aOb',	51,	51,	2,	1,	1521447279,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLVqiblReziczP0ZDPhaEnMnzC2XBe2tv57EiaMgQkYPuzEciaWzVXmica7uD1KdGEG7pqmBOlQGmuG0qA/132',	'',	'',	'',	'125.39.46.47'),
(19,	'oNh4m0-jZwucAqr09PNU2__vsm2k',	'6IOh5paH5Lic',	0,	0,	1,	1,	1521510772,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIlW9XB9w3Zp0TQ7s6YvVAzddPnJZpy2HLeiao4H8r0dcuY4fibhlQLw4F6gvvqddvPaib0todsY41xg/132',	'',	'',	'',	'117.136.104.223'),
(20,	'oNh4m0-ypto3pZ2Ts1D6ObQU_T60',	'5a2f5pyL',	252,	252,	2,	2,	1521510780,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL8rQJOMuXvlsYgvgm7sjULw1NmWhViakUmnVNeD7ePhMgANH1HSbUibyDdrdiaYMgM9icGhXAXOnqpYQ/132',	'',	'',	'',	'61.158.149.142'),
(21,	'oNh4m0-RG8q-MxKAxkvI2t-ZpEVw',	'6ICB5pu5IE1yLks=',	310,	310,	2,	2,	1521525990,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epJpmlccWw1XkM1fdbmj4vLM7aevV7Dx5aUrfk5YVRBOosl080cGXxNYTt3BQ9X4fLl8TdEYLqZ8A/132',	'',	'',	'',	'114.242.248.33'),
(22,	'oNh4m00OIQcjVpy-4TJtOZ64E1G8',	'5rC46L+c55qE5pil55Sf',	0,	0,	0,	0,	1521526415,	'',	'',	'1',	'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLwIrIwodFc6dEGcPvkA1r1sQEqHCDfpazYJ0Via23DOnxJsWW1OUpyiajUHBmvZEaC3UAYJPv3MVFA/132',	'',	'',	'',	''),
(23,	'oNh4m06ankfybz2hress-fv9mJjQ',	'TW9rc2hh',	541,	541,	3,	3,	1521528095,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELM7e1KUFhRibUr4TDaicfDKrElNshnRKhGV4ZZqbstxm7dTPgzzeovppsIJy7mpHk3ibefusG6M5XDw/132',	'',	'',	'',	'111.198.239.97'),
(24,	'oNh4m0zDnLbSMn-J-PUxe7mCywK4',	'5L2V5Yaw',	280,	280,	3,	2,	1521535438,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTItSGQRE3CwHhCADlMcOEniamSgEBJg2yP1aEBjdAcHWaYyNEWpWUh5ZMcd4mtJFODTSbMmHo6OyqA/132',	'',	'',	'',	'125.39.46.47'),
(25,	'oNh4m03WnAMnrxnE6yOMiInJF7Jg',	'Y3M=',	500,	500,	3,	2,	1521785491,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/mMrTHTKlwjq6tl4Jib9ae3xaPpDTalP8QXwDWFbBzL14IYhDRqlnFiadnjjicoV3rqPY3oVPFlYqmZcBJS1fjQrow/132',	'',	'',	'',	'123.151.77.74'),
(26,	'oNh4m08NdSEP-0SDLz6W66lOnI2A',	'6YOt6JKZ',	158,	158,	3,	2,	1523416751,	'',	'',	'',	'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLYOa9XGXpdWGCYnzWPKfXvaXzWibAt0GJia2weQavco4lzk4QEhnxD2XVBlZkbwfJnr0nt0tjLiaJZg/132',	'',	'',	'',	'123.151.77.74');

DROP TABLE IF EXISTS `playreport`;
CREATE TABLE `playreport` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(255) NOT NULL DEFAULT '',
  `score` int(11) NOT NULL DEFAULT '0',
  `gameInfo` varchar(2048) NOT NULL DEFAULT '',
  `thiscode` varchar(255) NOT NULL DEFAULT '',
  `remarks` varchar(255) NOT NULL DEFAULT '',
  `startTime` int(11) NOT NULL DEFAULT '0',
  `endTime` int(11) NOT NULL DEFAULT '0',
  `clientInfo` varchar(255) NOT NULL DEFAULT '',
  `ip` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

INSERT INTO `playreport` (`id`, `openId`, `score`, `gameInfo`, `thiscode`, `remarks`, `startTime`, `endTime`, `clientInfo`, `ip`) VALUES
(1,	'oNh4m0-1sMmub5_fhLyF-U9kJPcY',	50,	'{\"cs1\":\"0\",\"cs2\":\"0\",\"cs3\":\"50\",\"cs4\":\"0\",\"code1\":\"250\",\"code2\":\"4\",\"code3\":\"5\"}',	'1-1',	'',	1520995466,	1520995496,	'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36 wechatdevtools/0.22.203100 MicroMessenger/6.5.7 webview/0',	'114.235.62.3'),
(2,	'oNh4m0-1sMmub5_fhLyF-U9kJPcY',	70,	'{\"cs1\":\"2\",\"cs2\":\"0\",\"cs3\":\"50\",\"cs4\":\"0\",\"code1\":\"560\",\"code2\":\"16\",\"code3\":\"10\"}',	'4-2',	'',	1520996261,	1520996428,	'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36 wechatdevtools/0.22.203100 MicroMessenger/6.5.7 webview/0',	'114.235.62.3'),
(3,	'oNh4m02uycF9kVwXwTGKdDSWUL-A',	422,	'{\"cs1\":\"9\",\"cs2\":\"12\",\"cs3\":\"150\",\"cs4\":\"170\",\"code1\":\"2532\",\"code2\":\"5\",\"code3\":\"6\"}',	'1-1',	'',	1521007524,	1521007575,	'Mozilla/5.0 (Linux; Android 6.0; MX6 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043909 Mobile Safari/537.36 MicroMessenger/6.6.5.1280(0x26060533) NetType/WIFI Language/zh_CN',	'61.151.178.174'),
(4,	'oNh4m02uycF9kVwXwTGKdDSWUL-A',	423,	'{\"cs1\":\"9\",\"cs2\":\"13\",\"cs3\":\"100\",\"cs4\":\"220\",\"code1\":\"2961\",\"code2\":\"10\",\"code3\":\"12\"}',	'2-2',	'',	1521007624,	1521007664,	'Mozilla/5.0 (Linux; Android 6.0; MX6 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043909 Mobile Safari/537.36 MicroMessenger/6.6.5.1280(0x26060533) NetType/WIFI Language/zh_CN',	'61.151.178.174'),
(5,	'oNh4m07bOOSlYJ9D0fLJ-L3BQzso',	574,	'{\"cs1\":\"18\",\"cs2\":\"24\",\"cs3\":\"150\",\"cs4\":\"220\",\"code1\":\"4018\",\"code2\":\"6\",\"code3\":\"7\"}',	'1-1',	'',	1521007967,	1521008012,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'180.124.132.12'),
(6,	'oNh4m02uycF9kVwXwTGKdDSWUL-A',	448,	'{\"cs1\":\"9\",\"cs2\":\"8\",\"cs3\":\"150\",\"cs4\":\"200\",\"code1\":\"3584\",\"code2\":\"15\",\"code3\":\"18\"}',	'3-3',	'',	1521008217,	1521008259,	'Mozilla/5.0 (Linux; Android 6.0; MX6 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043909 Mobile Safari/537.36 MicroMessenger/6.6.5.1280(0x26060533) NetType/WIFI Language/zh_CN',	'61.151.178.174'),
(7,	'oNh4m00HiSGQoly73QLGV7nXmyyw',	366,	'{\"cs1\":\"9\",\"cs2\":\"26\",\"cs3\":\"150\",\"cs4\":\"100\",\"code1\":\"3660\",\"code2\":\"21\",\"code3\":\"8\"}',	'3-1',	'',	1521008817,	1521008884,	'Mozilla/5.0 (Linux; Android 7.0; FRD-AL00 Build/HUAWEIFRD-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043909 Mobile Safari/537.36 MicroMessenger/6.6.5.1280(0x26060533) NetType/WIFI Language/zh_CN',	'101.226.225.85'),
(8,	'oNh4m03jdfr9RuYs1rXAYEV2EJYA',	492,	'{\"cs1\":\"12\",\"cs2\":\"12\",\"cs3\":\"150\",\"cs4\":\"210\",\"code1\":\"4920\",\"code2\":\"16\",\"code3\":\"9\"}',	'2-1',	'',	1521008795,	1521009009,	'Mozilla/5.0 (Linux; Android 7.1.1; MX6 Build/NMF26O; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043909 Mobile Safari/537.36 MicroMessenger/6.6.5.1280(0x26060533) NetType/WIFI Language/zh_CN',	'61.151.179.84'),
(9,	'oNh4m068k01alQCa0fg3rYpa8lEs',	197,	'{\"cs1\":\"18\",\"cs2\":\"17\",\"cs3\":\"0\",\"cs4\":\"0\",\"code1\":\"2167\",\"code2\":\"10\",\"code3\":\"11\"}',	'1-1',	'',	1521009390,	1521009507,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Mobile/15A372 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'180.124.132.12'),
(10,	'oNh4m02uycF9kVwXwTGKdDSWUL-A',	72,	'{\"cs1\":\"7\",\"cs2\":\"2\",\"cs3\":\"0\",\"cs4\":\"0\",\"code1\":\"936\",\"code2\":\"40\",\"code3\":\"24\"}',	'8-4',	'',	1521009495,	1521009550,	'Mozilla/5.0 (Linux; Android 6.0; MX6 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043909 Mobile Safari/537.36 MicroMessenger/6.6.5.1280(0x26060533) NetType/WIFI Language/zh_CN',	'180.124.132.12'),
(11,	'oNh4m068k01alQCa0fg3rYpa8lEs',	470,	'{\"cs1\":\"12\",\"cs2\":\"0\",\"cs3\":\"150\",\"cs4\":\"200\",\"code1\":\"5640\",\"code2\":\"20\",\"code3\":\"22\"}',	'2-2',	'',	1521009544,	1521009603,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Mobile/15A372 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'180.124.132.12'),
(12,	'oNh4m02uycF9kVwXwTGKdDSWUL-A',	380,	'{\"cs1\":\"8\",\"cs2\":\"10\",\"cs3\":\"100\",\"cs4\":\"190\",\"code1\":\"5320\",\"code2\":\"45\",\"code3\":\"30\"}',	'9-5',	'',	1521009674,	1521009716,	'Mozilla/5.0 (Linux; Android 6.0; MX6 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043909 Mobile Safari/537.36 MicroMessenger/6.6.5.1280(0x26060533) NetType/WIFI Language/zh_CN',	'180.124.132.12'),
(13,	'oNh4m0-1sMmub5_fhLyF-U9kJPcY',	413,	'{\"cs1\":\"15\",\"cs2\":\"3\",\"cs3\":\"100\",\"cs4\":\"160\",\"code1\":\"4543\",\"code2\":\"28\",\"code3\":\"15\"}',	'7-3',	'',	1521016737,	1521016782,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'180.124.132.12'),
(14,	'oNh4m0-1sMmub5_fhLyF-U9kJPcY',	50,	'{\"cs1\":\"0\",\"cs2\":\"0\",\"cs3\":\"50\",\"cs4\":\"0\",\"code1\":\"800\",\"code2\":\"48\",\"code3\":\"20\"}',	'12-4',	'',	1521023323,	1521023366,	'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36 wechatdevtools/0.22.203100 MicroMessenger/6.5.7 webview/0',	'180.124.132.12'),
(15,	'oNh4m0-1sMmub5_fhLyF-U9kJPcY',	370,	'{\"cs1\":\"5\",\"cs2\":\"0\",\"cs3\":\"150\",\"cs4\":\"170\",\"code1\":\"6290\",\"code2\":\"52\",\"code3\":\"25\"}',	'13-5',	'',	1521023516,	1521023561,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'180.124.132.12'),
(16,	'oNh4m02VuNEv7WW9bc7rIk4UVGZE',	350,	'{\"cs1\":\"0\",\"cs2\":\"0\",\"cs3\":\"150\",\"cs4\":\"200\",\"code1\":\"4900\",\"code2\":\"24\",\"code3\":\"13\"}',	'2-1',	'',	1521076192,	1521076239,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/4G Language/zh_CN',	'114.242.249.148'),
(17,	'oNh4m02VuNEv7WW9bc7rIk4UVGZE',	616,	'{\"cs1\":\"20\",\"cs2\":\"16\",\"cs3\":\"150\",\"cs4\":\"250\",\"code1\":\"9240\",\"code2\":\"36\",\"code3\":\"26\"}',	'3-2',	'',	1521076278,	1521076325,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/4G Language/zh_CN',	'114.242.249.148'),
(18,	'oNh4m08kc6DXf3E0XlgRofF6S-E0',	581,	'{\"cs1\":\"16\",\"cs2\":\"11\",\"cs3\":\"150\",\"cs4\":\"260\",\"code1\":\"8134\",\"code2\":\"13\",\"code3\":\"14\"}',	'1-1',	'',	1521080965,	1521081110,	'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'123.117.249.249'),
(19,	'oNh4m09jNpvSgOF2XVOT1R_vt9e0',	430,	'{\"cs1\":\"13\",\"cs2\":\"0\",\"cs3\":\"100\",\"cs4\":\"200\",\"code1\":\"6450\",\"code2\":\"14\",\"code3\":\"15\"}',	'1-1',	'',	1521081134,	1521081179,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'123.117.249.249'),
(20,	'oNh4m08kc6DXf3E0XlgRofF6S-E0',	615,	'{\"cs1\":\"14\",\"cs2\":\"15\",\"cs3\":\"150\",\"cs4\":\"310\",\"code1\":\"9225\",\"code2\":\"26\",\"code3\":\"28\"}',	'2-2',	'',	1521081172,	1521081220,	'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'123.117.249.249'),
(21,	'oNh4m08kc6DXf3E0XlgRofF6S-E0',	641,	'{\"cs1\":\"17\",\"cs2\":\"11\",\"cs3\":\"150\",\"cs4\":\"310\",\"code1\":\"10256\",\"code2\":\"39\",\"code3\":\"42\"}',	'3-3',	'',	1521081262,	1521081323,	'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'123.117.249.249'),
(22,	'oNh4m09jNpvSgOF2XVOT1R_vt9e0',	524,	'{\"cs1\":\"20\",\"cs2\":\"4\",\"cs3\":\"150\",\"cs4\":\"170\",\"code1\":\"8384\",\"code2\":\"28\",\"code3\":\"30\"}',	'2-2',	'',	1521081469,	1521081515,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'123.117.249.249'),
(23,	'oNh4m0_kggLsWTNfQRZEbM46IzcU',	354,	'{\"cs1\":\"0\",\"cs2\":\"14\",\"cs3\":\"150\",\"cs4\":\"190\",\"code1\":\"5664\",\"code2\":\"15\",\"code3\":\"16\"}',	'1-1',	'',	1521081450,	1521081589,	'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E277 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'1.89.224.15'),
(24,	'oNh4m02VuNEv7WW9bc7rIk4UVGZE',	512,	'{\"cs1\":\"14\",\"cs2\":\"32\",\"cs3\":\"150\",\"cs4\":\"190\",\"code1\":\"8192\",\"code2\":\"48\",\"code3\":\"39\"}',	'4-3',	'',	1521083565,	1521083609,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'111.196.243.128'),
(25,	'oNh4m08kc6DXf3E0XlgRofF6S-E0',	20,	'{\"cs1\":\"2\",\"cs2\":\"0\",\"cs3\":\"0\",\"cs4\":\"0\",\"code1\":\"340\",\"code2\":\"52\",\"code3\":\"56\"}',	'4-4',	'',	1521087613,	1521087812,	'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'123.117.249.249'),
(26,	'oNh4m08kc6DXf3E0XlgRofF6S-E0',	458,	'{\"cs1\":\"11\",\"cs2\":\"18\",\"cs3\":\"150\",\"cs4\":\"180\",\"code1\":\"8244\",\"code2\":\"65\",\"code3\":\"70\"}',	'5-5',	'',	1521166089,	1521166131,	'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'123.117.249.249'),
(27,	'oNh4m03IOkcvbLPV0w3IxbzLyIqU',	40,	'{\"cs1\":\"4\",\"cs2\":\"0\",\"cs3\":\"0\",\"cs4\":\"0\",\"code1\":\"680\",\"code2\":\"16\",\"code3\":\"17\"}',	'1-1',	'',	1521427352,	1521427416,	'Mozilla/5.0 (Linux; Android 8.0; VTR-AL00 Build/HUAWEIVTR-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043909 Mobile Safari/537.36 MicroMessenger/6.6.5.1280(0x26060533) NetType/4G Language/zh_CN',	'125.39.132.92'),
(28,	'oNh4m08kc6DXf3E0XlgRofF6S-E0',	58,	'{\"cs1\":\"0\",\"cs2\":\"8\",\"cs3\":\"50\",\"cs4\":\"0\",\"code1\":\"1102\",\"code2\":\"78\",\"code3\":\"84\"}',	'6-6',	'',	1521430648,	1521430708,	'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MicroMessenger/6.6.5 NetType/4G Language/zh_CN',	'117.136.38.147'),
(29,	'oNh4m09avKASzNdLwPK45RgZx5Uo',	0,	'{\"cs1\":\"0\",\"cs2\":\"0\",\"cs3\":\"0\",\"cs4\":\"0\",\"code1\":\"0\",\"code2\":\"17\",\"code3\":\"18\"}',	'1-1',	'',	1521446489,	1521447115,	'Mozilla/5.0 (Linux; Android 6.0; vivo Y67 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043805 Mobile Safari/537.36 MicroMessenger/6.6.3.1260(0x26060339) NetType/4G Language/zh_CN',	'125.39.132.94'),
(30,	'oNh4m04Jfq-GeAe8j68emG99JjkA',	230,	'{\"cs1\":\"7\",\"cs2\":\"0\",\"cs3\":\"150\",\"cs4\":\"10\",\"code1\":\"4370\",\"code2\":\"18\",\"code3\":\"19\"}',	'1-1',	'',	1521447308,	1521447353,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'61.52.149.151'),
(31,	'oNh4m02VIjs3ltSY_ODdAbQg8CXc',	51,	'{\"cs1\":\"0\",\"cs2\":\"1\",\"cs3\":\"50\",\"cs4\":\"0\",\"code1\":\"1020\",\"code2\":\"19\",\"code3\":\"20\"}',	'1-1',	'',	1521447343,	1521447394,	'Mozilla/5.0 (Linux; Android 6.0.1; OPPO R9s Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043909 Mobile Safari/537.36 MicroMessenger/6.6.1.1220(0x26060133) NetType/4G Language/zh_CN',	'125.39.46.47'),
(32,	'oNh4m09avKASzNdLwPK45RgZx5Uo',	12,	'{\"cs1\":\"1\",\"cs2\":\"2\",\"cs3\":\"0\",\"cs4\":\"0\",\"code1\":\"228\",\"code2\":\"34\",\"code3\":\"36\"}',	'2-2',	'',	1521447374,	1521447441,	'Mozilla/5.0 (Linux; Android 6.0; vivo Y67 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043805 Mobile Safari/537.36 MicroMessenger/6.6.3.1260(0x26060339) NetType/4G Language/zh_CN',	'125.39.132.94'),
(33,	'oNh4m04Jfq-GeAe8j68emG99JjkA',	231,	'{\"cs1\":\"8\",\"cs2\":\"1\",\"cs3\":\"150\",\"cs4\":\"0\",\"code1\":\"4620\",\"code2\":\"36\",\"code3\":\"38\"}',	'2-2',	'',	1521447526,	1521447568,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'61.52.149.151'),
(34,	'oNh4m0-ypto3pZ2Ts1D6ObQU_T60',	50,	'{\"cs1\":\"0\",\"cs2\":\"0\",\"cs3\":\"50\",\"cs4\":\"0\",\"code1\":\"1100\",\"code2\":\"21\",\"code3\":\"22\"}',	'1-1',	'',	1521510835,	1521510881,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/4G Language/zh_CN',	'61.158.149.142'),
(35,	'oNh4m0-jZwucAqr09PNU2__vsm2k',	0,	'{\"cs1\":\"0\",\"cs2\":\"0\",\"cs3\":\"0\",\"cs4\":\"0\",\"code1\":\"0\",\"code2\":\"20\",\"code3\":\"21\"}',	'1-1',	'',	1521510860,	1521510915,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/4G Language/zh_CN',	'117.136.104.223'),
(36,	'oNh4m0-ypto3pZ2Ts1D6ObQU_T60',	252,	'{\"cs1\":\"6\",\"cs2\":\"12\",\"cs3\":\"150\",\"cs4\":\"30\",\"code1\":\"5796\",\"code2\":\"42\",\"code3\":\"44\"}',	'2-2',	'',	1521510949,	1521511012,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/4G Language/zh_CN',	'61.158.149.142'),
(37,	'oNh4m0-RG8q-MxKAxkvI2t-ZpEVw',	0,	'{\"cs1\":\"0\",\"cs2\":\"0\",\"cs3\":\"0\",\"cs4\":\"0\",\"code1\":\"0\",\"code2\":\"22\",\"code3\":\"23\"}',	'1-1',	'',	1521526031,	1521526079,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/4G Language/zh_CN',	'114.242.250.154'),
(38,	'oNh4m08kc6DXf3E0XlgRofF6S-E0',	574,	'{\"cs1\":\"19\",\"cs2\":\"4\",\"cs3\":\"100\",\"cs4\":\"280\",\"code1\":\"11480\",\"code2\":\"91\",\"code3\":\"98\"}',	'7-7',	'',	1521526324,	1521526451,	'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'123.117.254.21'),
(39,	'oNh4m09jNpvSgOF2XVOT1R_vt9e0',	356,	'{\"cs1\":\"9\",\"cs2\":\"6\",\"cs3\":\"150\",\"cs4\":\"110\",\"code1\":\"6052\",\"code2\":\"42\",\"code3\":\"45\"}',	'3-3',	'',	1521526667,	1521526711,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'123.117.254.21'),
(40,	'oNh4m09avKASzNdLwPK45RgZx5Uo',	91,	'{\"cs1\":\"4\",\"cs2\":\"1\",\"cs3\":\"50\",\"cs4\":\"0\",\"code1\":\"1820\",\"code2\":\"51\",\"code3\":\"54\"}',	'3-3',	'',	1521526909,	1521526948,	'Mozilla/5.0 (Linux; Android 6.0; vivo Y67 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043805 Mobile Safari/537.36 MicroMessenger/6.6.3.1260(0x26060339) NetType/4G Language/zh_CN',	'125.39.132.94'),
(41,	'oNh4m06ankfybz2hress-fv9mJjQ',	437,	'{\"cs1\":\"12\",\"cs2\":\"27\",\"cs3\":\"150\",\"cs4\":\"140\",\"code1\":\"10925\",\"code2\":\"24\",\"code3\":\"25\"}',	'1-1',	'',	1521528135,	1521528200,	'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'111.198.239.97'),
(42,	'oNh4m06ankfybz2hress-fv9mJjQ',	270,	'{\"cs1\":\"1\",\"cs2\":\"0\",\"cs3\":\"100\",\"cs4\":\"160\",\"code1\":\"7020\",\"code2\":\"48\",\"code3\":\"50\"}',	'2-2',	'',	1521528362,	1521528414,	'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'111.198.239.97'),
(43,	'oNh4m06ankfybz2hress-fv9mJjQ',	541,	'{\"cs1\":\"13\",\"cs2\":\"11\",\"cs3\":\"150\",\"cs4\":\"250\",\"code1\":\"14607\",\"code2\":\"72\",\"code3\":\"75\"}',	'3-3',	'',	1521528523,	1521528589,	'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'111.198.239.97'),
(44,	'oNh4m0zDnLbSMn-J-PUxe7mCywK4',	170,	'{\"cs1\":\"0\",\"cs2\":\"0\",\"cs3\":\"100\",\"cs4\":\"70\",\"code1\":\"4420\",\"code2\":\"25\",\"code3\":\"26\"}',	'1-1',	'',	1521535566,	1521535656,	'Mozilla/5.0 (Linux; Android 7.0; VTR-AL00 Build/HUAWEIVTR-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043909 Mobile Safari/537.36 MicroMessenger/6.6.5.1280(0x26060532) NetType/WIFI Language/zh_CN',	'123.151.77.74'),
(45,	'oNh4m0zDnLbSMn-J-PUxe7mCywK4',	280,	'{\"cs1\":\"5\",\"cs2\":\"0\",\"cs3\":\"100\",\"cs4\":\"130\",\"code1\":\"7560\",\"code2\":\"50\",\"code3\":\"52\"}',	'2-2',	'',	1521535732,	1521535793,	'Mozilla/5.0 (Linux; Android 7.0; VTR-AL00 Build/HUAWEIVTR-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043909 Mobile Safari/537.36 MicroMessenger/6.6.5.1280(0x26060532) NetType/WIFI Language/zh_CN',	'125.39.46.47'),
(46,	'oNh4m07vJ-K87cx7ORraF52ILDDU',	400,	'{\"cs1\":\"10\",\"cs2\":\"0\",\"cs3\":\"150\",\"cs4\":\"150\",\"code1\":\"1600\",\"code2\":\"3\",\"code3\":\"4\"}',	'1-1',	'',	1521629825,	1521629879,	'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 MicroMessenger/6.5.2.501 NetType/WIFI WindowsWechat QBCore/3.43.691.400 QQBrowser/9.0.2524.400',	'111.196.242.94'),
(47,	'oNh4m07vJ-K87cx7ORraF52ILDDU',	100,	'{\"cs1\":\"10\",\"cs2\":\"0\",\"cs3\":\"0\",\"cs4\":\"0\",\"code1\":\"500\",\"code2\":\"6\",\"code3\":\"8\"}',	'2-2',	'',	1521630017,	1521630059,	'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 MicroMessenger/6.5.2.501 NetType/WIFI WindowsWechat QBCore/3.43.691.400 QQBrowser/9.0.2524.400',	'111.196.242.94'),
(48,	'oNh4m08kc6DXf3E0XlgRofF6S-E0',	703,	'{\"cs1\":\"18\",\"cs2\":\"23\",\"cs3\":\"150\",\"cs4\":\"350\",\"code1\":\"14763\",\"code2\":\"104\",\"code3\":\"112\"}',	'8-8',	'',	1521702001,	1521702047,	'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'123.117.254.21'),
(49,	'oNh4m03WnAMnrxnE6yOMiInJF7Jg',	420,	'{\"cs1\":\"11\",\"cs2\":\"0\",\"cs3\":\"150\",\"cs4\":\"160\",\"code1\":\"11340\",\"code2\":\"26\",\"code3\":\"27\"}',	'1-1',	'',	1521785524,	1521785567,	'Mozilla/5.0 (Linux; Android 5.0.2; Redmi Note 2 Build/LRX22G; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043909 Mobile Safari/537.36 MicroMessenger/6.6.5.1280(0x26060533) NetType/WIFI Language/zh_CN',	'123.151.77.74'),
(50,	'oNh4m03WnAMnrxnE6yOMiInJF7Jg',	500,	'{\"cs1\":\"11\",\"cs2\":\"0\",\"cs3\":\"150\",\"cs4\":\"240\",\"code1\":\"14000\",\"code2\":\"52\",\"code3\":\"54\"}',	'2-2',	'',	1521785585,	1521785629,	'Mozilla/5.0 (Linux; Android 5.0.2; Redmi Note 2 Build/LRX22G; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043909 Mobile Safari/537.36 MicroMessenger/6.6.5.1280(0x26060533) NetType/WIFI Language/zh_CN',	'123.151.77.74'),
(51,	'oNh4m0-RG8q-MxKAxkvI2t-ZpEVw',	310,	'{\"cs1\":\"2\",\"cs2\":\"0\",\"cs3\":\"150\",\"cs4\":\"140\",\"code1\":\"7440\",\"code2\":\"44\",\"code3\":\"46\"}',	'2-2',	'',	1521788080,	1521788136,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/4G Language/zh_CN',	'114.242.248.33'),
(52,	'oNh4m09jNpvSgOF2XVOT1R_vt9e0',	120,	'{\"cs1\":\"2\",\"cs2\":\"0\",\"cs3\":\"100\",\"cs4\":\"0\",\"code1\":\"2160\",\"code2\":\"56\",\"code3\":\"60\"}',	'4-4',	'',	1522381281,	1522381338,	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN',	'123.120.172.11'),
(53,	'oNh4m08NdSEP-0SDLz6W66lOnI2A',	0,	'{\"cs1\":\"0\",\"cs2\":\"0\",\"cs3\":\"0\",\"cs4\":\"0\",\"code1\":\"0\",\"code2\":\"54\",\"code3\":\"28\"}',	'2-1',	'',	1523416841,	1523416906,	'Mozilla/5.0 (Linux; Android 6.0; NTS-AL00 Build/HUAWEINTS-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043909 Mobile Safari/537.36 MicroMessenger/6.6.5.1280(0x26060536) NetType/4G Language/zh_CN',	'125.39.240.204'),
(54,	'oNh4m08NdSEP-0SDLz6W66lOnI2A',	158,	'{\"cs1\":\"14\",\"cs2\":\"18\",\"cs3\":\"0\",\"cs4\":\"0\",\"code1\":\"4740\",\"code2\":\"81\",\"code3\":\"56\"}',	'3-2',	'',	1523416959,	1523417017,	'Mozilla/5.0 (Linux; Android 6.0; NTS-AL00 Build/HUAWEINTS-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043909 Mobile Safari/537.36 MicroMessenger/6.6.5.1280(0x26060536) NetType/4G Language/zh_CN',	'123.151.77.74');

DROP TABLE IF EXISTS `sharereport`;
CREATE TABLE `sharereport` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(255) NOT NULL DEFAULT '',
  `time` int(11) DEFAULT '0',
  `ip` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

INSERT INTO `sharereport` (`id`, `openId`, `time`, `ip`) VALUES
(1,	'oNh4m02uycF9kVwXwTGKdDSWUL-A',	1521007600,	'61.151.178.174'),
(2,	'oNh4m0-1sMmub5_fhLyF-U9kJPcY',	1521016823,	'180.124.132.12'),
(3,	'oNh4m02VuNEv7WW9bc7rIk4UVGZE',	1521021176,	'61.148.243.63'),
(4,	'oNh4m08kc6DXf3E0XlgRofF6S-E0',	1521081341,	'123.117.249.249'),
(5,	'oNh4m02VuNEv7WW9bc7rIk4UVGZE',	1521108236,	'111.196.243.128'),
(6,	'oNh4m08kc6DXf3E0XlgRofF6S-E0',	1521167104,	'123.117.249.249'),
(7,	'oNh4m09jNpvSgOF2XVOT1R_vt9e0',	1521173904,	'123.117.249.249'),
(8,	'oNh4m09jNpvSgOF2XVOT1R_vt9e0',	1521510657,	'117.136.38.32'),
(9,	'oNh4m09jNpvSgOF2XVOT1R_vt9e0',	1521527802,	'123.117.254.21'),
(10,	'oNh4m08kc6DXf3E0XlgRofF6S-E0',	1521702173,	'123.117.254.21'),
(11,	'oNh4m0-jZwucAqr09PNU2__vsm2k',	1523414111,	'117.136.104.223');

DROP TABLE IF EXISTS `ticket`;
CREATE TABLE `ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket` varchar(255) NOT NULL,
  `expireTime` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `ticket` (`id`, `ticket`, `expireTime`) VALUES
(1,	'HoagFKDcsGMVCIY2vOjf9iUsELQSsP3wc1IZ_aMFJ9tn26kO5hQ364liyFR72KGUgc4y49J8fd_LA0ikPZYnGw',	1523420925);

-- 2018-04-16 05:58:29
