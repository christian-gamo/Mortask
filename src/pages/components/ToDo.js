import React, { useState } from 'react';
import ToDoHeader from './ToDoHeader';
import ToDoItem from './ToDoItem';

function ToDo() {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Task 1', completed: false },
        { id: 2, text: 'Task 2', completed: false },
        // Ajoutez d'autres tâches au besoin
    ]);

    const handleToggleCompletion = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleMoveToCompleted = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: true } : todo
            )
        );
    };

    const handleMoveToPending = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: false } : todo
            )
        );
    };

    const pendingTodos = todos.filter((todo) => !todo.completed);

    return (
        <div className="p-5 sm:ml-64">
            <div className="px-1 sm:px-5 w-full">
                <div className="w-full mt-7 p-5 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                    <ToDoHeader />
                    {pendingTodos.map((todo) => (
                        <ToDoItem
                            key={todo.id}
                            isChecked={todo.completed}
                            onToggleCompletion={() => handleToggleCompletion(todo.id)}
                            onMoveToCompleted={() => handleMoveToCompleted(todo.id)}
                            onMoveToPending={() => handleMoveToPending(todo.id)}
                        />
                    ))}
                    <button
                        type="button"
                        className="mt-5 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
                        disabled
                    >
                        Completed
                    </button>
                    <div
                        id="completedSection"
                        className="w-full mt-2 p-5 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700"
                    >
                        {todos
                            .filter((todo) => todo.completed)
                            .map((completedTodo) => (
                                <ToDoItem
                                    key={completedTodo.id}
                                    isChecked={completedTodo.completed}
                                    onToggleCompletion={() => handleToggleCompletion(completedTodo.id)}
                                    onMoveToCompleted={() => handleMoveToCompleted(completedTodo.id)}
                                    onMoveToPending={() => handleMoveToPending(completedTodo.id)}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToDo;
