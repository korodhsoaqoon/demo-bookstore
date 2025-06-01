import React from "react";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AddBookPage from "./pages/AddBookPage";

const App = () => {
  return (
    <div className="font-mono bg-blue-100 min-h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add-book" element={<AddBookPage />} />
      </Routes>
    </div>
  );
};

export default App;
