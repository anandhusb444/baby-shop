import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';


const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  //console.log("is login from the Navbar",isLogin)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

//   const handleSearch = (e) => {
//     e.preventDefault();
//   };


  return (
    <nav className="bg-white shadow-lg py-3 border-4 border-indigo-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="flex items-center justify-between h-16 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-14 w-auto"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ZahIzs2Ur7AyakOmXcW7cCBj54HZ-yRbn-X5ATAalosP6-WBCTd2Xb8N_pIzC9NRgOs&usqp=CAU"
                alt="Logo"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <NavLink
                  className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:underline"
                  to={'/userlist'}
                >
                  Userlist
                </NavLink>
                <Link
                  to={'adminproduct'}
                  className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:underline"
                >
                 Products 
                </Link>
                <NavLink
                  className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:underline"
                  to={'/about'}
                >
                  About us
                </NavLink>
                
              </div>
            </div>
          </div>
          
          <div className="hidden sm:flex sm:items-center">
            
            <NavLink
              to={'/register'}
              className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:underline"
            >
            </NavLink>
          </div>
          <div className="flex sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? 'true' : 'false'}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle classes based on menu state */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          
          <Link
            to={'/shop'}
            className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition duration-300"
            onClick={toggleMenu}
          >
            UserList
          </Link>
          <NavLink
            className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition duration-300"
            to={'/boys'}
            onClick={toggleMenu}
          >
            Products
          </NavLink>
          <NavLink
            className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition duration-300"
            to={'/girls'}
            onClick={toggleMenu}
          >
            About Us
          </NavLink>
          
          
          
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
