import React, { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react';
import axios from 'axios';

function AdminUserListModel({ onClose, userId }) {
    const modelRef = useRef()
    const [userProduct, setUserProduct] = useState(null)

    const handleModelRef = (e) => {
        if (modelRef.current === e.target) {
            onClose(false)
        }
    }

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const userData = await axios.get(`http://localhost:8000/users/${userId}`)
                setUserProduct(userData.data)
            } catch {
                console.error('there is error in the userList model')
            }
        }
        dataFetch()
    }, [userId])

    if (!userProduct) {
        return null
    }

    return (
        <div ref={modelRef} onClick={handleModelRef} className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75 backdrop-blur-sm">
            <div className="bg-white p-4 rounded-sm max-w-xs w-full h-min relative">
                <button onClick={() => onClose(false)} className="absolute top-2 right-2 text-gray-700">
                    <X />
                </button>
                <h2 className="text-xl mb-2">User Details</h2>
                <p className="text-sm"><strong>ID:</strong> {userProduct.id}</p>
                <p className="text-sm"><strong>Name:</strong> {userProduct.name}</p>
                <p className="text-sm"><strong>Email:</strong> {userProduct.email}</p>
                <h3 className="text-lg mt-3 mb-1">Cart Items</h3>
                <p className="text-sm font-bold">Number of cart items: {userProduct.cart.length}</p>
                {userProduct.cart && userProduct.cart.length > 0 && (
                    <div>
                        {userProduct.cart.map((item, index) => (
                            <div key={index} className="mb-2 border border-gray-400 p-2 text-sm">
                                <p><strong>Product:</strong> {item.title}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Price:</strong> {item.price}</p>
                                <p><strong>Total:</strong> {item.quantity * item.price}</p>
                            </div>
                        ))}
                    </div>
                )}
                <button onClick={() => onClose(false)} className="mt-2 bg-gray-800 text-white py-1 px-3 rounded hover:bg-gray-700 text-sm">
                    Close
                </button>
            </div>
        </div>
    )
}

export default AdminUserListModel
