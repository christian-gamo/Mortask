import React, { useState } from "react";
import StarCheckbox from "./StarCheckbox";
import { Checkbox } from 'flowbite-react';
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";

const ToDoItem = (props, { onToggleCompletion }) => {
  const item = props.item;

  return (
    <>
      <div className="mt-2">
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-600">
          <Checkbox className="mr-3"id="completed"  onChange={onToggleCompletion}/>
            <p
              className="ml-3 font-semibold text-md text-gray-700 dark:text-gray-300"  
            >
              {item.todoItem_name}
            </p>
          
          <div className="ml-auto px-4 py-3 flex items-center justify-end">
            <span className="hidden xl:inline-block bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
            {item.todoItem_tag}
            </span>
            <span className="hidden xl:inline-block bg-indigo-100 text-indigo-800 text-sm font-medium me-2 mr-10 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
              {item.todoItem_deadline}
            </span>
            <StarCheckbox />
            <div className="mx-3 pl-1 pt-1">
           <EditTask/>
            </div>
            <div className="pt-1">
             <DeleteTask/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoItem;
