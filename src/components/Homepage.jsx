import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../Pages/Footer';

function Homepage() {
  const [homeData, setHomeData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/products')
      .then((res) => setHomeData(res.data));
  }, []);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">


      <div className="relative bg-blue-200 rounded-sm overflow-hidden">
        <img
          className="w-full h-64 sm:h-80 md:h-96 object-cover"
          src="https://cdn.pixelspray.io/v2/black-bread-289bfa/XUefL6/wrkr/original/catalog/brandstore/Mothercare/316-1717439400-mc_banner3_1920x650_june24_sleepsuits-100.jpg"
          alt="Header Banner"
        />
      </div>


      <section className="mt-8 rounded-md bg-slate-400 p-6 sm:p-8 md:p-12 lg:p-16">
        <h2 className="text-2xl font-semibold mb-4 text-stone-50">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            homeData.filter((item) => item.id <= 4).map((item) => (
              <div key={item.id} className="bg-white shadow rounded p-4 hover:bg-slate-700 hover:text-white hover:scale-105 transition-transform duration-150">
                <img
                  className="w-full h-40 object-cover rounded"
                  src={item.image}
                  alt="Product"
                />
                <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                <p className="text-gray-600">{item.price}</p>
              </div>
            ))
          }
        </div>
      </section>


      <section className="mt-8 p-3">
        <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div className="bg-blue-100 shadow rounded p-4 text-center">
            <h3 className="text-lg font-bold">Boys</h3>
          </div>
          <div className="bg-pink-100 shadow rounded p-4 text-center">
            <h3 className="text-lg font-bold">Girls</h3>
          </div>
          <div className="bg-yellow-100 shadow rounded p-4 text-center">
            <h3 className="text-lg font-bold">Accessories</h3>
          </div>
          <div className="bg-green-100 shadow rounded p-4 text-center">
            <h3 className="text-lg font-bold">Toys</h3>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-blue-200 rounded-lg p-6 text-center">
        <img
          src="https://cdn.pixelspray.io/v2/black-bread-289bfa/XUefL6/wrkr/original/catalog/brandstore/Mothercare/316-1718908200-mc_webbanner_upto50_1920x650journey-100.jpg"
          alt="Summer Sale"
          className="w-full h-64 sm:h-80 md:h-96 object-cover mb-4"
        />
      </section>
      <Footer />
    </div>
  );
}

export default Homepage;
