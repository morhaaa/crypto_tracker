import React, { Children } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-[#02010a] min-h-full flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
