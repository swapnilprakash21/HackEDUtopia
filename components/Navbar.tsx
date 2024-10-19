"use client"

import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <ProgressBar
        height="4px"
        color="#fff"
        options={{ showSpinner: false }}
        shallowRouting
      />
    <div className="bg-gradient-to-r from-[#0F0715] via-[#1E0A24] to-[#0F0715] backdrop-blur-md border-b-2 border-gray-700 py-4 px-10 text-gray-100 w-full sticky top-0 left-0 z-20 select-none shadow-lg">
      <div className="flex items-center justify-between">
        <Link href={"/"}>
          <div className="flex space-x-3 items-center cursor-pointer">
            <div className="logo -my-2">
              {/* <Image
                src={"/images/logo/mylogo.png"}
                height={100}
                width={100}
                alt=""
                className="rounded-full h-12 w-12"
                draggable={false}
              /> */}
            </div>
            <div className="text-3xl text-white font-bold">
              <span>{`${process.env.NEXT_PUBLIC_APP_NAME}`}</span>
            </div>
          </div>
        </Link>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {isOpen ? (
              <FontAwesomeIcon icon={faTimes} className="text-gray-100 transition-transform transform rotate-180" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="text-gray-100" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href={"/"} className="text-lg navlink hover:text-pink-500 transition-colors duration-300">
            Home
          </Link>
          <Link href={"/account/login"}>
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105">
              Login
            </button>
          </Link>
          <span>or</span>
          <Link href={"/account/sign-up"}>
            <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105">
              Sign Up
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-6 flex flex-col items-center space-y-5">
          <Link href={"/"} className="text-lg navlink hover:text-pink-500 transition-colors duration-300" onClick={toggleMenu}>
            Home
          </Link>
          <Link href={"/about"} className="text-lg navlink hover:text-pink-500 transition-colors duration-300" onClick={toggleMenu}>
            About Us
          </Link>
          <Link href={"/contact"} className="text-lg navlink hover:text-pink-500 transition-colors duration-300" onClick={toggleMenu}>
            Contact Us
          </Link>
          <Link href={"/account/login"} onClick={toggleMenu}>
            <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105">
              Login
            </button>
          </Link>
          <Link href={"/account/sign-up"} onClick={toggleMenu}>
            <button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
    </>
  );
};

export default Navbar;
