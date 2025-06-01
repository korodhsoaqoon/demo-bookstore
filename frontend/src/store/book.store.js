import { create } from "zustand";

export const useBookStore = create((set) => ({
  books: [],
  setBooks: (books) => ({ books }),
  getBooks: async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    set({ books: data });
  },
  getSingleBook: async (bookId) => {
    const res = await fetch(`/api/books/${bookId}`);
    const data = await res.json();
    return { singleData: data };
  },
  saveBook: async (newBook) => {
    if (
      !newBook.title ||
      !newBook.author ||
      !newBook.language ||
      !newBook.category ||
      !newBook.price ||
      !newBook.description ||
      !newBook.image
    ) {
      return { success: false, message: "All fields are required" };
    }
    const res = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    const data = await res.json();
    if (res.ok) {
      set((state) => ({
        books: [...state.books, data],
      }));
      return { success: true, message: "Book added successfully" };
    } else {
      return { success: false, message: data.message || "Failed to add book" };
    }
  },
  deleteBook: async (id) => {
    const res = await fetch(`/api/books/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      set((state) => ({
        books: state.books.filter((book) => book._id !== id),
      }));
      return { success: true, message: "Book deleted successfully" };
    } else {
      const data = await res.json();
      return {
        success: false,
        message: data.message || "Failed to delete book",
      };
    }
  },
  updateBook: async (id, updatedBook) => {
    const res = await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });
    const data = await res.json();
    if (res.ok) {
      set((state) => ({
        books: state.books.map((book) =>
          book.id === id ? { ...book, ...updatedBook } : book
        ),
      }));
      return { success: true, message: "Book updated successfully" };
    } else {
      return {
        success: false,
        message: data.message || "Failed to update book",
      };
    }
  },
}));
