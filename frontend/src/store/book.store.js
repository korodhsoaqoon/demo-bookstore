import { create } from "zustand";

export const useBookStore = create((set) => ({
  books: [],
  setBooks: (books) => ({ books }),
  getBooks: async () => {
    const res = await fetch("http://localhost:3000/api/books");
    const data = await res.json();
    set({ books: data });
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
    const res = await fetch("http://localhost:3000/api/books", {
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
}));
