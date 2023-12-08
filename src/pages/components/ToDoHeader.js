import EditToDo from "./EditToDo";
import DeleteToDo from "./DeleteToDo";
import AddTask from "./AddTask";
import { useEffect, useState } from "react";

const ToDoHeader = (props) => {
  // const [todoList, setTodoList] = useState("");
  // const publicToDos = props.publicToDos;
  // const privateToDos = props.privateToDos;

  // useEffect(() => {
  //   const url = new URL(window.location.href);
  //   const todoListIdFromUrl = url.searchParams.get("todoList_id");

  //   // Find the to-do list in public or private to-dos based on the ID
  //   const foundTodoList =
  //     publicToDos.find((list) => list.todoList_id === todoListIdFromUrl) ||
  //     privateToDos.find((list) => list.todoList_id === todoListIdFromUrl);

  //   setTodoList(foundTodoList);
  // }, [publicToDos, privateToDos]);

  return (
    <>
      <div className="md:pt-1 pb-5 flex flex-col md:flex-row items-start md:items-center justify-between">
        <p
          tabIndex="0"
          className="flex-shrink-0 focus:outline-none text-lg md:text-2xl font-bold leading-normal text-gray-800 dark:text-white mb-2 md:mb-0"
        >
          {"AAAAAAAAAAAAAAAAAAAAA"}
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
