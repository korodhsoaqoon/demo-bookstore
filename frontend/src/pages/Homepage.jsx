import React, { useEffect, useState } from "react";
import { useBookStore } from "../store/book.store.js";
import BookCard from "../components/BookCard.jsx";
import { Link } from "react-router-dom";

const Homepage = () => {
  const { getBooks, books } = useBookStore();

  useEffect(() => {
    getBooks();
  }, []);
  return (
    <div>
      <h1 className="text-4xl text-center italic font-bold my-5 text-blue-800">
        All Books📚[{books.length}]
      </h1>

      {books.length === 0 ? (
        <h2 className="text-2xl text-center text-gray -500 italic font-semibold my-5 ">
          There Is No Books Available
          <Link to="/add-book" className="text-blue-500 underline ml-3">
            Add New Book
          </Link>
        </h2>
      ) : (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {books.map((book, index) => {
            return <BookCard book={book} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Homepage;
