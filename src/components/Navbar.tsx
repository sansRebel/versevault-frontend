"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineUser, AiOutlineHome } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: <AiOutlineHome /> },
    { href: "/blogs", label: "Blogs", icon: <BiBook /> },
    { href: "/about", label: "About", icon: <FaInfoCircle /> },
    { href: "/profile", label: "Profile", icon: <AiOutlineUser /> },
    { href: "/auth", label: "Login", icon: <FiLogIn /> },
  ];

  return (
    <div className="navbar bg-white shadow-md fixed top-0 z-50 px-4">
      {/* Brand */}
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl font-bold text-primary">
          VerseVault
        </Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex-none">
        <button
          className="btn btn-ghost"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Links for Desktop */}
      <div className="hidden md:flex flex-none gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 text-gray-600 hover:text-primary font-medium ${
              pathname === link.href ? "text-primary font-semibold" : ""
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Dropdown Menu for Mobile */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
          <ul className="menu p-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 text-gray-600 hover:text-primary font-medium ${
                    pathname === link.href ? "text-primary font-semibold" : ""
                  }`}
                  onClick={() => setMenuOpen(false)} // Close menu on link click
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
