import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-200 shadow-lg py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">About Us</h3>
            <p className="mt-4 text-gray-600">
              Welcome to our baby shop! We offer a wide range of baby products to cater to all your little one's needs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Quick Links</h3>
            <ul className="mt-4 text-gray-600">
              <li>
                <Link to="/" className="hover:text-blue-800">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-blue-800">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-800">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-800">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Customer Service</h3>
            <ul className="mt-4 text-gray-600">
              <li>
                <Link to="/faq" className="hover:text-blue-800">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-blue-800">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-800">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-800">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-800">
                <img className="h-6 w-6" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-800">
                <img className="h-6 w-6 object-cover" src="https://i.pinimg.com/originals/ee/5e/5f/ee5e5f58afcfb20500d8f8f1489ea191.jpg" alt="Twitter" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-800">
                <img className="h-6 w-6 object-cover" src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-800">
                <img className="h-6 w-6 object-cover" src="https://w7.pngwing.com/pngs/208/269/png-transparent-youtube-play-button-computer-icons-youtube-youtube-logo-angle-rectangle-logo.png" alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-4">
          <p className="text-gray-600 text-center">
            &copy; {new Date().getFullYear()} Baby Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
