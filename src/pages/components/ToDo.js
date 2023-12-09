import React, { useState, useEffect } from "react";
import ToDoHeader from "./ToDoHeader";
import ToDoItem from "./ToDoItem";
import AddToDo from "./AddToDo";
import ShareToDo from "./ShareToDo";

const ToDo = (props) => {
  let todoListId = "";
  const [itemsData, setItemsData] = useState([]);
  const [showCompletedSection, setShowCompletedSection] = useState(false);
  const publicToDos = props.publicToDos;
  const privateToDos = props.privateToDos;

  const getListItems = async () => {
    const user_id = sessionStorage.getItem("user_id");
    const todayApiUrl = `http://localhost:2020/todoTask/user/${user_id}/today`;
    const specificListApiUrl = `http://localhost:2020/todoTask/${todoListId}`;

    const apiUrl = todoListId != "" ? specificListApiUrl : todayApiUrl;
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setItemsData([]);
    const url = new URL(window.location.href);
    const todoListIdParam = url.searchParams.get("todoList_id");
    // leave the comments justin
    // if (todoListIdParam != null && todoListIdParam !== "") {
    //todoListId = todoListIdParam.toString();
    if (todoListIdParam != null && todoListIdParam !== "") {
      todoListId = todoListIdParam.toString();
    }
    // if (todoListId !== "") {
    getListItems();
    // }
    // }
  }, []);

  const handleToggleCompletion = (id) => {
    setItemsData((prevItems) =>
      prevItems.map((item) =>
        item.todoTask_id === id
          ? {
              ...item,
              todoTask_status:
                item.todoTask_status === "completed" ? "pending" : "completed",
            }
          : item
      )
    );
  };

  const handleMoveToCompleted = (id) => {
    setItemsData((prevItems) =>
      prevItems.map((item) =>
        item.todoTask_id === id
          ? { ...item, todoTask_status: "completed" }
          : item
      )
    );
  };

  const handleMoveToPending = (id) => {
    setItemsData((prevItems) =>
      prevItems.map((item) =>
        item.todoTask_id === id ? { ...item, todoTask_status: "pending" } : item
      )
    );
  };

  return (
    <>
      <ShareToDo />
      <AddToDo />
      <div className="p-5 sm:ml-64">
        <div className="px-1 sm:px-5 w-full">
          <div className="w-full mt-7 p-5 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <ToDoHeader privateToDos={privateToDos} publicToDos={publicToDos} />
            {itemsData.length === 0 ? <p>No Tasks Found!</p> : <div></div>}
            <br />
            {itemsData
              .filter((item) => item.todoTask_status === "pending")
              .map((todo) => (
                <ToDoItem
                  key={todo.todoTask_id}
                  item={todo}
                  isChecked={todo.todoTask_status === "completed"}
                  onToggleCompletion={() =>
                    handleToggleCompletion(todo.todoTask_id)
                  }
                  onMoveToCompleted={() =>
                    handleMoveToCompleted(todo.todoTask_id)
                  }
                  onMoveToPending={() => handleMoveToPending(todo.todoTask_id)}
                />
              ))}
            <button
              type="button"
              onClick={() => setShowCompletedSection(!showCompletedSection)}
              className="mt-5 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
            >
              Completed
            </button>
            {showCompletedSection && (
              <div
                id="completedSection"
                className="w-full mt-2 p-5 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700"
              >
                {itemsData
                  .filter((item) => item.todoTask_status === "completed")
                  .map((completedItem) => (
                    <ToDoItem
                      key={completedItem.todoTask_id}
                      item={completedItem}
                      isChecked={completedItem.todoTask_status === "completed"}
                      onToggleCompletion={() =>
                        handleToggleCompletion(completedItem.todoTask_id)
                      }
                      onMoveToCompleted={() =>
                        handleMoveToCompleted(completedItem.todoTask_id)
                      }
                      onMoveToPending={() =>
                        handleMoveToPending(completedItem.todoTask_id)
                      }
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
