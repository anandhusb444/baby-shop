import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminUserListModel from '../Component/AdminUserListModel';
import { UserRound } from 'lucide-react';
import { Lock } from 'lucide-react';
import { LockOpen } from 'lucide-react';
import Adminordermodel from '../Component/Adminordermodel';

function AdminUserlist() {
    const [userData, setUserData] = useState([]);
    const [isUserListModel, setIsuserListModel] = useState(false);
    const [orderModel, setOrderModel] = useState(false);
    const [order, setOrder] = useState(null);
    const [userId, setUserId] = useState(null);
    const [blockStatus,setBlockStatus] = useState([])
    const [unBlock, setUnBlock] = useState([])


    useEffect(() => {
        const userListData = async () => {
            const response = await axios.get('https://localhost:7114/api/User', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setUserData(response.data.data);
        };
        userListData();
    }, []);

    // const handleViewCart = (id) => {
    //     setIsuserListModel(true);
    //     setUserId(id);
    // };

    const handleViewOrder = async (id) => {
        setOrderModel(true);
        setOrder(id);
    };

    const handleRemove = async (id) => {
        console.log(`This is the id ${id}`);
        const res = await axios.delete(`https://localhost:7114/api/User/DeleteUser?Id=${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        console.log(res.data);
        setUserData(userData.filter((item) => item.id !== id));
    };

    const handleBlock = async (id)=>{
        console.log(id)
        const res = await axios.put(`https://localhost:7114/api/User/block${id}`,undefined,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
       
        setBlockStatus((prve)=>({
            ...prve,
            [id]:res.data.data
        }))

    }

    const handleUnBlock = async(id)=>{
        const res = await axios.put(`https://localhost:7114/api/User/Unblock ${id}`,undefined,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        let isBlock = res.data.data
        console.log(isBlock)
        setUnBlock((prev)=>({
            ...prev,
            [id]:res.data.data
        }))
    }

    return (
        <div>
            <div className='flex justify-center mt-5'>
                <div className="overflow-x-auto w-full">
                    <table className='min-w-full bg-white border border-gray-200 rounded-lg shadow-lg'>
                        <thead className='bg-indigo-600 text-white'>
                            <tr>
                                <th className='border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold'>ID</th>
                                <th className='border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold'>Name</th>
                                <th className='border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold'>Email</th>
                                <th className='border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold'>Order</th>
                                <th className='border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold'>Block</th>
                                <th className='border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold'>UnBlock</th>
                                <th className='border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold'>Remove User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((item) => (
                                <tr key={item.id} className='hover:bg-gray-100 transition duration-200'>
                                    <td className='border-b border-gray-200 px-4 py-1 pt-1 text-sm'>
                                        <UserRound />
                                    </td>
                                    <td className='border-b border-gray-200 px-4 py-3 text-sm'>{item.userName}</td>
                                    <td className='border-b border-gray-200 px-4 py-3 text-sm'>{item.userEmail}</td>
                                    {/* <td className='border-b border-gray-200 px-4 py-3 text-sm'>
                                        <button onClick={() => handleViewCart(item.id)} className='bg-blue-500 text-white rounded px-3 py-1 hover:scale-110 transition-transform duration-75 hover:bg-blue-600'>View Cart</button>
                                    </td> */}
                                    <td className='border-b border-gray-200 px-4 py-3 text-sm'>
                                        <button onClick={() => handleViewOrder(item.id)} className='bg-green-500 text-white rounded px-3 py-1 hover:scale-110 transition-transform duration-75 hover:bg-green-600'>View Order</button>
                                    </td>
                                    <td className='border-b border-gray-200 px-4 py-3 text-sm'>
                                        <button onClick={() => handleBlock(item.id)} className='bg-yellow-500 text-white rounded px-3 py-1 hover:scale-110 transition-transform duration-75 hover:bg-yellow-700'>{blockStatus[item.id] ? <Lock/> : "Block"}</button>
                                    </td>
                                    <td className='border-b border-gray-200 px-4 py-3 text-sm'>
                                        <button onClick={() => handleUnBlock(item.id)} className='bg-yellow-500 text-white rounded px-3 py-1 hover:scale-110 transition-transform duration-75 hover:bg-yellow-700'>{unBlock[item.id]  ? <LockOpen/> : "unblock"}</button>
                                    </td>
                                    <td className='border-b border-gray-200 px-4 py-3 text-sm'>
                                        <button onClick={() => handleRemove(item.id)} className='bg-red-500 text-white rounded px-3 py-1 hover:scale-110 transition-transform duration-75 hover:bg-red-900'>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {orderModel && <Adminordermodel onClose={() => setOrderModel(false)} order={order} />}
                    {isUserListModel && <AdminUserListModel onClose={() => setIsuserListModel(false)} userId={userId} />}
                </div>
            </div>
        </div>
    );
}

export default AdminUserlist;
