import React from "react";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AddBookPage from "./pages/AddBookPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookDetails from "./pages/BookDetails";

const App = () => {
  return (
    <div className="font-mono bg-blue-100 min-h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/:id" element={<BookDetails />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
