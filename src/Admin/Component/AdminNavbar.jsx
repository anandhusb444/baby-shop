import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import { ShopContext } from "../../components/Cartcontext";
import { UserRound} from "lucide-react";
import toast from 'react-hot-toast';

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAdmin, setIsAdmin } = useContext(ShopContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const admin = localStorage.getItem("id");
    if (admin) {
      setIsAdmin(true);
    }
  }, [setIsAdmin]);

  const hadleLogout = () => {
    localStorage.removeItem("id");
    setIsAdmin(false);
    toast.error("admin is loged out");
  };

  return (
    <>
      <nav className="bg-white shadow-lg py-3 border-4 border-indigo-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-14 w-auto"
                src="https://websitedemos.net/baby-store-04/wp-content/uploads/sites/750/2020/12/baby-store-logo.svg"
                alt="Logo"
              />
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center">
            <div className="flex space-x-4">
              <NavLink
                className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:underline"
                to={"/admin/home"}
              >
                Home
              </NavLink>
              <NavLink
                to={"/admin/products"}
                className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:underline"
              >
                Products
              </NavLink>
              <NavLink
                className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:underline"
                to={"/admin/userlist"}
              >
                User List
              </NavLink>
              {isAdmin ? (
                <UserRound className="mt-1" onClick={hadleLogout} />
              ) : null}
              {isAdmin ? null : (
                <NavLink
                  to="/login"
                  className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:underline"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>

          <div className="flex sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? "true" : "false"}
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

        <div
          className={`${isOpen ? "block" : "hidden"} sm:hidden`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/adminhome"
              className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition duration-300"
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/adminproducts"
              className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition duration-300"
              onClick={toggleMenu}
            >
              Products
            </NavLink>
            <NavLink
              to="/userlist"
              className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition duration-300"
              onClick={toggleMenu}
            >
              User List
            </NavLink>
            <NavLink
              to="/login"
              className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition duration-300"
              onClick={toggleMenu}
            >
              Login
            </NavLink>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminNavbar;
