import React from 'react'
import { X } from 'lucide-react';

function AdminUserListModel() {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className='mt-10 flex flex-col gab-5 text-white'>
        <button className='place-self-end'><X/></button>
        <div className='bg-white rounded-sm px-16 py-7 flex flex-col gap-5 items-center mx-4'>
            

        </div>
      </div>
    </div>
  )
}

export default AdminUserListModel
