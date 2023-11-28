import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ToDoHeader() {
    return (
        <>
            <div className="md:pt-1 pb-5 flex items-center justify-between">
                <p tabIndex="0" className="flex-shrink-0 focus:outline-none text-lg md:text-3xl font-bold leading-normal text-gray-800 dark:text-white">Mortis Daily Tasks</p>

                <div className="flex space-x-2">
                    <button type="button" id="addTaskModalButton" data-modal-target="addTaskModal" data-modal-toggle="addTaskModal" className="px-4 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
                        <span className="hidden xl:inline-block">Add task</span>
                        <span className="xl:hidden">
                            <FontAwesomeIcon
                                icon={faPlus}
                                className="w-4 h-5 text-white"
                            />
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default ToDoHeader;
