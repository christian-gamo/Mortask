CREATE TABLE `users` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `user_fname` varchar(50) NOT NULL,
    `user_lname` varchar(50) NOT NULL,
    `user_email` varchar(50) NOT NULL UNIQUE,
    `user_password` varchar(255) NOT NULL,
    `user_status` BOOLEAN NOT NULL DEFAULT false, -- admin du site ou pas
    PRIMARY KEY (`user_id`)
);

CREATE TABLE `group` (
    `group_id` INT NOT NULL AUTO_INCREMENT,
    `group_name` varchar(50) NOT NULL,
    `group_master` INT NOT NULL, -- créateur/admin du groupe
    PRIMARY KEY (`group_id`),
    FOREIGN KEY (`group_master`) REFERENCES `users` (`user_id`)
);

-- table d'association entre group et users
CREATE TABLE `group_members` (
    `group_members_id` INT NOT NULL AUTO_INCREMENT,
    `group_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`group_members_id`),
    FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);

-- un utilisateur privé peut avoir plusieurs todolists privés
CREATE TABLE `todoList` (
    `todoList_id` INT NOT NULL AUTO_INCREMENT,
    `todoList_name` varchar(50) NOT NULL,
    `todoList_description` varchar(50) NOT NULL,
    `todoList_creator` INT NOT NULL, -- utilisateur privé ou group_master
    PRIMARY KEY (`todoList_id`), 
    FOREIGN KEY (`todoList_creator`) REFERENCES `users` (`user_id`)
);

CREATE TABLE `todoItem` (
    `todoItem_id` INT NOT NULL AUTO_INCREMENT,
    `todoItem_name` varchar(30) NOT NULL,
    `todoItem_description` varchar(80) NOT NULL,
    `todoItem_tag` varchar(30) NOT NULL,
    `todoItem_deadline` DATE NOT NULL,
    `todoItem_status` varchar(30) NOT NULL,
    `todoList_id` INT NOT NULL,
    `todoItem_assigned` INT NOT NULL, -- utilisateur privé ou ou group_member assigné
    PRIMARY KEY (`todoItem_id`),
    FOREIGN KEY (`todoList_id`) REFERENCES `todoList` (`todoList_id`),
    FOREIGN KEY (`todoItem_assigned`) REFERENCES `users` (`user_id`)
);

-- Table d'association entre group et todoList
-- Ne contient que les todolists de groupe
-- Un groupe peut avoir plusieur todolists
-- Seul le group_master peut créer des todolist
CREATE TABLE `group_todoLists` (
    `group_todoLists_id` INT NOT NULL AUTO_INCREMENT,
    `group_id` INT NOT NULL,
    `todoList_id` INT NOT NULL,
    PRIMARY KEY (`group_todoLists_id`),
    FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`),
    FOREIGN KEY (`todoList_id`) REFERENCES `todoList` (`todoList_id`)
);