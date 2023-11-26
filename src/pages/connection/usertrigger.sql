DELIMITER //

CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    -- Insert a row into the 'group'
    INSERT INTO `group` (`group_name`, `group_master`, `user_id`)
    VALUES (CONCAT(NEW.user_fname, '_', NEW.user_lname), true, NEW.user_id);

    -- Get the last inserted group_id
    SELECT LAST_INSERT_ID() INTO @last_group_id;

    -- Insert a row into the 'todoList'
    INSERT INTO `todoList` (`todoList_name`, `todoList_description`, `todoList_private`, `group_id`)
    VALUES (CONCAT(NEW.user_fname, ' List'), 'Your Private List!', true, @last_group_id);
END //

DELIMITER ;
