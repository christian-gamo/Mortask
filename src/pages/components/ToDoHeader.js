import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilter,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
function ToDoHeader () {
    return  (
        <>
<div class="md:pt-1 pb-5 flex items-center justify-between">
    <p tabindex="0" class="flex-shrink-0 focus:outline-none text-lg md:text-3xl font-bold leading-normal text-gray-800 dark:text-white">Mortis Daily Tasks</p>

    <div class="flex space-x-2">
        <button id="dropdownFilterByButton" data-dropdown-toggle="dropdownFilterBy" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto" type="button">
            <span class="hidden xl:inline-block">Filter by</span>
            <span class="xl:hidden"><FontAwesomeIcon
                icon={faFilter}
                className="w-4 h-5 text-white"
            /></span>
        </button>

        <button type="button" id="addTaskModalButton" data-modal-target="addTaskModal" data-modal-toggle="addTaskModal" class="px-4 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
            <span class="hidden xl:inline-block">Add task</span>
            <span class="xl:hidden"><FontAwesomeIcon
                icon={faPlus}
                className="w-4 h-5 text-white"
            /></span>
        </button>

    </div>
</div>
</>
)}; export default ToDoHeader;