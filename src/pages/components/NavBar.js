import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMoon,
    faStar,
    faRightFromBracket,
    faCalendar,
    faPlus,
    faListUl,
    faBorderAll,
    faCheckCircle,
    faSignOutAlt,
    faClipboard,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';

function NavBar() {
    // Mock data for Mortis
    const mortisInfo = {
        firstName: 'Mortis',
        lastName: 'BringerOfDoom',
        email: 'mortis@gmail.com',
        initials: 'MB',
    };
    // Mock data for To-do
    const toDo = {
        todoList_name: 'Mortis Daily Tasks',
        todoList_description: 'My day',
        totalTasks: 10,
        completedTasks: 2,
    };
    const completionPercentage = (toDo.completedTasks / toDo.totalTasks) * 100;
    return (
        <>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"></script>

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

            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidenav">
                <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-purple-700 text-white flex items-center justify-center rounded-full mr-2">
                            {mortisInfo.initials}
                        </div>
                        <div>
                            <p className="font-bold text-sm">{mortisInfo.firstName} {mortisInfo.lastName}</p>
                            <p className="text-xs">{mortisInfo.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <button className="py-2 px-10 my-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 flex items-center font-bold text-sm">
                            <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 text-gray-500 mr-2" />
                            Logout
                        </button>
                    </div>
                    <hr className="my-4 border-t border-gray-700" />
                    <ul className="space-y-2 mt-4">
                        <li>
                            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faBorderAll} className="w-6 h-6 text-gray-400 mr-2" />
                                <span className="ml-1 font-bold text-sm">All</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faMoon} className="w-6 h-6 text-gray-400 mr-2" />
                                <span className="ml-1 font-bold text-sm">My Day</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faStar} className="w-6 h-6 text-gray-400 mr-2" />
                                <span className="ml-1 font-bold text-sm">Important</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faCalendar} className="w-6 h-6 text-gray-400 mr-2" />
                                <span className="ml-1 font-bold text-sm">Planned</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6 text-gray-400 mr-2" />
                                <span className="ml-1 font-bold text-sm">Completed</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faClipboard} className="w-6 h-6 text-gray-400 mr-2" />
                                <span className="ml-1 font-bold text-sm">Uncompleted</span>
                            </a>
                        </li>
                    </ul>
                    <hr className="my-4 border-t border-gray-700" />
                    <p className="mt-2 text-sm font-bold text-white-600">My To-Dos</p>
                    <ul className="space-y-2 mt-4 overflow-y-auto">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <FontAwesomeIcon icon={faListUl} className="w-6 h-6 text-gray-400 mr-2" />
                                <span className="ml-1 font-bold text-sm">{toDo.todoList_name}</span>
                            </a>
                        </li>
                    </ul>
                    <hr className="my-4 border-t border-gray-700" />
                    <p className="mt-2 text-sm font-bold text-white-600">Shared To-Dos</p>
                    <ul className="space-y-2 mt-4 overflow-y-auto">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <FontAwesomeIcon icon={faListUl} className="w-6 h-6 text-gray-400 mr-2" />
                                <span className="ml-1 font-bold text-sm">{toDo.todoList_name}</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="fixed bottom-0 left-0 w-full bg-white  dark:bg-gray-800 dark:border-gray-700 p-3 flex justify-center">
                    <button
                        className="py-2 px-10 my-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 flex items-center font-bold text-sm"
                    >
                        <FontAwesomeIcon icon={faPlus} className="w-5 h-5 text-gray-500 mr-2" />
                        New To-Do
                    </button>
                </div>
            </aside>


            <div className="p-4 sm:ml-64">
                <div className="grid grid-cols-3 gap-4">
                    {/* ... Content to add blabla ... */}
                </div>
                <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    {/* ... Content to add blabla ... */}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {/* ... Content to add blabla ... */}
                </div>
                <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    {/* ... Content for flex item ... */}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {/* ... Content to add blabla ... */}
                </div>
            </div>
        </>


    );
}
export default NavBar;
