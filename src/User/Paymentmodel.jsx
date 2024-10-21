import React, {useContext, useEffect, useRef} from 'react';
import { X } from 'lucide-react';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { ShopContext } from '../components/Cartcontext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Paymentmodel({setPayModel}) {

  const navigate = useNavigate()

const {cart,clearCart} = useContext(ShopContext)

let total = cart.reduce((acc, item)=>{
  return acc + (item.price * item.quantity)
},0)

console.log(total)

    


 const id = localStorage.getItem("id")  
 console.log(id)
 
 const payModelUseRef =useRef()

 const handlePay = (e)=>{
    if(payModelUseRef.current === e.target){
        setPayModel(false)
    }
 }

    const validationSchema = Yup.object({
        name:Yup.string().required('Enter the Title'),
        number:Yup.string().required('Enter the Description'),
        email:Yup.string().required('Enter the Price'),
        address:Yup.string().required('Enter the category'),
        pincode:Yup.string().required('Enter the quantity '),
        state:Yup.string().required('Enter the image URL'),
    })

    const initialValues = {
      name:'',
      number:'',
      email:'',
      address:'',
      pincode:'',
      state:'',
      price:total,
      account:'',
      
  }

  const onSubmit = async (values)=>{
    try{
      const orderPayLoad = [...values]
      await axios.patch(`http://localhost:8000/users/${id}`,{'order':orderPayLoad})
      setPayModel(false)
      clearCart()
      localStorage.removeItem('cart')
      navigate("/shop")
      toast.success('payment Success')
      console.log("order added to cart order")


    }
    catch{
      console.error("there is error from the paymodel ")
    }
    
  }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit 
    })


  return (
    <div>
      <div ref={payModelUseRef} onClick={handlePay} className='fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm flex justify-center items-center'>
        <div className='relative w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg'>
          <button  className='absolute top-2 right-2'>
            <X onClick={()=>setPayModel(false)} />
          </button>
          <div className='px-4 py-4'>
            <h1 className='text-lg font-bold mb-3 text-center'>Payment Details</h1>
            <form onSubmit={formik.handleSubmit}  className='flex flex-col gap-3'>
              <div>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Name'
                  className='w-full px-2 py-1 text-black border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                

              </div>

              <div>
                <input
                  type='text'
                  id='number'
                  name='number'
                  value={formik.values.number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Number'
                  
                  className='w-full px-2 py-1 text-black border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

              </div>

              <div>
                <input
                  type='text'
                  id='email'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Email'
                  className='w-full px-2 py-1 text-black border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                {formik.touched.price && formik.errors.price ? <div className='text-md text-red-800 text-sm'>{formik.errors.price}</div> : null}
              </div>

              <div>
                <input
                  type='text'
                  id='address'
                  name='address'
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='address'
                  className='w-full px-2 py-1 text-black border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <input
                  type='text'
                  id='pincode'
                  name='pincode'
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='pincode'
                  className='w-full px-2 py-1 text-black border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <input
                  type='text'
                  id='state'
                  name='state'
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='state'
                  className='w-full px-2 py-1 text-black border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <input
                  type='text'
                  id='account'
                  name='account'
                  value={formik.values.account}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='AAC Number'
                  className='w-full px-2 py-1 text-black border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <input
                  type='text'
                  id='price'
                  name='price'
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='price'
                  readOnly
                  className='w-full px-2 py-1 text-black border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <button
                type='submit'
                className='mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 font-medium bg-green-600 rounded-md text-white'
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paymentmodel;