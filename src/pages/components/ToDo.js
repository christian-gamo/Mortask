import React, { useState } from 'react';
import ToDoHeader from './ToDoHeader';
import AddTask from './AddTask';
import DeleteTask from './DeleteTask';
import EditTask from './EditTask';
import ToDoItem from './ToDoItem';


const ToDo = () => {
    
    const [showCompleted, setShowCompleted] = useState(false);

 
    const toggleCompletedSection = () => {
        setShowCompleted(!showCompleted);
    };

    return (
        <>
            {/* Modal components import */}
            <AddTask />
            <DeleteTask />
            <EditTask />
            {/* ToDo Layout */}
            <div className="p-5 sm:ml-64">
                <div class="px-1 sm:px-5 w-full">
                    <div class="w-full mt-7 p-5 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                        
                        <ToDoHeader />
                        <ToDoItem/>
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
          
                            <ToDoItem/>
              
                        </div>
                    )}


                </div>
            </div>
        </>
    );
};

export default ToDo;
