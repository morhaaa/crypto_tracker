import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Pagination = ({ postsPerPage, totalPosts, setActualPage, page }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <nav className="py-3 w-full flex justify-center">
      <div className="flex gap-2 items-center text text-gray-200 font-medium">
        <IoIosArrowBack
          onClick={() => setActualPage(page == 1 ? 1 : page - 1)}
          disabled={page === 1}
          className={page !== 1 ? "cursor-pointer" : "opacity-0"}
        />
        <ul className="flex gap-2 ">
          {pages.map((number, id) => (
            <li
              key={id}
              onClick={() => setActualPage(number)}
              className={`px-2 rounded-md ${
                page == number ? " bg-gray-900" : "cursor-pointer"
              }`}
            >
              {number}
            </li>
          ))}
        </ul>
        <IoIosArrowForward
          onClick={() => setActualPage(page == 10 ? 10 : page + 1)}
          disabled={page === pages.length}
          className={pages.length !== page ? "cursor-pointer" : "opacity-0"}
        />
      </div>
    </nav>
  );
};

export default Pagination;
