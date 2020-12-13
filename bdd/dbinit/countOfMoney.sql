CREATE TABLE `User` (
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `mail` varchar (100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` int NOT NULL ,
  `preferedCurrency` varchar(50),
  `token` varchar(255)
)ENGINE=InnoDB;

CREATE TABLE `Role` (
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `role` varchar(50) NOT NULL
)ENGINE=InnoDB;

CREATE TABLE `Article` (
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `title` varchar(50) NOT NULL,
  `date` DATE NOT NULL,
  `source` varchar(100) NOT NULL,
  `article_url` varchar(200) NOT NULL,
  `img_url` varchar(200),
  `crypto` int NOT NULL
)ENGINE=InnoDB;

CREATE TABLE `Keyword` (
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `keywordName` varchar(50) NOT NULL
)ENGINE=InnoDB;

CREATE TABLE `Crypto` (
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `cryptoName` varchar(50) NOT NULL,
  `currentPrice` int(20) NOT NULL,
  `lowPrice` int(20) NOT NULL,
  `highPrice` int(20) NOT NULL,
  `cryptoUrl` varchar(200) NOT NULL,
  `isDisplayed` boolean NOT NULL
)ENGINE=InnoDB;

CREATE TABLE `Preference` (
  `userId` int NOT NULL,
  `cryptoId` int NOT NULL
)ENGINE=InnoDB;

CREATE TABLE `Setting` (
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `latestArticles` int NOT NULL
)ENGINE=InnoDB;

CREATE TABLE `Articles_Keyword` (
  `keywordId` int NOT NULL,
  `articleId` int NOT NULL
)ENGINE=InnoDB;

CREATE TABLE `KeywordPreference` (
  `userId` int NOT NULL,
  `keywordId` int NOT NULL
)ENGINE=InnoDB;

ALTER TABLE `Articles_Keyword` ADD FOREIGN KEY (`keywordId`) REFERENCES `Keyword` (`id`);
ALTER TABLE `Articles_Keyword` ADD FOREIGN KEY (`articleId`) REFERENCES `Article` (`id`);
ALTER TABLE `Setting` ADD FOREIGN KEY (`latestArticles`) REFERENCES `Article` (`id`) ;
ALTER TABLE `Preference` ADD FOREIGN KEY (`cryptoId`) REFERENCES `Crypto` (`id`);
ALTER TABLE `Preference` ADD FOREIGN KEY (`userId`) REFERENCES `User` (`id`);
ALTER TABLE `User` ADD FOREIGN KEY (`role`) REFERENCES `Role` (`id`);
ALTER TABLE `Article` ADD FOREIGN KEY (`crypto`) REFERENCES `Crypto`(`id`) ;
ALTER TABLE `KeywordPreference` ADD FOREIGN KEY (`userId`) REFERENCES `User` (`id`);
ALTER TABLE `KeywordPreference` ADD FOREIGN KEY (`keywordId`) REFERENCES `Articles_Keyword` (`keywordId`);

INSERT INTO `Crypto` (`cryptoName`, `currentPrice`, `lowPrice`, `highPrice`, `cryptoUrl`, `isDisplayed`) VALUES ('bitcoin', '1', '0.01', '2', 'https://www.lemonde.fr/international/article/2020/12/04/etats-unis-joe-biden-se-concentre-sur-le-covid-et-veut-integrer-anthony-fauci-a-son-equipe_6062120_3210.html', '1'), ('ethereum','1', '0', '4', 'https://www.theguardian.com/us-news/ng-interactive/2020/dec/03/us-election-results-2020-joe-biden-defeats-donald-trump-to-win-presidency', '0'); 
INSERT INTO `Article` ( `title`, `date`, `source`, `article_url`, `img_url`, `crypto`) VALUES ('lucas', '2020-12-01', 'https://www.reddit.com/', 'https://twitter.com/', 'https://upload.wikimedia.org/wikipedia/commons/8/8f/NativityChristmasLights2.jpg', '1');
INSERT INTO `Article` (`title`, `date`, `source`, `article_url`, `img_url`, `crypto`) VALUES ('testvalue2', '2020-11-21', 'https://www.youtube.com/', 'https://facebook.com/', 'https://upload.wikimedia.org/wikipedia/commons/8/8f/NativityChristmasLights2.jpg', '2');
INSERT INTO Role Values (1,'admin');
INSERT INTO Role Values (2,'user');
INSERT INTO `Setting` (`latestArticles`) VALUES ('1');
