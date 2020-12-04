CREATE TABLE `User` (
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `cryptoList` varchar(1000),
  `role` int NOT NULL,
  `preferedCurrency` varchar(50),
  `token` varchar(255)
)  ENGINE=InnoDB;

CREATE TABLE `Role` (
  `id` int PRIMARY KEY NOT NULL,
  `role` varchar(50) NOT NULL
)  ENGINE=InnoDB;

CREATE TABLE `Article` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `date` DATE NOT NULL,
  `source` varchar(100) NOT NULL,
  `article_url` varchar(200) NOT NULL,
  `img_url` varchar(200) ,
  `crypto` int,
  `view` int,
  `keywords` varchar(1000)
)  ENGINE=InnoDB;

CREATE TABLE `Keyword` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `keywordName` varchar(50) NOT NULL
)  ENGINE=InnoDB;

CREATE TABLE `Crypto` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `cryptoName` varchar(50) NOT NULL,
  `currentPrice` int(20) NOT NULL,
  `openingPrice` int(20) NOT NULL,
  `lowPrice` int(20) NOT NULL,
  `highPrice` int(20) NOT NULL,
  `cryptoUrl` varchar(200) NOT NULL,
  `isDisplayed` boolean NOT NULL
)  ENGINE=InnoDB;

CREATE TABLE `Preference` (
  `userId` int NOT NULL,
  `cryptoId` int NOT NULL
)  ENGINE=InnoDB;

CREATE TABLE `Setting` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `cryptoPopularity` varchar(1000),
  `latestArticles` int,
  `sourceList` varchar(1000)
)  ENGINE=InnoDB;

CREATE TABLE `Articles_Keyword` (
  `keywordId` int NOT NULL,
  `articleId` int NOT NULL
)  ENGINE=InnoDB;

ALTER TABLE `Articles_Keyword` ADD FOREIGN KEY (`keywordId`) REFERENCES `Keyword` (`id`);

ALTER TABLE `Articles_Keyword` ADD FOREIGN KEY (`articleId`) REFERENCES `Article` (`id`);

ALTER TABLE `Article` ADD FOREIGN KEY (`id`) REFERENCES `Setting` (`latestArticles`);

ALTER TABLE `Preference` ADD FOREIGN KEY (`cryptoId`) REFERENCES `Crypto` (`id`);

ALTER TABLE `Preference` ADD FOREIGN KEY (`userId`) REFERENCES `User` (`id`);

ALTER TABLE `Role` ADD FOREIGN KEY (`id`) REFERENCES `User` (`role`);

ALTER TABLE `Crypto` ADD FOREIGN KEY (`id`) REFERENCES `Article` (`crypto`);

INSERT INTO Role Values (1,'admin');
INSERT INTO Role Values (2,'user');
