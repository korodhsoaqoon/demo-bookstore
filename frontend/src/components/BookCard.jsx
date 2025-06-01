import { FiTrash, FiEdit, FiDelete } from "react-icons/fi";
import { CgMoreO } from "react-icons/cg";
const BookCard = ({ book }) => {
  return (
    <div className="bg-blue-50 flex-1 p-4 m-2 rounded-lg shadow-md">
      <img className="rounded-lg w-full" src={book.image} alt={book.title} />
      <h2 className="text-xl font-bold text-blue-800 flex justify-between">
        <span>Titel:{book.title}</span>
        <span>Price:{book.price}</span>
      </h2>
      <hr className="bg-blue-200 h-[2px] text-blue-100" />
      <div className="">
        <h2 className="text-lg text-blue-900">Author: {book.author}</h2>
        <h2 className="text-lg text-blue-900">Language: {book.language}</h2>
        <h2 className="text-lg text-blue-900">Category: {book.category}</h2>
        <h2 className="text-lg text-blue-900">
          Description: {book.description}
        </h2>
        <h2 className="text-lg text-blue-900">
          {book.updatedAt === book.createdAt ? "Created At: " : "Updated At: "}
          {new Date(book.updatedAt || book.createdAt).toLocaleDateString()}
        </h2>
        <hr className="bg-blue-200 h-[2px] text-blue-100" />
        <div className="flex items-center justify-around mt-3">
          <button className="text-xl mr-2 text-blue-700 hover:text-lbue-800 transition-all duration-300 hover:-translate-y-1 border border-blue-700 px-4 p-2 rounded-lg cursor-pointer">
            <span className="flex items-center">
              <CgMoreO className="inline-block mr-2" />
              More
            </span>
          </button>
          <button className="text-xl mr-2 text-green-700 hover:text-green-800 transition-all duration-300 hover:-translate-y-1  border border-green-700 px-4 p-2 rounded-lg cursor-pointer">
            <span className="flex items-center">
              <FiEdit className="inline-block mr-2" />
              Edit
            </span>
          </button>
          <button className="text-xl mr-2 text-red-700 hover:text-red-800 transition-all duration-300 hover:-translate-y-1  border border-red-700 px-4 p-2 rounded-lg cursor-pointer">
            <span className="flex items-center">
              <FiDelete className="inline-block mr-2" />
              Delete
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
