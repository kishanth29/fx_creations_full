"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Facebook, Instagram } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "About Us", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
  ];

  return (
    <header className="bg-[#fdf3f3] text-[#3d3f4c] ">
      <nav className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center md:justify-around justify-between">
        {/* Logo */}
        <div className="text-xl font-semibold leading-tight text-center">
          <p>FX CREATIONS</p>
          <p>STUDIO</p>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-[#3d3f4c] hover:text-black overflow-hidden"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hire Us Button */}
        <div className="hidden md:block">
          <Link href="#form">
            <button className="border border-red-400 text-red-500 hover:bg-red-100 px-4 py-2 rounded-md">
              Hire Us
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col space-y-3 font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="hover:text-[#3d3f4c] hover:font-semibold"
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <li>
              <button className="border border-red-400 text-red-500 hover:bg-red-100 px-4 py-2 rounded-md w-full">
                Hire Us
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
