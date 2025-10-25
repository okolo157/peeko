"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-zinc-800">
        <div className="max-w-[95vw] mx-auto px-4 md:px-6 py-4 md:py-6 flex items-center justify-between">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 relative group">
            {/* Logo with white refraction */}
            <div className="relative w-10 h-10 overflow-hidden rounded-full">
              <Image
                src="/peekologo.jpg"
                alt="Peeko Logo"
                fill
                className="object-cover transition-all duration-300 group-hover:scale-110"
              />
              {/* White refraction glow on hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 mix-blend-overlay transition-all duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-white/30 blur-md" />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex gap-8 text-sm tracking-wider uppercase"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <Link
              href="/"
              className="relative text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300"
            >
              Home
            </Link>
            <Link
              href="/gallery"
              className="relative text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300"
            >
              Gallery
            </Link>
            <Link
              href="/about"
              className="relative text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="relative text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300"
            >
              Bookings
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-6 h-5 flex flex-col justify-between z-50"
            aria-label="Toggle menu"
          >
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 md:hidden transition-all duration-500 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav
          className="flex flex-col items-center justify-center h-full gap-8 text-2xl uppercase tracking-wider"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={`text-white transition-all duration-500 ${
              menuOpen
                ? "translate-y-0 opacity-100 delay-75"
                : "translate-y-4 opacity-0"
            }`}
          >
            Home
          </Link>
          <Link
            href="/gallery"
            onClick={() => setMenuOpen(false)}
            className={`text-white transition-all duration-500 ${
              menuOpen
                ? "translate-y-0 opacity-100 delay-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            Gallery
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className={`text-white transition-all duration-500 ${
              menuOpen
                ? "translate-y-0 opacity-100 delay-200"
                : "translate-y-4 opacity-0"
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className={`text-white transition-all duration-500 ${
              menuOpen
                ? "translate-y-0 opacity-100 delay-300"
                : "translate-y-4 opacity-0"
            }`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
}
