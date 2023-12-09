import EditToDo from "./EditToDo";
import DeleteToDo from "./DeleteToDo";
import AddTask from "./AddTask";
import { useEffect, useState } from "react";

const ToDoHeader = (props) => {
  let todoListId = "";
  const [listData, setListData] = useState([]);

  const getListData = async () => {
    const apiUrl = `http://localhost:2020/todoList/${todoListId}`;
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
      setListData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setListData([]);
    const url = new URL(window.location.href);
    const todoListIdParam = url.searchParams.get("todoList_id");

    if (todoListIdParam != null && todoListIdParam !== "") {
      todoListId = todoListIdParam.toString();
      if (todoListId !== "") {
        getListData();
      }
    }
  }, []);

  return (
    <>
      <div className="md:pt-1 pb-5 flex flex-col md:flex-row items-start md:items-center justify-between">
        <p
          tabIndex="0"
          className="flex-shrink-0 focus:outline-none text-lg md:text-2xl font-bold leading-normal text-gray-800 dark:text-white mb-2 md:mb-0"
        >
          {listData?.todoList_name ?? "My Day"}
        </p>

        <div className="mt-2 md:flex space-x-2 md:space-x-2 flex-col md:flex-row md:items-center">
          <AddTask />
          <EditToDo />
          <DeleteToDo />
        </div>
      </div>
    </>
  );
};

export default ToDoHeader;
