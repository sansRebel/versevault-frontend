"use client";

import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary to-secondary text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Brand and Copyright */}
        <div className="flex items-center space-x-3">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          >
            <path d="M22.672 15.226l-2.432.811..."></path>
          </svg>
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} - All rights reserved.
          </p>
        </div>

        {/* Social Media Links */}
        <nav className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://instagram.com/khaledalsanafi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/khaled-al-sanafi-0251232a0"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/sansRebel"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
          >
            <FaGithub className="w-6 h-6" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
