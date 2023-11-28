import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faPrint, faShareNodes } from '@fortawesome/free-solid-svg-icons';

function SpeedDial() {
    return (
        <>
            <div data-dial-init className="fixed end-6 bottom-6 group">
                <div id="speed-dial-menu-default" className="flex flex-col items-center hidden mb-4 space-y-2">
                    <button type="button"  data-modal-target="shareToDoModal" data-modal-toggle="shareToDoModal" data-tooltip-target="tooltip-share" data-tooltip-placement="left" className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                        <FontAwesomeIcon icon={faShareNodes} className="w-5 h-5" />
                        <span className="sr-only">Share</span>
                    </button>
                    <div id="tooltip-share" role="tooltip" className="absolute z-10 invisible inline-block min-w-[105px] w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Share To-Do
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <button type="button"  data-tooltip-target="tooltip-print" data-tooltip-placement="left" className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                        <FontAwesomeIcon icon={faPrint} className="w-5 h-5" />
                        <span className="sr-only">Print </span>
                    </button>
                    <div id="tooltip-print" role="tooltip" className="absolute z-10 invisible inline-block min-w-[100px] w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Print To-Do
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <button type="button" data-modal-target="addToDoModal" data-modal-toggle="addToDoModal" data-tooltip-target="tooltip-newToDo" data-tooltip-placement="left" className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                        <FontAwesomeIcon icon={faListCheck} className="w-5 h-5" />
                        <span className="sr-only">New To-Do</span>
                    </button>
                    <div id="tooltip-newToDo" role="tooltip" className="absolute z-10 invisible inline-block min-w-[98px] px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        New To-Do
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
                <button type="button" data-dial-toggle="speed-dial-menu-default" aria-controls="speed-dial-menu-default" aria-expanded="false" className="flex items-center justify-center text-white bg-purple-700 rounded-full w-14 h-14 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 focus:outline-none dark:focus:ring-purple-800">
                    <svg className="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                    <span className="sr-only">Open actions menu</span>
                </button>
            </div>
        </>
    );
}

export default SpeedDial;
