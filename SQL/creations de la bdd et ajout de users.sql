CREATE TABLE hotel
(
    id          int(11) NOT NULL,
    address     varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    name        varchar(50) COLLATE utf8mb4_unicode_ci  NOT NULL,
    picture_url varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    city        varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    description varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE reservation
(
    id               int(11) NOT NULL,
    suite_id         int(11) DEFAULT NULL,
    start_date       date NOT NULL,
    end_date         date NOT NULL,
    user_id          int(11) DEFAULT NULL,
    reservation_name varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE suite
(
    id               int(11) NOT NULL,
    hotel_id         int(11) NOT NULL,
    name             varchar(50) COLLATE utf8mb4_unicode_ci  NOT NULL,
    occupied         tinyint(1) NOT NULL,
    occupied_by      varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    price            double                                  NOT NULL,
    pictures_url     longtext COLLATE utf8mb4_unicode_ci     NOT NULL COMMENT '(DC2Type:json)',
    title            varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    booking_url      varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    description      varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    main_picture_url varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user`
(
    id                  int(11) NOT NULL,
    mail                varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
    roles               longtext COLLATE utf8mb4_unicode_ci     NOT NULL COMMENT '(DC2Type:json)',
    password            varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    first_name          varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    last_name           varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    manager_of_hotel_id int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



ALTER TABLE hotel
    ADD PRIMARY KEY (id);

ALTER TABLE reservation
    ADD PRIMARY KEY (id),
  ADD KEY IDX_42C849554FFCB518 (suite_id);

ALTER TABLE suite
    ADD PRIMARY KEY (id),
  ADD KEY IDX_153CE4263243BB18 (hotel_id);

ALTER TABLE user
    ADD PRIMARY KEY (id),
  ADD UNIQUE KEY UNIQ_8D93D6495126AC48 (mail);


ALTER TABLE hotel
    MODIFY id int (11) NOT NULL AUTO_INCREMENT;

ALTER TABLE reservation
    MODIFY id int (11) NOT NULL AUTO_INCREMENT;

ALTER TABLE suite
    MODIFY id int (11) NOT NULL AUTO_INCREMENT;

ALTER TABLE user
    MODIFY id int (11) NOT NULL AUTO_INCREMENT;

INSERT INTO `user` (`id`, `mail`, `roles`, `password`, `first_name`, `last_name`, `manager_of_hotel_id`)
VALUES (193, 'superadmin@superadmin', '[\"ROLE_SUPER_ADMIN\"]',
        '$2y$13$J9p4I59muJqO2hERhVQRY.zHXfQfH.BeTzQZ4cebGjwXBLmdt5LCW', 'Henriette', 'Weiss', NULL),
       (194, 'client@client', '[\"ROLE_CLIENT\"]', '$2y$13$oT8mvzTAV4wfaDWmk8h34.91aczei0eZuh1JpPEdQmTte7DaJJzj6',
        'Ricardo', 'Ferreira', NULL),
       (195, 'gerant@gerant', '[\"ROLE_ADMIN\"]', '$2y$13$JbDta3kC/pfnBMv.nauIquv77hPeHnCSl/W7DYcTTxwsZMObVRS1y',
        'gerant', 'gerant', 59);