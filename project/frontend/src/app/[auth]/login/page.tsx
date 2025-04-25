"use client";
import React from 'react'
import Input from '../Input'
import { useState } from 'react'
import axios from "axios";
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

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
        <div className='flex flex-col w-3xl h-fit gap-5  items-center justify-center py-10 bg-gray-500/30 rounded-lg shadow-2xl'>
            <h1>
                Sign-Up
            </h1>
            <form action="submit" onSubmit={handelsubmit} className='w-[90%] flex gap-4 items-center flex-col justify-center '>
                <div className='flex flex-col items-center w-[95%] justify-center gap-4'>
                    {upperFields.map((field, index) => (
                        <Input key={index} type={field.type} placeholder={field.placeholder} setFieldState={setFieldState}></Input>
                    ))}
                </div>
                <button onClick={handelsubmit} className=' w-[95%] mt-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:shadow-2xl transition duration-200 ease-in-out'>
                    Sign-in</button>
            </form>
        </div>
    </div>
  )
}

export default Login