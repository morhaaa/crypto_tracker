import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-between py-2 px-2 md:px-10 bg-gradient-to-r from-gray-900 to-gray-800 min-h-[5vh]">
      <div className="flex w-full justify-between border-t italic text-gray-200 text-xs md:text-sm font-semibold">
        <div>Crypto Tracker ©</div> <div>Made By Mohamed Rhanmi</div>
      </div>
    </footer>
  );
};

export default Footer;
