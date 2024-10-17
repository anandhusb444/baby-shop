import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const initialValues = {
    userName: '',
    userEmail: '',
    password: '',
    confirmpassword: ''
}

const validationSchema = Yup.object({
    userName: Yup.string().required('Please enter your name'),
    userEmail: Yup.string().email('Invalid email format').required('Please enter an email'),
    password: Yup.string().min(8, 'Password must be 8 letters')
        .matches(/^[A-Z]/, 'Password must start with a capital letter')
        .required('Required'),
        password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
})

export default function Registration() {
    const [isRegister, setRegister] = useState(true)
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        try {
            console.log(values)
            const respones = await axios.post('https://localhost:7114/api/User/Register',values);
            console.log(respones.data)
            // const res = respones.data
            //console.log(res)
                if(res.message === "User already existed")
                {
                    toast.error("user alreay existed")
                }
                else
                {
                    setTimeout(()=> navigate('/Login'),1000)
                }
        } 
        catch(error) 
        { 
            if(error.response.data.message === "User already existed")
            {
                toast.error("User already existed")
            }
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit,   
        validationSchema
    })

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center p-4">
                <div className="sm:mx-auto sm:w-full sm:max-w-xs">
                    <h2 className="mt-4 text-center text-xl font-bold leading-8 tracking-tight text-gray-900">
                        Register
                    </h2>
                </div>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-xs border-2 p-4 rounded-lg">
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    id="userName"
                                    name="userName"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="block w-full border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            {formik.touched.userName && formik.errors.userName ? <div className='text-xs text-red-500'>{formik.errors.userName}</div> : null}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="userEmail"
                                    name="userEmail"
                                    type="email"
                                    value={formik.values.userEmail}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="block w-full border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {formik.touched.userEmail && formik.errors.userEmail ? <div className='text-xs text-red-500'>{formik.errors.userEmail}</div> : null}
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="block w-full border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {formik.touched.password && formik.errors.password ? <div className='text-xs text-red-500'>{formik.errors.password}</div> : null}
                        </div>
                        <div>
                            <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="block w-full border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {formik.touched.password && formik.errors.password ? <div className='text-xs text-red-500'>{formik.errors.password}</div> : null}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center bg-indigo-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        </div>
                        <div>
                            <p className='text-xs text-gray-500'>Already have an account?</p>
                        </div>
                    </form>
                    <div>
                        <NavLink to={'/login'}>
                            <button type='button' className="flex w-full justify-center bg-indigo-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Login
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
