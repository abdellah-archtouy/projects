"use client";
import React from 'react'
import Input from '../Input'
import { useState } from 'react'
import axios from "axios";
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";


function Login() {
    const [fieldstate, setFieldState] = useState({
        email: "",
        password: ""
    })
    const router = useRouter();
    const upperFields = [
        {
            "type": "email",
            "placeholder": "Email"
        },
        {
            "type": "password",
            "placeholder": "Password"
        }
    ]
    const handelgoogleauth = async (e : any) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                "http://localhost:14100/api/auth/google",
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        // "Access-Control-Allow-Origin": "*",
                    },
                }, 
            );
            console.log('Success:', response);
            router.push("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error:', error.response?.data?.message || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }
    const handelsubmit = async (e : any) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:14100/api/auth/login",
                fieldstate,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        // "Access-Control-Allow-Origin": "*",
                    },
                    // withCredentials: true
                }, 
            );
            console.log('Success:', response);
            router.push("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error:', error.response?.data?.message || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }
  return (
    <div className='flex items-center justify-center w-full h-screen bg-gray-800'>
        <div className='flex flex-col sm:w-[80%] md:w-[70%] lg:max-w-2xl w-[90%] h-fit gap-5  items-start justify-center p-10 bg-gray-500/30 rounded-lg shadow-2xl'>
            <h1 className='text-[32px] font-bold'>
                Welcome Back
            </h1>
            <div>
                New Here?
                <button className=' ml-1 text-blue-500' onClick={() =>{
                    router.push("/auth/signup");
                }
                }>
                    Sign-up
                </button>
            </div>
            <div className='w-full flex items-center justify-center'>
                <button onClick={handelgoogleauth} className='h-10 flex items-center justify-center gap-3 rounded-xl w-full text-black bg-amber-50'>
                <FcGoogle className='w-6 h-full'></FcGoogle>
                    Continue with Google</button>
            </div>
            <div className=" flex items-center w-full">
                <div className="flex-1 border border-[#ccc] "></div>
                <span className="px-2.5">OR</span>
                <div className="flex-1 border border-[#ccc] "></div>
            </div>
            <form action="submit" onSubmit={handelsubmit} className='w-[100%] flex gap-4 items-center flex-col justify-center '>
                <div className='flex flex-col items-center w-[100%] justify-center gap-4'>
                    {upperFields.map((field, index) => (
                        <div key={index} className='w-full flex flex-col gap-3'>
                        <h1>{field.placeholder}</h1>
                        <Input key={index} type={field.type} placeholder={field.placeholder} setFieldState={setFieldState} className=' bg-white text-black'></Input>
                        </div>
                    ))}
                </div>
                <button onClick={handelsubmit} className=' w-[100%] mt-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:shadow-2xl transition duration-200 ease-in-out'>
                    Sign-In</button>
            </form>
        </div>
    </div>
  )
}

export default Login