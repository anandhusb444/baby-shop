import React, {useRef} from 'react';
import { X } from 'lucide-react';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';

function Adminaddproduct({onClose}) {


  const adminUseRef = useRef()

  const isProductModelClose = (e)=>{
    if(adminUseRef.current === e.target ){
      onClose()
    }
  }

    
    const initialValues = {
        title:'',
        description:'',
        category:'',
        quantity:'',
        image:''
    }

    const validationSchema = Yup.object({
        title:Yup.string().required('Enter the Title'),
        description:Yup.string().required('Enter the Description'),
        price:Yup.string().required('Enter the Price'),
        category:Yup.string().required('Enter the category'),
        quantity:Yup.string().required('Enter the quantity '),
        image:Yup.string().required('Enter the image URL')

    })

    const onSubmit = async (values)=>{
        axios.post(`http://localhost:8000/products/`,values)
         onClose()
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit 
    })


  return (
    <div>
      <div ref={adminUseRef} onClick={isProductModelClose} className='fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm flex justify-center items-center'>
        <div className='relative w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg'>
          <button onClick={onClose} className='absolute top-2 right-2'>
            <X />
          </button>
          <div className='px-4 py-4'>
            <h1 className='text-lg font-bold mb-3 text-center'>Enter the product details</h1>
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-3'>
              <div>
                <input
                  type='text'
                  id='title'
                  name='title'
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Product name'
                  className='w-full px-2 py-1 text-black border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                {formik.touched.title && formik.errors.title ? <div className='text-md text-red-800 text-sm'>{formik.errors.title}</div> : null}

              </div>

              <div>
                <input
                  type='text'
                  id='description'
                  name='description'
                  placeholder='Product description'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='w-full px-2 py-1 text-black border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                {formik.touched.description && formik.errors.description ? <div className='text-md text-red-800 text-sm'>{formik.errors.title}</div> : null}
              </div>

              <div>
                <input
                  type='text'
                  id='price'
                  name='price'
                  placeholder='Product price'
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='w-full px-2 py-1 text-black border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                {formik.touched.price && formik.errors.price ? <div className='text-md text-red-800 text-sm'>{formik.errors.price}</div> : null}
              </div>

              <div>
                <input
                  type='text'
                  id='category'
                  name='category'
                  placeholder='Product category'
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='w-full px-2 py-1 text-black border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                {formik.touched.category && formik.errors.category ? <div className='text-md text-red-800 text-sm'>{formik.errors.category}</div> : null}
              </div>

              <div>
                <input
                  type='text'
                  id='quantity'
                  name='quantity'
                  placeholder='Product quantity'
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='w-full px-2 py-1 text-black border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                {formik.touched.quantity && formik.errors.quantity ? <div className='text-md text-red-800 text-sm'>{formik.errors.quantity}</div> : null }
              </div>

              <div>
                <input
                  type='text'
                  id='image'
                  name='image'
                  placeholder='Image URL'
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='w-full px-2 py-1 text-black border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                {formik.touched.image && formik.errors.image ? <div className='text-md text-red-800 text-sm'>{formik.errors.image}</div> : null }
              </div>

              <button
                type='submit'
                className='mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 font-medium bg-black rounded-md text-white'
              >
                Add product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminaddproduct;
