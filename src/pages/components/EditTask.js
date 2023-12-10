import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
const EditTask = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const item = props.item;

  let todoListId = "";
  const [name, setName] = useState(item.todoTask_name);
  const [tag, setTag] = useState(item.todoTask_tag);
  const [deadline, setDeadline] = useState(item.todoTask_deadline);
  const [assignee, setAssignee] = useState(item.todoTask_assigned);
  const [description, setDescription] = useState(item.todoTask_description);

  const [allUsers, setAllUsers] = useState([]);
  const getUsersForTodo = async () => {
    const apiUrl = `http://localhost:2020/todolist/users/${todoListId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditTask = async (e) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    const todoListIdParam = url.searchParams.get("todoList_id");
    todoListId = todoListIdParam.toString();
    if (todoListId != "") {
      console.log(todoListId);

      if (!name || !tag || !deadline || !assignee || !description) {
        return;
      }

      const apiUrl = "http://localhost:2020/todotask/edit/";

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            todoTask_name: name,
            todoTask_description: description,
            todoTask_tag: tag,
            todoTask_deadline: deadline,
            todoTask_assigned_user: assignee,
            todoTask_id: item.todoTask_id,
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
    setAllUsers([]);
    const url = new URL(window.location.href);
    const todoListIdParam = url.searchParams.get("todoList_id");
    if (todoListIdParam != null && todoListIdParam !== "") {
      todoListId = todoListIdParam.toString();
      if (todoListId !== "") {
        getUsersForTodo();
      }
    }
  }, []);

  return (
    <>
      <button type="button" onClick={() => setOpenModal(true)}>
        <FontAwesomeIcon
          icon={faPen}
          className="w-6 h-5 text-gray-300 dark:text-gray-500"
        />
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
              Edit task
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
                  placeholder="Ex : Prepare Slides"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="xs:w-1/2">
                <label
                  htmlFor="tag"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tag
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="tag"
                    id="tag"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Ex : PowerPoint"
                    required
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="deadline"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Deadline
                </label>
                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={deadline ? deadline.split("T")[0] : ""}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="assignee"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Assign to
                </label>
                <select
                  name="assignee"
                  id="assignee"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select assignee
                  </option>
                  {allUsers[0]?.Users.map((user) => (
                    <option key={user.user_id} value={user.user_id}>
                      {user.user_fname + " " + user.user_lname}
                    </option>
                  ))}
                </select>
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
                  placeholder="Ex : The presentation should last approximately 20 minutes."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handleEditTask}
              className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-blue-900 sm:w-auto"
            >
              Update task
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default EditTask;
