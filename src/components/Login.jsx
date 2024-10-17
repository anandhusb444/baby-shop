import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ShopContext } from './Cartcontext';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import {jwtDecode} from "jwt-decode";


export default function Login() {
  const { setIsAdmin, setIsUser, setIsCart } = useContext(ShopContext)
  const initialValues = {
    email_login: '',
    password_login: ''
  }

  const validationSchema = Yup.object({
    email_login: Yup.string().email('Invalid email ').required('Enter a valid email'),
    password_login: Yup.string().min(8, 'Password must be 8 letters').required('Enter your password'),
  })

  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const data = await axios.post('https://localhost:7114/api/User/Login',{
      email : values.email_login,
      password : values.password_login
    })
    .then((res)=>{
      console.log(res.data.statusCode)
       
        if(res.data.statusCode >=200 && res.data.statusCode <= 300)
        {
          console.log(res)
          console.log(res.data)
         const token = res.data.data
         const decodeToken = jwtDecode(token)
         
         const role = decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
         const Id = decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
         //console.log(decodeToken)
         console.log("Decoded Role :",role)
         console.log(Id)

          if(role === "Admin")
            {
              navigate("/admin/home")
              localStorage.setItem("id",Id)
              localStorage.setItem("token",token)
              console.log(token)
              setIsAdmin(true)
              toast.success('Welcome admin')
            }
          else
            {
                navigate('/')
                localStorage.setItem("id", Id)
                setIsUser(true)
                setIsCart(true)
                toast.success('Success')
            }
        }
    })
    .catch((error)=>{
      if(error.response && error.response.status === 400){
        toast.error("Invalid User")
      }
    })
    
   }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })

  return (
    <>
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-xs">
          <h2 className="mt-4 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <div className="mt-6 border-2 p-4 rounded-lg shadow-md">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email_login"
                    name="email_login"
                    type="email"
                    value={formik.values.email_login}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    autoComplete="email"
                    className="block w-full border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {formik.touched.email_login && formik.errors.email_login ? <div className='text-xs text-red-700'>{formik.errors.email_login}</div> : null}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password_login"
                    name="password_login"
                    type="password"
                    value={formik.values.password_login}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    autoComplete="current-password"
                    className="block w-full border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {formik.touched.password_login && formik.errors.password_login ? <div className='text-xs text-red-700'>{formik.errors.password_login}</div> : null}
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center bg-indigo-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
