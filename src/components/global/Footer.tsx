import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="absolute w-full z-10 bottom-0 bg-[#000000] bg-opacity-10 shadow-lg mt-auto  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex justify-center space-x-4">
          <Link
            href="#"
            className="text-[#E5E5E5] hover:text-[#00E5FF] transition-colors duration-300"
          >
            How to use
          </Link>
          &nbsp;|&nbsp;
          <Link
            href="#"
            className="text-[#E5E5E5] hover:text-[#00E5FF] transition-colors duration-300"
          >
            Developer
          </Link>
          &nbsp;|&nbsp;
          <Link
            href="#"
            className="text-[#E5E5E5] hover:text-[#00E5FF] transition-colors duration-300"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
