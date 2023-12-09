import React, { useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function ViewTask(props) {
  const [openModal, setOpenModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState([]);
  const viewedTask = props.task;

  const fetchTaskDetails = async () => {
    try {
      const item = props.task;

      if (item && item.todoTask_id) {
        const toDoTaskId = item.todoTask_id;
        const response = await fetch(
          `http://localhost:2020/todoTask/task/${toDoTaskId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setTaskDetails(data[0]);
      } else {
        console.error("Item or todoTask_id is undefined.");
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  useEffect(() => {
    if (openModal) {
      setTaskDetails([]);
      fetchTaskDetails();
    }
  }, [openModal]);

  return (
    <>
      <button
        type="button"
        onClick={function (event) {
          setOpenModal(true);
        }}
      >
        <FontAwesomeIcon
          icon={faEye}
          className="w-5 h-5  text-gray-300 dark:text-gray-500"
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
              View task
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
                  value={taskDetails?.todoTask_name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Ex : Prepare slides"
                  required
                  disabled
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
                    value={taskDetails?.todoTask_tag}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Ex : PowerPoint"
                    required
                    disabled
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
                  type="text"
                  value={new Date(
                    taskDetails?.todoTask_deadline
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled
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
                  disabled
                >
                  {taskDetails?.User && (
                    <option value={taskDetails?.User?.user_fname} selected>
                      {taskDetails?.User?.user_fname}
                    </option>
                  )}
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
                  value={taskDetails?.todoTask_description}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Ex : The presentation should last approximately 20 minutes."
                  disabled
                ></textarea>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewTask;
