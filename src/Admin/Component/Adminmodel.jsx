import React, { useState, useRef, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { X } from 'lucide-react';
import axios from 'axios';

function Adminmodel({onClose, productId}) {
    
    const modelRef = useRef()

    const isModelClose = (e)=>{
       if(modelRef.current === e.target){
        onClose()
       }  
    }

    
    const validationSchema = Yup.object({
        title:Yup.string().required('Enter the Product title'),
        description:Yup.string().required('Enter the Product Description'),
        category:Yup.string().required('Enter the product category '),
        quantity:Yup.string().required('Enter the product quantity'),
        image:Yup.string().required('Enter the product image')
    })

    const onSubmit = async (values)=>{
        const respones = await axios.put(`http://localhost:8000/products/${productId}`,values)
        //console.log(respones.data)
        onClose()
    }

    const initialValues = ({
        title:'',
        description:'',
        category:'',
        quantity:'',
        image:''

    })

    const formik = useFormik({
        initialValues,
        validationSchema, 
        onSubmit
    })
  

  return (
    <div ref={modelRef} onClick={isModelClose} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className='mt-10 flex flex-col gab-5 text-white'>
            <button onClick={onClose} className='place-self-end'><X/></button>
            <div className='bg-gray-300 rounded-md px-16 py-7 flex flex-col gap-5 items-center mx-4'>
                <form onSubmit={formik.handleSubmit}   className='flex flex-col gap-2'>
                    <input
                    type='text'
                    id='title'
                    name='title'
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='Enter your Title'
                    required
                    className='w-60 h-9 px-3 py-3 text-black text-sm font-medium border-gray-300 rounded-sm'
                    />
                    {formik.touched.title && formik.errors.title ? <div className='text-md text-red-800'>{formik.errors.title}</div> : null}

                    <input
                    type='text'
                    id='description'
                    name='description'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='Enter the Description'
                    required
                    className='w-60 h-9 px-3 py-3 text-black text-sm font-medium  border-gray-600 rounded-sm'
                    />
                    {formik.touched.description && formik.errors.description ? <div className='text-md text-rose-800'>{formik.errors.description}</div> : null}

                    <input
                    type='text'
                    id='category'
                    name='category'
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='Enter the Category'
                    className='w-60 h-9 px-3 py-3 text-black text-sm font-medium border-gray-300 rounded-sm'
                    />
                    {formik.touched.category && formik.errors.category ? <div className='text-md text-red-800'>{formik.errors.category}</div> : null}

                   <input
                    type='text'
                    id='quantity'
                    name='quantity'
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='Enter the Quantity'
                    className='w-60 h-9 px-3 py-3 text-black text-sm font-medium border-gray-300 rounded-sm'
                    />
                    {formik.touched.quantity && formik.errors.quantity ? <div className='text-red-800 text-md'>{formik.errors.quantity}</div> : null}

                    <input
                    type='text'
                    id='image'
                    name='image'
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='Enter the Image'
                    className='w-60 h-9 px-3 py-3 text-black text-sm font-medium border-gray-300 rounded-sm'
                    />
                    {formik.touched.image && formik.errors.image ? <div className='text-red-800 text-md'>{formik.errors.image}</div> : null}

                    <button type='submit' className='mt-4 w-full h-11 flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-sm bg-blueberry-900' >
                        Update products
                    </button>
                    
                </form>

                
            </div>

        </div>
      
    </div>
  )
}

export default Adminmodel
