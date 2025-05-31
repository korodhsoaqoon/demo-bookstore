import React from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
const NavBar = () => {
  return (
    <div className="bg-blue-100">
      <div className=" container mx-auto flex justify-between items-center p-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-950 bg-clip-text text-transparent">
          BookStore
        </h1>
        <div className="">
          <button className="text-lg mr-2 border-2 border-blue-200 rounded-lg p-2">
            <span className="flex items-center gap-2">
              {" "}
              <F    aHome className="inline-block mr-1" />
              Home
            </span>
          </button>
          <button className="text-lg mr-2 border-2 border-blue-200 rounded-lg p-2">
            <span className="flex items-center gap-2">
              {" "}
              <FaRegSquarePlus className="inline-block mr-1" />
              Add Book
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
