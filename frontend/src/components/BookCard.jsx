import { FiTrash, FiEdit, FiDelete, FiX } from "react-icons/fi";
import { CgMoreO } from "react-icons/cg";
import { useBookStore } from "../store/book.store";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useState } from "react";
import { Link } from "react-router-dom";
import {} from "react-icons/fa";
Modal.setAppElement("#root");

const BookCard = ({ book }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteBook, updateBook } = useBookStore();

  const handleDelete = async () => {
    confirmAlert({
      title: "Confirm Delete",
      message: `Are you sure you want to delete the book "${book.title}"?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await deleteBook(book._id);
            if (response.success) {
              toast.success(response.message);
            } else {
              alert(response.message || "Failed to delete book");
            }
          },
        },
        {
          label: "Cancel",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  const handleUpdate = async () => {
    console.log("Updating book:", book);
    const data = await updateBook(book._id, book);
    console.log(data);
    setIsOpen(false);
  };

  return (
    <>
      <div className="bg-blue-50 flex-1 p-4 m-2 rounded-lg shadow-md">
        <img className="rounded-lg w-full" src={book.image} alt={book.title} />
        <h2 className="text-xl font-bold text-blue-800 flex justify-between">
          <span>Titel:{book.title}</span>
          <span>Price:{book.price}</span>
        </h2>
        <hr className="bg-blue-200 h-[2px] text-blue-100" />
        <div className="">
          <h2 className="text-lg text-blue-900">Author: {book.author}</h2>

          <h2 className="text-lg text-blue-900">
            {book.updatedAt === book.createdAt
              ? "Created At: "
              : "Updated At: "}
            {new Date(book.updatedAt || book.createdAt).toLocaleDateString()}
          </h2>
          <hr className="bg-blue-200 h-[2px] text-blue-100" />
          <div className="flex items-center justify-around mt-3">
            <Link to={`/${book._id}`}>
              <button className="text-xl mr-2 text-blue-700 hover:text-lbue-800 transition-all duration-300 hover:-translate-y-1 border border-blue-700 px-4 p-2 rounded-lg cursor-pointer">
                <span className="flex items-center">
                  <CgMoreO className="inline-block mr-2" />
                  More
                </span>
              </button>
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="text-xl mr-2 text-green-700 hover:text-green-800 transition-all duration-300 hover:-translate-y-1  border border-green-700 px-4 p-2 rounded-lg cursor-pointer"
            >
              <span className="flex items-center">
                <FiEdit className="inline-block mr-2" />
                Edit
              </span>
            </button>
            <button
              onClick={handleDelete}
              className="text-xl mr-2 text-red-700 hover:text-red-800 transition-all duration-300 hover:-translate-y-1  border border-red-700 px-4 p-2 rounded-lg cursor-pointer"
            >
              <span className="flex items-center">
                <FiDelete className="inline-block mr-2" />
                Delete
              </span>
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        className="max-w-[800px] mx-auto flex justify-center items-center min-h-[50%] outline-none mt-22"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-auto max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl mb-4 font-mono text-blue-800 italic font-bold ">
              Edit Book
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <span>
                <FiX className="text-red-500 text-4xl cursor-pointer" />
              </span>
            </button>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-blue-700 font-semibold">
              Title:
              <input
                type="text"
                defaultValue={book.title}
                onChange={(e) => (book.title = e.target.value)}
                className="border border-blue-300 rounded-lg p-2 w-full mb-4"
              />
            </label>
            <label className="mb-2 text-blue-700 font-semibold">
              Author:
              <input
                type="text"
                defaultValue={book.author}
                onChange={(e) => (book.author = e.target.value)}
                className="border border-blue-300 rounded-lg p-2 w-full mb-4"
              />
            </label>
            <label className="mb-2 text-blue-700 font-semibold">
              Price:
              <input
                type="number"
                defaultValue={book.price}
                onChange={(e) => (book.price = e.target.value)}
                className="border border-blue-300 rounded-lg p-2 w-full mb-4"
              />
            </label>
            <label className="mb-2 text-blue-700 font-semibold">
              Image URL:
              <input
                type="text"
                defaultValue={book.image}
                onChange={(e) => (book.image = e.target.value)}
                className="border border-blue-300 rounded-lg p-2 w-full mb-4"
              />
            </label>
            <label className="mb-2 text-blue-700 font-semibold">
              Description:
              <textarea
                defaultValue={book.description}
                onChange={(e) => (book.description = e.target.value)}
                className="border border-blue-300 rounded-lg p-2 w-full mb-4"
              />
            </label>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookCard;
