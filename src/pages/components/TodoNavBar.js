import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ToDoNavBar({
  id,
  todoList_name,
  todoList_description,
}) {
  return (
    <li>
      <a
        href={`/Home/?todoList_id=${id}`}
        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        <FontAwesomeIcon
          icon={faListUl}
          className="w-6 h-6 text-gray-400 mr-2"
        />
        <span className="ml-1 font-bold text-sm">{todoList_name}</span>
      </a>
    </li>
  );
}
