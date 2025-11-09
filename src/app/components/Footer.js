import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-4 px-6 ">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-800">
        <div className="font-semibold">© FX Creations Studio</div>
        <div className="flex space-x-6 mt-4 sm:mt-0 items-center">
          <a href="#" className="hover:text-blue-600 font-medium">Portfolio</a>
          <a href="#" className="hover:text-blue-600 font-medium">Services</a>
          <a href="#" className="hover:text-blue-600 font-medium">Blog</a>
          <a href="#" className="hover:text-blue-600 font-medium">About Us</a>
        </div>
       
      </div>
    </footer>
  );
}
