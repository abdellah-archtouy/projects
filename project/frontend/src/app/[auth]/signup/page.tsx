"use client";
import React from 'react'
import Input from '../Input'
import { useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";

function Signup() {
    const [fieldstate, setFieldState] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: ""
    })
    const router = useRouter();
    const lowerFields = [
        {
            "type": "text",
            "placeholder": "First Name"
        },
        {
            "type": "text",
            "placeholder": "Last Name"
        },
    ]
    const upperFields = [
        {
            "type": "text",
            "placeholder": "Username"
        },
        {
            "type": "email",
            "placeholder": "Email"
        },
        {
            "type": "password",
            "placeholder": "Password"
        }
    ]
    const handelsubmit = async (e : any) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:14100/api/auth/signup", 
                fieldstate,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Success:', response.data);
            router.push('/auth/login');
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
        <div className='flex flex-col sm:w-[80%] md:w-[70%] lg:max-w-2xl w-[90%] h-fit gap-4  items-start justify-center p-10 bg-gray-500/30 rounded-lg shadow-2xl'>
            <h1 className='text-[32px] font-bold'>
                Welcome
            </h1>
            <div>
            Already a member?
                <button key={0} className=' ml-1 text-blue-500' onClick={() =>{
                    router.push("/auth/login");
                }
                }>
                    Login
                </button>
            </div>
            <div className='w-full flex items-center justify-center'>
                <button onClick={()=>{}} className='h-10 flex items-center justify-center gap-3 rounded-xl w-full text-black bg-amber-50'>
                <FcGoogle className='w-6 h-full'></FcGoogle>
                    Continue with Google</button>
            </div>
            <div className=" flex items-center w-full">
                <div className="flex-1 border border-[#ccc] "></div>
                <span className="px-2.5">OR</span>
                <div className="flex-1 border border-[#ccc] "></div>
            </div>
            <form action="submit" onSubmit={handelsubmit} className='w-[100%] flex gap-3 items-center flex-col justify-center '>
                <div className='w-[100%] flex items-center justify-center gap-3'>
                    {lowerFields.map((field, index) => (
                        <div key={index} className='w-full flex flex-col gap-2'>
                        <h1>{field.placeholder}</h1>
                        <Input key={index} type={field.type} placeholder={field.placeholder} setFieldState={setFieldState}></Input>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col items-center w-[100%] justify-center gap-3'>
                    {upperFields.map((field, index) => (
                        <div key={index} className='w-full flex flex-col gap-2'>
                        <h1>{field.placeholder}</h1>
                        <Input key={index} type={field.type} placeholder={field.placeholder} setFieldState={setFieldState}></Input>
                        </div>
                    ))}
                </div>
                <button onClick={handelsubmit} className=' w-[100%] mt-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:shadow-2xl transition duration-200 ease-in-out'>
                    Sign-in</button>
            </form>
        </div>
    </div>
  )
}

export default Signup