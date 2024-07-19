import React, { useState } from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { NavLink, useNavigate, Link} from 'react-router-dom'


const initialValues = {
    name : '',
    email : '',
    password : '',
    confirmpassword : ''
}



const validationSchema = Yup.object({
    name: Yup.string().required('please Enter your name'),
    email : Yup.string().email('invalid email format').required('please Enter a Email'),
    password : Yup.string().min(8, 'password must be 8 letter')
     .matches(/^[A-Z]/, 'Password must start with a capital letter')
     .required('Required'),
    confirmpassword: Yup.string()
     .oneOf([Yup.ref('password'),null], 'passwords must match')
     .required('Required')
})

export default function Registration() {

  const [isRegister, setRegister] = useState(true)
  const navigate = useNavigate()

   const onSubmit = async (values)=> {
    try{
      const userGetData = await axios.get('http://localhost:8000/users')
      const existingData = userGetData.data
      const user = existingData.find((item) => item.email === values.email && item.password === values.password)

      console.log(user)

      if(user){
        alert('this user is already existed')
      }
      else{
      // console.log('this is already Existed')
      const postUserData =  axios.post('http://localhost:8000/users',values)
      //console.log('Respones',postUserData)
      setTimeout(()=> navigate('/Login'),1000) 
      }
      

    }
    catch{
      console.log('there is an error on posting the data ')
    }
  }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema

    })
    //console.log('value of the data',formik.values )
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={formik.handleSubmit} action="#" method="POST" className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div className="mt-2">
                        <input 
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="block w-full  border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    {formik.touched.name && formik.errors.name ? <div className='text-sm text-red-500' >{formik.errors.name}</div> : null}
                </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full  border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {formik.touched.email && formik.errors.email ? <div className='text-sm text-red-500' >{formik.errors.email}</div> : null}
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full  border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {formik.touched.password && formik.errors.password ? <div className='text-sm text-red-500' >{formik.errors.password}</div> : null }
              </div>
              <div>
                <label htmlFor="Confirmpassword"  className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm password
                </label>

                <div className="mt-2">
                    <input 
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    value={formik.values.confirmpassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full  border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                {formik.touched.confirmpassword && formik.errors.confirmpassword ? <div className='text-sm text-red-500' >{formik.errors.confirmpassword}</div> : null} 
              </div>
  
              <div>
        
                <button
                  type="submit"
                  className="flex w-full justify-center  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register 
                </button>
          
                
              </div>
              <div>
                <p className='text-sm text-gray-500'>Already have a account</p>
              </div>
            </form>
            <div>
              <NavLink to={'/login'}>
              <button type='submit' className="flex w-full justify-center  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Login
                </button>

              </NavLink>
              
              
                
              </div>
          </div>
        </div>
      </>
    )
  }
  