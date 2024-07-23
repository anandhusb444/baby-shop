import React, { useContext, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { ShopContext } from '../components/Cartcontext';
import toast from 'react-hot-toast';

function LogoutModel({ onClose,setmodal,setIsUser }) {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const id = localStorage.getItem("id");

    const {setCart} = useContext(ShopContext)

    const handleModel = ()=>{
        setIsUser(false)
        setmodal(false)
        setCart([])
        toast.error('user logedout')
        localStorage.removeItem('id')


    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/users/${id}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start z-20'>
            <div className='relative w-80 max-w-xs bg-gray-50 shadow-lg rounded-lg'>
                <button className='absolute top-2 right-2 p-2' onClick={setmodal}>
                    <X size={24} />
                </button>
                <div className='p-2'>
                    <h1 className='text-lg font-bold mb-4'>User Details</h1>
                    {userData ? (
                        <div>
                            <div className='flex flex-col mb-4'>
                                <p >{userData.name}</p>
                            </div>
                            <div className='flex flex-col mb-4'>
                                <p >{userData.email}</p>
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
