import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faStar,
  faSignOutAlt,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ToDoNavBar from "./TodoNavBar";

const NavBar = (props) => {
  const router = useRouter();
  const userData = props.userData;
  const [privateToDos, setprivateToDos] = useState([]);
  const [publicToDos, setpublicToDos] = useState([]);

  const fetchPrivateData = async () => {
    const apiUrl = `http://localhost:2020/todoList/privateTodosForUser/${sessionStorage.getItem(
      "user_id"
    )}`;

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
      setprivateToDos(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPublicData = async () => {
    const publicApiUrl = `http://localhost:2020/todoList/publicTodosForUser/${sessionStorage.getItem(
      "user_id"
    )}`;

    try {
      const response = await fetch(publicApiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setpublicToDos(data);
    } catch (error) {
      console.error("Error fetching public data:", error);
    }
  };

  useEffect(() => {
    fetchPrivateData();
    fetchPublicData();
  }, []);

  const Logout = () => {
    sessionStorage.removeItem("user_id");
    router.replace("/Login", { scroll: false });
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-700 text-white flex items-center justify-center rounded-full mr-2">
              {userData?.user_fname ? userData.user_fname.charAt(0) : "0"}
              {userData?.user_lname ? userData.user_lname.charAt(0) : "0"}
            </div>
            <div>
              <p className="font-bold text-sm">
                {userData?.user_fname} {userData?.user_lname}
              </p>
              <p className="text-xs">{userData?.user_email}</p>
            </div>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              className="py-2 px-10 my-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 flex items-center font-bold text-sm"
              onClick={Logout}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="w-5 h-5 text-gray-500 mr-2"
              />
              Logout
            </button>
          </div>
          <hr className="my-4 border-t border-gray-700" />
          <ul className="space-y-2 mt-4">
            <li>
              <a
                href="/Home"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faMoon}
                  className="w-6 h-6 text-gray-400 mr-2"
                />
                <span className="ml-1 font-bold text-sm">My Day</span>
              </a>
            </li>
            <li>
              <a
                href="/Home"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faStar}
                  className="w-6 h-6 text-gray-400 mr-2"
                />
                <span className="ml-1 font-bold text-sm">Important</span>
              </a>
            </li>
            <li>
              <a
                href="/Planned"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="w-6 h-6 text-gray-400 mr-2"
                />
                <span className="ml-1 font-bold text-sm">Planned</span>
              </a>
            </li>
          </ul>
          <hr className="my-4 border-t border-gray-700" />
          <p className="mt-2 text-sm font-bold text-white-600">My To-Dos</p>
          {/* My To-Dos List */}

          <ul className="space-y-2 mt-4 overflow-y-auto">
            {privateToDos.length === 0 ? (
              <p>No private todos available</p>
            ) : (
              <ul className="space-y-2 mt-4 overflow-y-auto">
                {privateToDos.map((todo) => (
                  <ToDoNavBar
                    key={todo.todoList_id}
                    id={todo.todoList_id}
                    todoList_name={todo.todoList_name}
                    todoList_description={todo.todoList_description}
                  />
                ))}
              </ul>
            )}
          </ul>

          <hr className="my-4 border-t border-gray-700" />
          <p className="mt-2 text-sm font-bold text-white-600">Shared To-Dos</p>
          <ul className="space-y-2 mt-4 overflow-y-auto">
            {publicToDos.length === 0 ? (
              <p>No public todos available</p>
            ) : (
              <ul className="space-y-2 mt-4 overflow-y-auto">
                {publicToDos.map((todo) => (
                  <ToDoNavBar
                    key={todo.todoList_id}
                    id={todo.todoList_id}
                    todoList_name={todo.todoList_name}
                    todoList_description={todo.todoList_description}
                  />
                ))}
              </ul>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default NavBar;
