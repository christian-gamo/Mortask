import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
const EditToDo = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const listData = props.listData;

  let todoListId = "";
  const [name, setName] = useState(listData.todoList_name);
  const [description, setDescription] = useState(listData.todoList_description);

  const handleEditList = async (e) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    const todoListIdParam = url.searchParams.get("todoList_id");
    todoListId = todoListIdParam.toString();
    if (todoListId != "") {
      if (!name || !description) {
        return;
      }

      const apiUrl = "http://localhost:2020/todolist/edit/";

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            todoList_id: todoListId,
            todoList_name: name,
            todoList_description: description,
          }),
        });
        window.location.reload();
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error sharing to-do:", error);
      }
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const todoListIdParam = url.searchParams.get("todoList_id");
    if (todoListIdParam != null && todoListIdParam !== "") {
      todoListId = todoListIdParam.toString();
    }
  }, []);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpenModal(true)}
        className="px-4 py-2.5 text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg text-center dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-purple-900 sm:w-auto"
      >
        <span className="hidden xl:inline-block">Edit to-do</span>
        <span className="xl:hidden">
          <FontAwesomeIcon icon={faEdit} className="w-4 h-5 text-white" />
        </span>
      </button>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit to-do
            </h3>
          </div>
          <form>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Ex : Front-end project"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Ex : All the tasks related to FE project"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handleEditList}
              className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-purple-900 sm:w-auto"
            >
              Update new to-do
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default EditToDo;
