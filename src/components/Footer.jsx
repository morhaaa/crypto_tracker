import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 py-6 flex justify-center px-6 text-zinc-500 text-xs w-full ">
      <div>
        &copy; 2024{" "}
        <a
          href="https://www.mohamedrhanmi.com"
          target="_blank"
          className="cursor-pointer hover:underline"
        >
          {" "}
          Rhanmi Solution
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
