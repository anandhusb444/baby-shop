import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'



function AdminHomePage() {
    const [userLength, setUserLength] = useState([])
    const [productLength, setProuctLength] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await axios.get("http://localhost:8000/products")
            setUserLength(response.data)
        }


        const fetchProduct = async ()=>{
                const respones = await axios.get("http://localhost:8000/products")
                setProuctLength(respones.data)  
            }
        
        fetchData()
        fetchProduct()
    },[])
 
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow mb-4">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-6 gap-4">
            <div className="p-4 rounded overflow-hidden shadow-lg hover:scale-105 transition-transform duration-150 bg-white border-4 border-indigo-200 text-center">
              <div onClick={()=>navigate('/admin/userlist')} className="bg-indigo-500 text-white p-4 rounded mb-4">
               <h2 className="text-xl font-bold">Users-{userLength.length}</h2>
              </div>
            </div>
                <div className="p-4 rounded overflow-hidden shadow-lg hover:scale-105 transition-transform duration-150 bg-white border-4 border-indigo-200 text-center">
                    <div onClick={()=>navigate('/admin/products')} className="bg-green-500 text-white p-4 rounded mb-4">
                        <h2 className="text-xl font-bold">Products- {productLength.length}</h2>
                    </div>
                </div>
          </div>
        </div>
      </main>

      <div className='p-4'>
        <div className=''>
          <img
            className='w-full h-96 object-cover shadow-lg rounded-lg'
            src='https://media.flytographer.com/uploads/2022/09/Photo-ideas-babies-photographer-flytographer-13.jpeg'
            alt='Baby'
          />
        </div>
      </div>

      <div className='p-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <img
              className='w-full h-60 object-cover shadow-lg rounded-lg'
              src='https://media.flytographer.com/uploads/2022/09/photo-69_original.jpeg'
              alt='Family'
            />
          </div>
          <div>
            <img
              className='w-full h-60 object-cover shadow-lg rounded-lg'
              src='https://media.flytographer.com/uploads/2022/09/photo-14_original.jpeg'
              alt='Family'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
