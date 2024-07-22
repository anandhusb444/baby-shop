import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminUserListModel from '../Component/AdminUserListModel'

function AdminUserlist() {
    const [userData, setUserData] = useState([])
    const [isUserListModel ,setIsuserListModel] = useState(false)
    const [userId, setUserId] = useState([])


    useEffect(()=>{
        const userListData = async ()=>{
            const respones = await axios.get('http://localhost:8000/users')
            setUserData(respones.data)
            
        }
        userListData()
    },[])
    console.log(userData)

    const handleViewCart = (id)=>{
        setIsuserListModel(true)
        setUserId(id)
    }

    const handleRemove = async (id)=>{
        await axios.delete(`http://localhost:8000/users/${id}`)
        setUserData(userData.filter((item)=>item.id !== id))

    }
  return (
    <div>
        <div className='flex justify-center mt-11'>
            <table className='border-collapse border'>
              <thead>
                <tr>
                    <th className='border-4 border-indigo-400 px-4 py-3'>id</th>
                    <th className='border-4 border-indigo-400 px-4 py-3'>name</th>
                    <th className='border-4 border-indigo-400 px-4 py-3'>email</th>
                    <th className='border-4 border-indigo-400 px-4 py-3'>Order</th>
                    <th className='border-4 border-indigo-400 px-4 py-3'>Cart</th>
                    <th className='border-4 border-indigo-400 px-4 py-3'>Remove user</th>
                </tr>
              </thead>
                
              <tbody>
                {
                    userData.map((item)=> 
                        <tr key={item.id}>
                            <td className='border-4 border-indigo-400 border-opacity-4 px-4 py-3'>{item.id}</td>
                            <td className='border-4 border-indigo-400 border-opacity-1 px-4 py-3'>{item.name}</td>
                            <td className='border-4 border-indigo-400 border-opacity-1 px-4 py-3'>{item.email}</td>
                            <td className='border-4 border-indigo-400 border-opacity-1 px-4 py-3'><button onClick={()=>handleViewCart(item.id)} className='bg-slate-300 rounded-sm p-2 text-sm hover:scale-110 transition-transform duration-75 hover:rotate-6 hover:bg-gray-400 hover:text-white'>view cart</button></td>
                            <td className='border-4 border-indigo-400 border-opacity-2 px-4 py-3'><button className='bg-slate-300 rounded-sm p-2 text-sm hover:scale-110 transition-transform duration-75 hover:rotate-6 hover:bg-gray-400 hover:text-white'>view order</button></td>
                            <td className='border-4 border-indigo-400 border-opacity-4 px-4 py-3'><button onClick={()=>handleRemove(item.id)} className='bg-red-500 px-4 rounded-sm p-2 text-sm text-white hover:scale-110 transition-transform duration-75 hover:rotate-6 hover:bg-red-800 hover:text-white'>remove</button></td>
                        </tr>
                        )

                }
                

              </tbody>
               

            </table>
            {isUserListModel && <AdminUserListModel onClose={()=>setIsuserListModel(false)} userId={userId}/>}
        </div>
    </div>
  )
}

export default AdminUserlist
