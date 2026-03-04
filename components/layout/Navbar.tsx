"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/publications", label: "Publications" },
  { href: "/research", label: "Research" },
  { href: "/software", label: "Software" },
  { href: "/news", label: "News" },
  { href: "/gallery", label: "Gallery" },
  { href: "/join", label: "Join Us" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-lab-border">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logos/aran-lab-logo.png"
              alt="Aran Lab"
              width={36}
              height={36}
              className="w-9 h-9"
            />
            <span className="text-xl font-serif font-bold text-lab-blue">
              Aran Lab
            </span>
            <span className="text-sm text-lab-muted hidden sm:inline">
              @ Technion
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-lab-muted hover:text-lab-blue transition-colors rounded-md hover:bg-lab-blue/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-lab-muted hover:text-lab-blue"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-lab-border mt-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-lab-muted hover:text-lab-blue hover:bg-lab-blue/5 rounded-md"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
