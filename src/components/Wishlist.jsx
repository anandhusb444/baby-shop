import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import { ShopContext } from './Cartcontext';

const Wishlist = () => {
  const { wish, setWish } = useContext(ShopContext);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const res = await axios.delete(`https://localhost:7114/api/WhishList/RemoveFromWhishList?productId=${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(res.data)
      setWish(pr=>pr.filter(item=>item.id !=productId))
      
    } catch (error) {
      console.log('Error removing product from wishlist', error);
    }
  };

  
    const getWishList = async () => {
      try {
        const res = await axios.get('https://localhost:7114/api/WhishList/GetWhishList', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        //console.log(res.data.data);
        setWish(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getWishList();

    useEffect(()=>{

    },[wish])
  

  return (
    <div className="p-7 bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {wish && wish.length > 0 ? (
          wish.map((item) => (
            <div
              key={item.id}
              className="p-1 rounded overflow-hidden border-4 border-indigo-200 shadow-lg hover:scale-110 transition-transform duration-150"
            >
              <img
                className="p-2 w-min h-60 object-cover"
                src={`https://localhost:7114/Image/Products/${item.image}`}
                alt="image"
              />
              <div className="px-4 py-3">
                <div className="font-bold text-base">{item.title}</div>
                <div className=" text-base">{item.description}</div>
                <p className="text-gray-700 text-sm">{item.price}</p>
              </div>
              {/* Remove from Wishlist Button */}
              <button
                onClick={() => handleRemoveFromWishlist(item.productId)}
                className="mt-1 bg-red-500 text-white px-2 py-2 rounded hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No items in the wishlist!</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
