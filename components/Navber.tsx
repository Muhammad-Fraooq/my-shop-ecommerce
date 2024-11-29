"use client";
import Link from "next/link";
import { useState } from "react";
import { RiAdminFill } from "react-icons/ri";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close the menu when a menu item is clicked
  const closeMenu = () => {
    if (menuOpen) {
      setTimeout(() => {
        setMenuOpen(false);
      }, 1000); // Close the menu after 1000ms (1 second)
    }
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-4 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link href="/">MyStore</Link>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden text-3xl cursor-pointer" onClick={toggleMenu}>
          ☰
        </div>
        {/* Desktop Menu */}
        <ul className={`md:flex space-x-6 hidden ${menuOpen ? "block" : "hidden"} md:block`}>
          <li>
            <Link
              href="/"
              className="hover:text-blue-400 transition duration-300 cursor-pointer"
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-blue-400 transition duration-300 cursor-pointer"
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/showproducts"
              className="hover:text-blue-400 transition duration-300 cursor-pointer"
              onClick={closeMenu}
            >
              All Products
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-blue-400 transition duration-300 cursor-pointer"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/add"
              className="hover:text-blue-400 transition duration-300 flex items-center cursor-pointer"
              onClick={closeMenu}
            >
              <RiAdminFill size={24} />
            </Link>
          </li>
        </ul>
      </div>
      {/* Mobile Menu Dropdown */}
      <div className={`${menuOpen ? "block" : "hidden"} md:hidden mt-4 space-y-4`}>
        <ul>
          <li>
            <Link
              href="/"
              className="block text-lg py-2 px-4 hover:bg-gray-700 rounded transition duration-300"
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block text-lg py-2 px-4 hover:bg-gray-700 rounded transition duration-300"
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/showproducts"
              className="block text-lg py-2 px-4 hover:bg-gray-700 rounded transition duration-300"
              onClick={closeMenu}
            >
              All Products
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block text-lg py-2 px-4 hover:bg-gray-700 rounded transition duration-300"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/add"
              className="block text-lg py-2 px-4 hover:bg-gray-700 rounded transition duration-300 items-center"
              onClick={closeMenu}
            >
              <RiAdminFill size={24} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
