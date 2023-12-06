DELIMITER //

CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    -- Insert a row into the 'todoList'
    INSERT INTO `todoList` (`todoList_name`, `todoList_description`, `todoList_creator`, `todoList_isShared`)
    VALUES (CONCAT(NEW.user_fname, ' List'), 'Your Private List!', NEW.user_id, false);

    -- Get the last inserted todoList_id
    SELECT LAST_INSERT_ID() INTO @last_todoList_id;

    -- Insert a row into 'todoList_members'
    INSERT INTO `todoList_members` (`todoList_id`, `user_id`)
    VALUES (@last_todoList_id, NEW.user_id);
END //

DELIMITER ;