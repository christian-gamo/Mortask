import React, { useState } from "react";
import StarCheckbox from "./StarCheckbox";
import { Checkbox } from "flowbite-react";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import ViewTask from "./ViewTask";

const ToDoItem = (props) => {
  const [completed, setCompleted] = useState(false);
  const item = props.item;

  const onToggleCompletion = () => {
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
          />
          <p
            className={`ml-3 font-semibold text-md text-gray-700 dark:text-gray-300 ${
              completed ? "line-through" : ""
            }`}
          >
            {item.todoTask_name}
          </p>
          <div className="ml-3 pt-1">
            <ViewTask />
          </div>
          <div className="ml-auto px-4 py-3 flex items-center justify-end">
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
            <StarCheckbox />
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
