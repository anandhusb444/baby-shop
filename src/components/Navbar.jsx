import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from './Cartcontext';
import { UserRound} from "lucide-react";
import toast from 'react-hot-toast';
import LogoutModel from '../User/LogoutModel';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal,setmodal] = useState(false)
  const { cart, handleChangeIput, inputState,isUser,setIsUser,setIsCart,isCart,} = useContext(ShopContext);
  //console.log("is login from the Navbar",isLogin)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };


  useEffect(()=>{
  const user = localStorage.getItem("id")
    if(user){
      setIsUser(true)
      setIsCart(true)
      
      console.log(user)
    }
    
  },[setIsUser])

  const handleLogout = ()=>{
    localStorage.removeItem("id")
    toast.error("user been logout")
    setIsUser(false)
    setIsCart(false)
  }

  console.log(cart.length)

  return (
    <nav className="bg-white shadow-lg py-3 border-4 border-indigo-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-14 w-auto"
                src="https://websitedemos.net/baby-store-04/wp-content/uploads/sites/750/2020/12/baby-store-logo.svg"
                alt="Logo"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <NavLink
                  className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:underline"
                  to={'/'}
                >
                  Home
                </NavLink>
                <Link
                  to={'/shop'}
                  className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:underline"
                >
                  Shop
                </Link>
                <NavLink
                  className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:underline"
                  to={'/about'}
                >
                  About us
                </NavLink>
                <NavLink
                  className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:underline"
                  to={'/contactUs'}
                >
                  Contact Us
                </NavLink>
              </div>
            </div>
          </div>
          <form className="hidden sm:block mx-3" onSubmit={handleSearch}>
            <input
              type="text"
              name="search"
              value={inputState}
              onChange={handleChangeIput}
              className="w-40 md:w-60 lg:w-80 py-2 px-6 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
              placeholder="Browse Product"
            />
          </form>
          <div className="hidden sm:flex sm:items-center">
            <NavLink
              to={'/cart'}
              className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center hover:underline relative"
            >
              <img
                className="w-7 h-6 mr-1"
                src="https://static.vecteezy.com/system/resources/previews/027/381/351/original/shopping-cart-icon-shopping-trolley-icon-shopping-cart-logo-container-for-goods-and-products-economics-symbol-design-elements-basket-symbol-silhouette-retail-design-elements-vector.jpg"
                alt="Cart"
              />
              {isCart ? (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-900 rounded-full">
                  {cart.length}
                </span>
              ) : null}

            </NavLink>
           
            
            {isUser ? ( <UserRound
                         onClick={()=>setmodal(true)}
            
            />) 
            : (
               <NavLink
              to={'/register'}
              className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:underline"
            >
              login
            </NavLink>
            )}  
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
          <NavLink
            className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition duration-300"
            to={'/'}
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <Link
            to={'/shop'}
            className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition duration-300"
            onClick={toggleMenu}
          >
            Shop
          </Link>
          <NavLink
            className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition duration-300"
            to={'/boys'}
            onClick={toggleMenu}
          >
            Boys
          </NavLink>
          <NavLink
            className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition duration-300"
            to={'/girls'}
            onClick={toggleMenu}
          >
            Girls
          </NavLink>
          <form className="px-3 py-2" onSubmit={handleSearch}>
            <input
              type="text"
              name="search"
              value={inputState}
              onChange={handleChangeIput}
              className="w-full py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
              placeholder="Browse Product"
            />
          </form>
          <NavLink
            className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition duration-300"
            to={'/cart'}
            onClick={toggleMenu}
          >
            Cart
            {cart.length > 0 && (
              <span className="ml-1 px-2 py-1 text-xs font-bold leading-none text-white bg-blue-900 rounded-full">
                {cart.length}
              </span>
            )}
          </NavLink>
          <NavLink
            className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition duration-300"
            to={'/register'}
            onClick={toggleMenu}
          >
            Login
          </NavLink>
        </div>
      </div>
      {modal && <LogoutModel setmodal={()=>{setmodal(false)}}     setIsUser={setIsUser}/>}
    </nav>
  );
};

export default Navbar;
