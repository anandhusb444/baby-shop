import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from './Cartcontext';
import axios from 'axios';
import Paymentmodel from '../User/Paymentmodel';

function Cart() {
  const [payModel, setPayModel] = useState(false);
  const { cart, setCart, id, removeFromCart, incrementCart, decermentCart } = useContext(ShopContext);

  // Fetch cart from backend if local cart is empty
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (cart.length === 0 && id) { 
          const response = await axios.get(`https://localhost:7114/api/Cart/Cart`,{
            headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          setCart(response.data.data)
           
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [cart.length, id, cart,setCart]);

  let total = cart.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);
 
  return (
    <div className="p-4"> 
      {cart.length === 0 ? (
        <p className="text-black text-center">Your cart is empty!</p>
      ) : (
        <>
          <p className="text-lg font-semibold mb-2">Cart Items ({cart.length})</p>
          {cart.map((item) => (
            <div
            
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-center mb-4 py-3 p-4 bg-white shadow rounded"
            >
              <img
                className="w-full sm:w-24 h-24 object-cover"
                src={item.image}
                alt={item.title}
              />
              <div className="flex-1 sm:ml-4 mt-2 sm:mt-0">
                <div className="font-bold text-center sm:text-left">{item.title}</div>
                <div className="text-sm text-gray-700 text-center sm:text-left">{item.description}</div>
                <div className="text-sm text-gray-700 text-center sm:text-left">${item.price * item.quantity}</div>
                {console.log(item.price)}
                <div className="flex justify-center sm:justify-start items-center mt-2">
                  <button
                    onClick={() => decermentCart(item.id)}
                    className="bg-blue-800 text-white font-bold py-1 px-3"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => incrementCart(item.id)}
                    className="bg-blue-800 text-white font-bold py-1 px-3"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-blueberry-900 text-white font-bold py-2 px-4 mt-2 sm:mt-0"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="bg-slate-100 p-4 w-full text-center">
            <div className="text-lg font-semibold">Total Price: ${total}</div>
          </div>
          <button onClick={() => setPayModel(true)} className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 mt-4 w-full sm:w-auto">
            Checkout
          </button>
        </>
      )}
      {payModel && <Paymentmodel setPayModel={() => setPayModel(false)} />}
    </div>

    
  );
}

export default Cart;
