DELIMITER //

CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    -- Get the last inserted group_id
    SELECT LAST_INSERT_ID() INTO @last_group_id;

    -- Insert a row into the 'todoList'
    INSERT INTO `todoList` (`todoList_name`, `todoList_description`, `todoList_creator`)
    VALUES (CONCAT(NEW.user_fname, ' List'), 'Your Private List!', NEW.user_id);
END //

DELIMITER ;
