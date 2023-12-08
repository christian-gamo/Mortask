CREATE TABLE `users` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `user_fname` varchar(50) NOT NULL,
    `user_lname` varchar(50) NOT NULL,
    `user_email` varchar(50) NOT NULL UNIQUE,
    `user_password` varchar(255) NOT NULL,
    `user_status` BOOLEAN NOT NULL DEFAULT false, -- admin du site ou pas
    PRIMARY KEY (`user_id`)
);

-- un utilisateur privé peut avoir plusieurs todolists privés
CREATE TABLE `todoList` (
    `todoList_id` INT NOT NULL AUTO_INCREMENT,
    `todoList_name` varchar(50) NOT NULL,
    `todoList_description` varchar(50) NOT NULL DEFAULT '',
    `todoList_creator` INT NOT NULL, -- utilisateur privé ou group_master
    `todoList_isShared` BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (`todoList_id`), 
    FOREIGN KEY (`todoList_creator`) REFERENCES `users` (`user_id`)
);

-- table d'association entre todoList et users
-- une todolist collaborative = un groupe
CREATE TABLE `todoList_members` (
    `todoList_members_id` INT NOT NULL AUTO_INCREMENT,
    `todoList_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`todoList_members_id`),
    FOREIGN KEY (`todoList_id`) REFERENCES `todoList` (`todoList_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);

CREATE TABLE `todoTask` (
    `todoTask_id` INT NOT NULL AUTO_INCREMENT,
    `todoTask_name` varchar(30) NOT NULL,
    `todoTask_description` varchar(80) NOT NULL DEFAULT '',
    `todoTask_tag` varchar(30) NOT NULL,
    `todoTask_deadline` DATE NOT NULL,
    `todoTask_status` varchar(30) NOT NULL,
    `todoTask_isImportant` BOOLEAN NOT NULL DEFAULT false,
    `todoList_id` INT NOT NULL,
    `todoTask_assigned` INT NOT NULL, -- utilisateur privé ou ou group_member assigné
    PRIMARY KEY (`todoTask_id`),
    FOREIGN KEY (`todoList_id`) REFERENCES `todoList` (`todoList_id`),
    FOREIGN KEY (`todoTask_assigned`) REFERENCES `users` (`user_id`)
);


INSERT INTO users (user_fname, user_lname, user_email, user_password, user_status)
VALUES ('Taha', 'Fakhran', 'taha.fakhran@dauphine.eu', '$2a$10$wCCJ/6IOxMj3A3K0Ui6na.IpkIJzPDAxqNR9tUR/8ABoQ4bf0GHA.', true);
INSERT INTO users (user_fname, user_lname, user_email, user_password, user_status)
VALUES ('Christian', 'Gamo', 'christian.gamo@dauphine.eu', '$2a$10$PNP5qvWyQzlmvcIFNvgL7ecytbgQxSQcdHSw3rMyfRrS2AkWN4sqW', true);
INSERT INTO users (user_fname, user_lname, user_email, user_password, user_status)
VALUES ('Darlene', 'Souccouchetty', 'darlene.souccouchetty@dauphine.eu', '$2a$10$z9faE0pxY.FOz4RJpj796.CyInUm/VWyk2U8QJk9SgsQDYLUv3HFq', true);


INSERT INTO todoList (todoList_name, todoList_description, todoList_creator, todoList_isShared)
VALUES ('Liste de courses', 'Mes courses', 1, true);

INSERT INTO todoList (todoList_name, todoList_description, todoList_creator, todoList_isShared)
VALUES ('Travail', 'Travail pour la semaine', 1, true);

INSERT INTO todoList_members (todoList_id, user_id)
VALUES (1, 1);

INSERT INTO todoList_members (todoList_id, user_id)
VALUES (2, 1);

INSERT INTO todoList_members (todoList_id, user_id)
VALUES (1, 3);

INSERT INTO todoList_members (todoList_id, user_id)
VALUES (2, 3);

INSERT INTO todoTask (todoTask_name, todoTask_description, todoTask_tag, todoTask_deadline, todoTask_status, todoTask_isImportant, todoList_id, todoTask_assigned)
VALUES ('Lait', 'Acheter du lait', 'groceries', '2024-12-10', true, 'pending', 1, 1);

INSERT INTO todoTask (todoTask_name, todoTask_description, todoTask_tag, todoTask_deadline, todoTask_status, todoTask_isImportant, todoList_id, todoTask_assigned)
VALUES ('Pain', 'Acheter du pain', 'courses', '2024-12-10', false, 'pending', 1, 3);

INSERT INTO todoTask (todoTask_name, todoTask_description, todoTask_tag, todoTask_deadline, todoTask_status, todoTask_isImportant, todoList_id, todoTask_assigned)
VALUES ('Tache 1', 'Tache 1', 'travail', '2024-12-15', true, 'pending', 2, 1);

INSERT INTO todoTask (todoTask_name, todoTask_description, todoTask_tag, todoTask_deadline, todoTask_status, todoTask_isImportant, todoList_id, todoTask_assigned)
VALUES ('Tache 2', 'Tache 2', 'travail', '2024-12-15', false, 'pending', 2, 3);