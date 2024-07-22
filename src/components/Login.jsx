import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ShopContext } from './Cartcontext';
import { useNavigate } from 'react-router-dom'



export default function Login() {
  
  const {setIsAdmin} = useContext(ShopContext)
  const initialValues = {
    email_login:'',
    password_login:''
}



const validationSchema = Yup.object({
  email_login:Yup.string().email('Invalid email ').required('Enter a valid email'),
  password_login:Yup.string().min(8,'password must be 8 letter').required('Enter your password'),
})
const navigate = useNavigate()
const onSubmit = async (values)=>{
  const data = await axios.get('http://localhost:8000/users')
  const fetchData =(data.data)
  const user = fetchData.find((item)=> item.email === values.email_login && item.password === values.password_login)
  //const admin = fetchData.find((item)=> item.email === values.email_login && item.password === values.password_login)
  console.log(user)
  if(user){
    if(user.role === 'admin'){
      navigate('/adminproducts')
      localStorage.setItem("id",user.id)
      setIsAdmin(true)//contex from the cartcontext to check the login 
    }
    else{
      navigate('/home')
      localStorage.setItem("id",user.id)
      
    }

  }
  else{
    alert('invalid user name')
  }
  
}

    const formik = useFormik({ 
        initialValues,
        onSubmit,
        validationSchema
    })
    //console.log(formik.values)
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={formik.handleSubmit} action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email_login"
                    name="email_login"
                    type="email"
                    value={formik.values.email_login}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    autoComplete="email"
                    className="block w-full  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {formik.touched.email_login && formik.errors.email_login ? <div className='text-sm text-red-700'>{formik.errors.email_login}</div> : null}

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                 
                </div>
                <div className="mt-2">
                  <input
                    id="password_login"
                    name="password_login"
                    type="password"
                    value={formik.values.password_login}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    autoComplete="current-password"
                    className="block w-full  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {formik.touched.password_login && formik.errors.password_login ? <div className='text-sm text-red-700'>{formik.errors.password_login}</div> : null}
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>          
          </div>
        </div>
      </>
    )
  }
  