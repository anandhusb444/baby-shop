import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from './Cartcontext';
import Footer from '../Pages/Footer';
import LogoutModel from '../User/LogoutModel';

const Shop = () => {
  const [fetchProduct, setFetchProduct] = useState([]);
  const [category, setCategory] = useState('all');
  const { addCart, inputState, isLogoutModel } = useContext(ShopContext);

  useEffect(() => {
    const productFetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/products');
        setFetchProduct(data);
      } catch (error) {
        console.error("There is some server error", error);
      }
    };
    productFetchData();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredProduct = fetchProduct.filter((item) => 
    (category === 'all' || item.category === category) &&
    item.title.toLowerCase().includes(inputState.toLowerCase())
  );

  return (
    <> 
      <div className="p-7 bg-gray-50">
        <div className="mb-4">
          <label htmlFor="category" className="mr-2">Filter by category:</label>
          <select id="category" value={category} onChange={handleCategoryChange} className="p-2 border rounded">
            <option value="all">All</option>
            <option value="toys">toys</option>
            <option value="clothing">Clothing</option>
            <option value="food">foods</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredProduct.map((item) => (
            <div key={item.id} className="p-1 rounded overflow-hidden border-4 border-indigo-200 shadow-lg hover:scale-110 transition-transform duration-150">
              <img className="p-2 w-min h-60 object-cover" src={item.image} alt="Product Image" />
              <div className="px-4 py-3">
                <div className="font-bold text-base">{item.title}</div>
                <p className="text-gray-700 text-sm">${item.price}</p>
              </div>
              <div className="px-4 py-1">
                <button onClick={() => addCart(item, item.id)} className="bg-blueberry-900 hover:bg-blueberry-800 text-white font-bold py-2 px-4">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
