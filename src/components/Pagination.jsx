import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Pagination = ({ postsPerPage, totalPosts, setActualPage, page }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <nav className="py-3 w-full">
      <div className="flex gap-4 justify-center items-center text-lg text-gray-200 font-semibold ">
        <IoIosArrowBack
          onClick={() => setActualPage(page == 1 ? 1 : page - 1)}
          className="cursor-pointer"
        />
        <ul className="flex gap-4 ">
          {pages.map((number, id) => (
            <li
              key={id}
              onClick={() => setActualPage(number)}
              className="cursor-pointer"
            >
              {number}
            </li>
          ))}
        </ul>
        <IoIosArrowForward
          onClick={() => setActualPage(page == 10 ? 10 : page + 1)}
          className="cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Pagination;
