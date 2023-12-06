import React, { useState, useEffect } from "react";
import ToDoHeader from "./ToDoHeader";
import ToDoItem from "./ToDoItem";

const ToDo = () => {
  const [todoListId, setTodoListId] = useState("");

  const [itemsData, setItemsData] = useState([]);

  const getListItems = async () => {
    const apiUrl = `http://localhost:2020/todoItem/${todoListId}`;

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
      setItemsData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);

    const todoListIdParam = url.searchParams.get("todoList_id");
    setTodoListId(todoListIdParam);
    setItemsData([]);
    getListItems();
  }, [todoListId]);

  const handleToggleCompletion = (id) => {
    setItemsData((prevItems) =>
      prevItems.map((item) =>
        item.todoItem_id === id
          ? {
              ...item,
              todoItem_status:
                item.todoItem_status === "completed" ? "pending" : "completed",
            }
          : item
      )
    );
  };

  const handleMoveToCompleted = (id) => {
    setItemsData((prevItems) =>
      prevItems.map((item) =>
        item.todoItem_id === id
          ? { ...item, todoItem_status: "completed" }
          : item
      )
    );
  };

  const handleMoveToPending = (id) => {
    setItemsData((prevItems) =>
      prevItems.map((item) =>
        item.todoItem_id === id ? { ...item, todoItem_status: "pending" } : item
      )
    );
  };

  return (
    <div className="p-5 sm:ml-64">
      <div className="px-1 sm:px-5 w-full">
        <div className="w-full mt-7 p-5 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <ToDoHeader />
          {itemsData
            .filter((item) => item.todoItem_status === "pending")
            .map((todo) => (
              <ToDoItem
                key={todo.todoItem_id}
                item={todo}
                isChecked={todo.todoItem_status === "completed"}
                onToggleCompletion={() =>
                  handleToggleCompletion(todo.todoItem_id)
                }
                onMoveToCompleted={() =>
                  handleMoveToCompleted(todo.todoItem_id)
                }
                onMoveToPending={() => handleMoveToPending(todo.todoItem_id)}
              />
            ))}
          <button
            type="button"
            className="mt-5 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
            disabled
          >
            Completed
          </button>
          <div
            id="completedSection"
            className="w-full mt-2 p-5 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700"
          >
            {itemsData
              .filter((item) => item.todoItem_status === "completed")
              .map((completedItem) => (
                <ToDoItem
                  key={completedItem.todoItem_id}
                  item={completedItem}
                  isChecked={completedItem.todoItem_status === "completed"}
                  onToggleCompletion={() =>
                    handleToggleCompletion(completedItem.todoItem_id)
                  }
                  onMoveToCompleted={() =>
                    handleMoveToCompleted(completedItem.todoItem_id)
                  }
                  onMoveToPending={() =>
                    handleMoveToPending(completedItem.todoItem_id)
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
