import React, { useEffect, useState } from "react";
import StarCheckbox from "./StarCheckbox";
import { Checkbox } from "flowbite-react";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import ViewTask from "./ViewTask";

const ToDoItem = (props) => {
  const [completed, setCompleted] = useState(false);
  const item = props.item;

  const [userData, setUserData] = useState({});
  const getUserData = async () => {
    const apiUrl = `http://localhost:2020/users/${item.todoTask_assigned}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleImportantApiCall = async () => {
    const apiUrl = "http://localhost:2020/todoTask/toggleStatus";

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todoTask_id: item.todoTask_id }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      window.location.reload();
      return data;
    } catch (error) {
      console.error("Error toggling isImportant:", error);
    }
  };

  useEffect(() => {
    const isCompleted = item.todoTask_status === "completed" ? true : false;
    setCompleted(isCompleted);
    getUserData();
  }, []);

  const onToggleCompletion = () => {
    toggleImportantApiCall();
    setCompleted(!completed);
  };

  return (
    <>
      <div className="mt-2">
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <Checkbox
            className="mr-3"
            id="completed"
            onChange={onToggleCompletion}
            checked={completed}
          />
          <p
            className={`ml-3 font-semibold text-md text-gray-700 dark:text-gray-300 ${
              completed ? "line-through" : ""
            }`}
          >
            {item.todoTask_name}
          </p>
          <div className="ml-3 pt-1">
            <ViewTask task = {item}/>
          </div>
          <div className="ml-auto px-4 py-3 flex items-center justify-end">
            <span
              className={`hidden xl:inline-block bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 ${
                completed ? "no-line-through" : ""
              }`}
            >
              {userData.user_fname + " " + userData.user_lname}
            </span>
            <span
              className={`hidden xl:inline-block bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300 ${
                completed ? "no-line-through" : ""
              }`}
            >
              {item.todoTask_tag}
            </span>
            <span
              className={`hidden xl:inline-block bg-indigo-100 text-indigo-800 text-sm font-medium me-2 mr-10 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300 ${
                completed ? "no-line-through" : ""
              }`}
            >
              {item.todoTask_deadline ? (
                <p>
                  {new Date(item.todoTask_deadline).toLocaleDateString("en-US")}
                </p>
              ) : (
                <p>No deadline specified</p>
              )}
            </span>
            <StarCheckbox item={item} />
            <div className="mx-3 pl-1 pt-1">
              <EditTask />
            </div>

            <div className="pt-1">
              <DeleteTask />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoItem;
