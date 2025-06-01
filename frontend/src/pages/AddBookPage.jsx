import React, { useState } from "react";
import { useBookStore } from "../store/book.store.js";
import { useNavigate } from "react-router-dom";

function AddBookPage() {
  const { saveBook } = useBookStore();
  const navigate = useNavigate();
  // State to hold the new book details
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    language: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  const handleBookRegister = async () => {
    const response = await saveBook(newBook);
    const { success, message } = response;

    if (success) {
      alert("Book added successfully");
      setNewBook({
        title: "",
        language: "",
        category: "",
        price: "",
        description: "",
        image: "",
        author: "",
      });
      navigate("/");
    } else {
      alert(message || "Failed to add book");
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-center font-extrabold text-blue-900 text-3xl my-4">
          Add New Book
        </h1>
        <div className="flex flex-col  gap-4 max-w-[800px] mx-auto bg-blue-50 p-4 rounded-lg shadow-md">
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={newBook.title ? newBook.title : ""}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="rounded p-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={newBook.author ? newBook.author : ""}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="rounded p-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="language"
            placeholder="Language"
            value={newBook.language ? newBook.language : ""}
            onChange={(e) =>
              setNewBook({ ...newBook, language: e.target.value })
            }
            className="rounded p-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newBook.category ? newBook.category : ""}
            onChange={(e) =>
              setNewBook({ ...newBook, category: e.target.value })
            }
            className="rounded p-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newBook.price ? newBook.price : ""}
            onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
            className="rounded p-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newBook.description ? newBook.description : ""}
            onChange={(e) =>
              setNewBook({ ...newBook, description: e.target.value })
            }
            className="rounded p-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newBook.image ? newBook.image : ""}
            onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
            className="rounded p-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleBookRegister}
            className="bg-blue-600 text-gray-900  text-xl uppercase cursor-pointer bg-gradient-to-r from-blue-400 to-blue-500 p-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Add Book{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBookPage;
