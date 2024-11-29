"use client";
import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* About Us Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-blue-500">About Us</h3>
          <p className="text-gray-400">
            MyStore is your one-stop destination for quality products and services. Shop with confidence!
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-blue-500">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/home" className="hover:text-blue-400 transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-400 transition duration-300">
                About
              </Link>
            </li>
            {/* <li>
              <Link href="/add" className="hover:text-blue-400 transition duration-300">
                Add Product
              </Link>
            </li> */}
            <li>
              <Link href="/showproducts" className="hover:text-blue-400 transition duration-300">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-blue-500">Contact Us</h3>
          <p className="text-gray-400">Email: muhammad888xyz@gmail.com</p>
          <p className="text-gray-400">Phone: +92 332-2893-747</p>
          <div className="flex space-x-6 mt-4 ml-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition duration-300"
            >
              <FaFacebook size={28} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black transition duration-300"
            >
              <FaGithub size={28} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-700 transition duration-300"
            >
              <FaLinkedin size={28} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-900 py-4 mt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
      </div>
    </footer>
  );
}
