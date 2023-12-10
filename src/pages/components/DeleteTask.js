import { Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const DeleteTask = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const item = props.item;

  const handleDeleteTask = async (e) => {
    e.preventDefault();

    if (item.todoTask_id != "") {
      const apiUrl = "http://localhost:2020/todotask/delete/";
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            todoTask_id: item.todoTask_id,
          }),
        });
        setOpenModal(false);
        window.location.reload();
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error sharing to-do:", error);
      }
    }
  };
  return (
    <>
      <button type="button" onClick={() => setOpenModal(true)}>
        <FontAwesomeIcon
          icon={faTrash}
          className="w-6 h-5   text-gray-300 dark:text-gray-500"
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
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this task ?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={handleDeleteTask}
              >
                {"Yes, I'm sure"}
              </button>
              <button
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => setOpenModal(false)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default DeleteTask;
