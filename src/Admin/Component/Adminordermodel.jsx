import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

function AdminOrderModel({ order, onClose }) {
    const [orderData, setOrderData] = useState(null); // Change to null to handle empty state
    const [cartItems, setCartItems] = useState([]);
    const [isOrder, setIsOrder] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7114/api/Order/UserOrder?Id=${order}`,{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                console.log(response.data.data)
                const dataOrder = response.data.data;
                
                if (dataOrder) {
                    setOrderData(dataOrder[0]);
                    setCartItems(dataOrder.cart);
                    setIsOrder(true);
                } else {
                    setOrderData(null);
                    //setCartItems([]);
                    setIsOrder(false);
                }
            } catch (error) {
                console.error('Error fetching order data:', error);
                setOrderData(null);
                setCartItems([]);
                setIsOrder(false);
            }
        };
        fetchData();
    }, [order]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75 backdrop-blur-sm">
            <div className="bg-white p-4 rounded-sm max-w-xs w-full h-min relative">
                <button onClick={() => onClose(false)} className="absolute top-2 right-2 text-gray-700">
                    <X />
                </button>

                <h2 className="text-xl mb-2">Order Details</h2>
                {isOrder ? (
                    <>
                        <p className="text-sm"><strong>Product:</strong> {orderData.productName}</p>
                        <p className="text-sm"><strong>Quantity:</strong> {orderData.quantity}</p>
                        {/* <p className="text-sm"><strong>Order Date:</strong> {orderData.orderDate}</p> */}
                        <p className="text-sm"><strong>Total:</strong> {orderData.total}</p>
                        {/* <p className="text-sm"><strong>Account Number:</strong> {orderData.account}</p>
                        <p className="text-sm"><strong>Total Price:</strong> {orderData.price}</p> */}
                        
                    </>
                ) : (
                    <p className="text-sm">No order details available.</p>
                )}
                <button onClick={() => onClose(false)} className="mt-2 bg-gray-800 text-white py-1 px-3 rounded hover:bg-gray-700 text-sm">
                    Close
                </button>
            </div>
        </div>
    );
}

export default AdminOrderModel;
