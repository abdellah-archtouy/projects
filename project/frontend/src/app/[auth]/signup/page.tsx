"use client";
import React from 'react'
import Input from '../Input'
import { useState } from 'react'
import axios from "axios";

function Signup() {
    const [fieldstate, setFieldState] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: ""
    })
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
        // const { firstname, lastname, username, email, password } = fieldstate;
        // const data = {
        //     firstname,
        //     lastname,
        //     username,
        //     email,
        //     password
        // }
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
                <div className='w-[95%] flex items-center justify-center gap-4'>
                    {lowerFields.map((field, index) => (
                        <Input key={index} type={field.type} placeholder={field.placeholder} setFieldState={setFieldState}></Input>
                    ))}
                </div>
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

export default Signup