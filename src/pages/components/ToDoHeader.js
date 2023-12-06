import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

function ToDoHeader() {
  return (
    <>
      <div className="md:pt-1 pb-5 flex flex-col md:flex-row items-start md:items-center justify-between">
        <p
          tabIndex="0"
          className="flex-shrink-0 focus:outline-none text-lg md:text-2xl font-bold leading-normal text-gray-800 dark:text-white mb-2 md:mb-0"
        >
          Mortis Daily Tasks
        </p>

        <div className="mt-2 md:flex space-x-2 md:space-x-2 flex-col md:flex-row md:items-center">
          <button
            type="button"
            id="addTaskModalButton"
            data-modal-target="addTaskModal"
            data-modal-toggle="addTaskModal"
            className="px-4 py-2.5 text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg text-center dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-purple-900 sm:w-auto"
          >
            <span className="hidden xl:inline-block">Add task</span>
            <span className="xl:hidden">
              <FontAwesomeIcon icon={faPlus} className="w-4 h-5 text-white" />
            </span>
          </button>
          <button
            type="button"
            id="editTaskModalButton"
            data-modal-target="editToDoModal"
            data-modal-toggle="editToDoModal"
            className="px-4 py-2.5 text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg text-center dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-purple-900 sm:w-auto"
          >
            <span className="hidden xl:inline-block">Edit to-do</span>
            <span className="xl:hidden">
              <FontAwesomeIcon icon={faEdit} className="w-4 h-5 text-white" />
            </span>
          </button>

          <button
            type="button"
            id="adeleteTaskModalButton"
            data-modal-target="deleteToDo"
            data-modal-toggle="deleteToDo"
            className="px-4 py-2.5 text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg text-center dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-purple-900 sm:w-auto"
          >
            <span className="hidden xl:inline-block">Delete to-do</span>
            <span className="xl:hidden">
              <FontAwesomeIcon icon={faTrash} className="w-4 h-5 text-white" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default ToDoHeader;
