import React from "react";

const Intro = () => {
  return (
    <div className="w-full text-center h-[200px] flex flex-col items-center justify-center">
      <h1 className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-b from-gray-200 to-gray-400 py-2">
        Crypto Tracker
      </h1>
      <p className="text-gray-300 text-sm md:text-base">
        Get All The Info Regarding Your Favorite Crypto Currency
      </p>
    </div>
  );
};

export default Intro;
