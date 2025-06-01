import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import { useBookStore } from "../store/book.store";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
Modal.setAppElement("#root");

const BookDetails = () => {
  const { getSingleBook, deleteBook, updateBook } = useBookStore();
  const [isOpen, setIsOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState();
  const prams = useParams();
  const bookId = prams.id;

  const getTheBook = async () => {
    const response = await getSingleBook(bookId);
    const { singleData } = response;
    setBookDetails(singleData.book);
  };

  const handleDelete = async () => {
    confirmAlert({
      title: "Confirm Delete",
      message: `Are you sure you want to delete the book "${bookDetails.title}"?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await deleteBook(bookDetails._id);
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
    console.log("Updating book:", bookDetails);
    const data = await updateBook(bookDetails._id, bookDetails);
    console.log(data);
    setIsOpen(false);
  };

  useEffect(() => {
    getTheBook();
  }, []);

  return (
    <>
      <div className="bg-blue-100 min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center my-8">Book Details</h1>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="">
            <img
              className="w-full  object-cover rounded-lg mb-4 h-full"
              src={bookDetails?.image}
              alt="Book Cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">
              Title:
              {bookDetails?.title}
            </h2>
            <p className="text-gray-600 mb-4">
              Language: {bookDetails?.language}
            </p>
            <p className="text-gray-600 mb-4">
              Category: {bookDetails?.category}
            </p>
            <p className="text-gray-600 mb-4">
              Description:{bookDetails?.description}
            </p>
            <p className="text-gray-600 mb-4">Price:{bookDetails?.price}</p>
            <p className="text-gray-600 mb-4">
              Created At: {new Date().toLocaleDateString()}
            </p>
            <div className=" grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
              >
                <span className="flex items-center">
                  <FiEdit className="inline-block mr-2" />
                  Edit
                </span>
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-2 py-2 ml-4 rounded-lg hover:bg-red-700 transition duration-300 cursor-pointer"
              >
                <span className="flex items-center">
                  <FiTrash className="inline-block mr-2" />
                  Delete
                </span>
              </button>
            </div>
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
                defaultValue={bookDetails?.title}
                onChange={(e) => (bookDetails.title = e.target.value)}
                className="border border-blue-300 rounded-lg p-2 w-full mb-4"
              />
            </label>
            <label className="mb-2 text-blue-700 font-semibold">
              Author:
              <input
                type="text"
                defaultValue={bookDetails?.author}
                onChange={(e) => (bookDetails.author = e.target.value)}
                className="border border-blue-300 rounded-lg p-2 w-full mb-4"
              />
            </label>
            <label className="mb-2 text-blue-700 font-semibold">
              Language:
              <input
                type="text"
                defaultValue={bookDetails?.language}
                onChange={(e) => (bookDetails.language = e.target.value)}
                className="border border-blue-300 rounded-lg p-2 w-full mb-4"
              />
            </label>
            <label className="mb-2 text-blue-700 font-semibold">
              Price:
              <input
                type="number"
                defaultValue={bookDetails?.price}
                onChange={(e) => (bookDetails.price = e.target.value)}
                className="border border-blue-300 rounded-lg p-2 w-full mb-4"
              />
            </label>
            <label className="mb-2 text-blue-700 font-semibold">
              Image URL:
              <input
                type="text"
                defaultValue={bookDetails?.image}
                onChange={(e) => (bookDetails.image = e.target.value)}
                className="border border-blue-300 rounded-lg p-2 w-full mb-4"
              />
            </label>
            <label className="mb-2 text-blue-700 font-semibold">
              Description:
              <textarea
                defaultValue={bookDetails?.description}
                onChange={(e) => (bookDetails.description = e.target.value)}
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

export default BookDetails;
