CREATE TABLE `users` (
	`user_id` INT NOT NULL AUTO_INCREMENT,
	`user_fname` varchar(50) NOT NULL,
	`user_lname` varchar(50) NOT NULL,
	`user_email` varchar(50) NOT NULL UNIQUE,
	`user_password` varchar(255) NOT NULL,
	`user_status` BOOLEAN NOT NULL DEFAULT false,
	PRIMARY KEY (`user_id`)
);

CREATE TABLE `group` (
	`group_id` INT NOT NULL AUTO_INCREMENT,
	`group_name` varchar(50) NOT NULL,
	`group_master` BOOLEAN NOT NULL DEFAULT false,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`group_id`)
);

CREATE TABLE `group_members` (
    `group_member_id` INT NOT NULL AUTO_INCREMENT,
    `group_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`group_member_id`),
    FOREIGN KEY (`group_id`) REFERENCES `group`(`group_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);

CREATE TABLE `todoList` (
	`todoList_id` INT NOT NULL AUTO_INCREMENT,
	`todoList_name` varchar(50) NOT NULL,
	`todoList_description` varchar(50) NOT NULL,
	`todoList_private` BOOLEAN NOT NULL DEFAULT true,
	`group_id` INT NOT NULL,
	PRIMARY KEY (`todoList_id`)
);

CREATE TABLE `todoItem` (
	`todoItem_id` INT NOT NULL AUTO_INCREMENT,
	`todoItem_name` varchar(30) NOT NULL,
	`todoItem_description` varchar(80) NOT NULL,
	`todoItem_tag` varchar(30) NOT NULL,
	`todoItem_deadline` DATE NOT NULL,
	`todoItem_status` varchar(30) NOT NULL,
	`todoItem_assigned` INT NOT NULL,
	`todoList_id` INT NOT NULL,
	PRIMARY KEY (`todoItem_id`)
);

ALTER TABLE `group` ADD CONSTRAINT `group_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`);

ALTER TABLE `todoList` ADD CONSTRAINT `todoList_fk0` FOREIGN KEY (`group_id`) REFERENCES `group`(`group_id`);

ALTER TABLE `todoItem` ADD CONSTRAINT `todoItem_fk0` FOREIGN KEY (`todoItem_assigned`) REFERENCES `users`(`user_id`);

ALTER TABLE `todoItem` ADD CONSTRAINT `todoItem_fk1` FOREIGN KEY (`todoList_id`) REFERENCES `todoList`(`todoList_id`);





