import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faStar, faRightFromBracket, faCalendar, faPlus, faListUl, faBorderAll, faCircleCheck, faClipboard} from '@fortawesome/free-solid-svg-icons';

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
    todoList_name : 'Mortis Daily Tasks',
    todoList_description: 'My day',
  };

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-700 text-white flex items-center justify-center rounded-full mr-2">
              {mortisInfo.initials}
            </div>
            <div>
              <p className="font-bold text-sm">
                {mortisInfo.firstName} {mortisInfo.lastName}
              </p>
              <p className="text-xs">
                {mortisInfo.email}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              className="py-2 px-10 my-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 flex items-center font-bold text-sm"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5 text-gray-500 mr-2" />
              Logout
            </button>
          </div>
          <hr className="my-4 border-t border-gray-700" />
          <ul className="space-y-2 mt-4">
          <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon icon={faBorderAll} className="w-6 h-6 text-gray-400 mr-2" />
                <span className="ml-1 font-bold text-sm">All</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon icon={faMoon} className="w-6 h-6 text-gray-400 mr-2" />
                <span className="ml-1 font-bold text-sm">My Day</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon icon={faStar} className="w-6 h-6 text-gray-400 mr-2" />
                <span className="ml-1 font-bold text-sm">Important</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon icon={faCalendar} className="w-6 h-6 text-gray-400 mr-2" />
                <span className="ml-1 font-bold text-sm">Planned</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon icon={faCircleCheck} className="w-6 h-6 text-gray-400 mr-2" />
                <span className="ml-1 font-bold text-sm">Completed</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon icon={faClipboard} className="w-6 h-6 text-gray-400 mr-2" />
                <span className="ml-1 font-bold text-sm">Uncompleted</span>
              </a>
            </li>
          </ul>
          <hr className="my-4 border-t border-gray-700" />
          <p className="mt-2 text-sm font-bold text-white-600">My To-Dos</p>
          {/* My To-Dos List */}
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
    </>
  );
}
export default NavBar;
