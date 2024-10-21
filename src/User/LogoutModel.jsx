import React, { useContext, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { ShopContext } from '../components/Cartcontext';
import toast from 'react-hot-toast';

function LogoutModel({ onClose, setmodal, setIsUser }) {
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const id = localStorage.getItem("id");
    const { setCart } = useContext(ShopContext);

    const handleModel = () => {
        setIsUser(false);
        setmodal(false);
        setCart([]);
        toast.error('User logged out');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7114/api/User/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setUserData(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const logoutuseRef = useRef();

    const handleCloseModel = (e) => {
        if (logoutuseRef.current === e.target) {
            setmodal(false);
        }
    };

    return (
        <div 
            ref={logoutuseRef} 
            onClick={handleCloseModel} 
            className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-20' // Changed items-start to items-center
        >
            <div className='relative w-80 max-w-xs bg-gray-50 shadow-lg rounded-lg'>
                <button className='absolute top-2 right-2 p-2' onClick={setmodal}>
                    <X size={24} />
                </button>
                <div className='p-4'>
                    <h1 className='text-lg font-bold mb-4'>User Details</h1>
                    {userData ? (
                        <div>
                            <div className='flex flex-col mb-4'>
                                <p>{userData.userName}</p>
                            </div>
                            <div className='flex flex-col mb-4'>
                                <p>{userData.userEmail}</p>
                            </div>
                            <div className='flex flex-col mb-4'>
                                <p>{userData.id}</p>
                            </div>
                            <button
                                type='button'
                                onClick={handleModel}
                                className='w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800'
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <p>No user data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LogoutModel;
