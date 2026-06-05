import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800 mt-12 py-6 text-center text-gray-400">
      <div className="max-w-6xl mx-auto px-6 text-sm">
        © {new Date().getFullYear()} Salman kabir. All rights reserved.
      </div>
    </footer>
  );
}
