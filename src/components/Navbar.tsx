import React from 'react';

export default function Navbar() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  const path = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
          Salman kabir
        </div>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative group transition-colors duration-300 ${path === link.href ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {link.name}
              <span className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-indigo-400 to-cyan-400 transition-all duration-300 ${path === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </a>
          ))}

          <button
            onClick={() => {
              const root = document.documentElement;
              const isDark = root.classList.toggle('dark');
              localStorage.setItem('theme', isDark ? 'dark' : 'light');
            }}
            className="ml-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            ☀️
          </button>
        </div>
      </div>
    </nav>
  );
}
