import React from "react";
import StarCheckbox from "./StarCheckbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const ToDoItem = (props, { isChecked, onToggleCompletion }) => {
  const item = props.item;
  return (
    <>
      <div className="mt-2">
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-600">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 mr-3 text-blue-600 bg-gray-100 border-gray-400 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={isChecked}
            onChange={onToggleCompletion}
          />
          <div
            data-modal-target="viewTaskModal"
            data-modal-toggle="viewTaskModal"
          >
            <p
              className={`ml-3 font-semibold text-md text-gray-700 dark:text-gray-300 ${
                isChecked ? "line-through" : ""
              }`}
            >
              {item.todoItem_name}
            </p>
          </div>
          <div className="ml-auto px-4 py-3 flex items-center justify-end">
            <span className="hidden xl:inline-block bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
              University
            </span>
            <span className="hidden xl:inline-block bg-indigo-100 text-indigo-800 text-sm font-medium me-2 mr-10 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
              25/11/2023
            </span>
            <StarCheckbox />
            <div className="mx-3 pl-1 pt-1">
              <button
                data-modal-target="editTaskModal"
                data-modal-toggle="editTaskModal"
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="w-6 h-5 text-gray-300 dark:text-gray-500"
                />
              </button>
            </div>
            <div className="pt-1">
              <button
                data-modal-target="deleteModal"
                data-modal-toggle="deleteModal"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="w-6 h-5   text-gray-300 dark:text-gray-500"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoItem;
