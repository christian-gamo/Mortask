import React, { useState } from 'react';
import StarCheckbox from './StarCheckbox';
import AddTask from './AddTask';
import DeleteTask from './DeleteTask';
import ToDoHeader from './ToDoHeader';

const ToDo = () => {
    const [isChecked, setChecked] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);
  
    const toggleTaskTextDecoration = () => {
        setChecked(!isChecked);
    };

    const toggleCompletedSection = () => {
        setShowCompleted(!showCompleted);
    };

    return (
        <>
         {/* Modal components import */}
        <AddTask/>
        <DeleteTask/>  

            {/* ToDo Layout */}
            <div className="p-5 sm:ml-64">
                <div class="px-1 sm:px-5 w-full">
                    <div class="w-full mt-7 p-5 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                        {/* To do header import */}
                        <ToDoHeader/>
                        <div id="dropdownFilterBy" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">University</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Gaming competition</a>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-2">
                            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                                <input
                                    id="default-checkbox"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 mr-3 text-blue-600 bg-gray-100 border-gray-400 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={toggleTaskTextDecoration}
                                />
                                <p
                                    className={`ml-3 font-semibold text-md text-gray-700 dark:text-gray-300 ${isChecked ? 'line-through' : ''}`}
                                >
                                    Task 1
                                </p>
                                <div class="ml-auto px-4 py-3 flex items-center justify-end">
                                    <span className="hidden xl:inline-block bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">University</span>
                                    <span className="hidden xl:inline-block bg-indigo-100 text-indigo-800 text-sm font-medium me-2 mr-10 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">25/11/2023</span>

                                    <StarCheckbox />
                                    <button id="task-dropdown-button" data-dropdown-toggle="task-dropdown" class="pl-5 inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </button>
                                    <div id="task-dropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-600">
                                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="task-dropdown-button">
                                            <li>
                                                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit task</a>
                                            </li>
                                        </ul>
                                        <div class="py-1">
                                            <a id="deleteButton" data-modal-target="deleteModal" data-modal-toggle="deleteModal" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                Delete task
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Completed task section */}
                    <button
                        id="toggleCompletedSection"
                        type="button"
                        onClick={toggleCompletedSection}
                        className="mt-5 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Completed
                    </button>

                    {showCompleted && (
                        
                        <div
                            id="completedSection"
                            className="w-full mt-2 p-5 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700"
                        > 

                            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                                <input
                                    id="default-checkbox"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 mr-3 text-blue-600 bg-gray-100 border-gray-400 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={toggleTaskTextDecoration}
                                />
                                <p
                                    className={`ml-3 font-semibold text-md text-gray-700 dark:text-gray-300 ${isChecked ? 'line-through' : ''}`}
                                >
                                    Task 2
                                </p>
                                <div class="ml-auto px-4 py-3 flex items-center justify-end">
                                    <span className="hidden xl:inline-block bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">Gaming</span>
                                    <span className="hidden xl:inline-block bg-indigo-100 text-indigo-800 text-sm font-medium me-2 mr-10 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">25/11/2023</span>

                                    <StarCheckbox />
                                    <button id="task-dropdown-button" data-dropdown-toggle="task-dropdown" class="pl-5 inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </button>
                                    <div id="task-dropdown1" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-600">
                                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="task-dropdown-button">
                                            <li>
                                                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit task</a>
                                            </li>
                                        </ul>
                                        <div class="py-1">
                                            <a id="deleteButton" data-modal-target="deleteModal" data-modal-toggle="deleteModal" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                Delete task
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}


                </div>
            </div>
        </>
    );
};

export default ToDo;
