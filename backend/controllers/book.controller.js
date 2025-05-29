import mongoose from "mongoose";
import Book from "../models/book.model.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ status: "success", book });
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
};

export const createBook = async (req, res) => {
  const bookInfo = req.body;
  if (
    !bookInfo.title ||
    !bookInfo.author ||
    !bookInfo.price ||
    !bookInfo.description ||
    !bookInfo.category ||
    !bookInfo.Langauge
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newBook = new Book(bookInfo);
    await newBook.save();
    res.status(201).json({ status: "success", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Error creating book", error });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ status: "success", book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};
