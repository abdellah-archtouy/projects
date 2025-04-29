"use client";
import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handelRefreshToken } from "@/lib/utils";
import Image from 'next/image';
import { map } from 'motion/react-client';
import Input from '@/app/[auth]/Input';

function Setting() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [fieldstate , setFieldState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    password: ""
  });
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:14100/api/auth/verify", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUser(response.data);
      // router.push("/dashboard");
    } catch (error : any) {
      if (error.status === 401) {
        handelRefreshToken(fetchUsers());
      }
      else
        router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);
  const upperFields = [
    {
      "type": "text",
      "placeholder": "First Name"
    },
    {
      "type": "text",
      "placeholder": "Last Name"
    }
  ]
  const lowerFields = [
    {
      "type": "text",
      "placeholder": "Username"
    },
    {
      "type": "email",
      "placeholder": "Email"
    },
  ]
  const passwordFields = [
    {
      "type": "password",
      "placeholder": "Old Password"
    },
    {
      "type": "password",
      "placeholder": "New Password"
    },
    {
      "type": "password",
      "placeholder": "Confirm Password"
    }
  ]
  const Fields = [
    {
      "type": "text",
      "placeholder": "Bio"
    }
  ]

  return (
    <div className=' w-full h-full flex-col gap-5 flex items-center  justify-center'>
           <h1 className='text-3xl font-bold text-white'>Settings</h1>
        <div className='lg:w-5/7 lg:h-3/4 md:w-7/10 md:h-8/10 flex flex-col p-5 pt-10 items-center gap-8 justify-around h-8/10 w-9/10 bg-gray-700/65 rounded-lg shadow-3xl'>
           <div className='flex  relative items-center justify-center  md:mb-12 w-9/10 lg:h-1/4 rounded-xl shadow-2xl'>
            <Image src={"/banner.jpg"} width={100} height={100} className='w-full h-full border shadow-sm rounded-xl hover:opacity-70' alt='user banner'></Image>
            <Image src="/avatar.png" width={100} height={100} className=' h-full w-auto shadow-sm  rounded-full hover:opacity-70 absolute  sm:right-5 right-2 sm:top-1/2 z-10' alt='user avatar'></Image>
          </div>
          <form action="submit" className='flex-1 w-9/10 gap-4  flex flex-col'>
            <div className='flex  items-start flex-col md:flex-row justify-start w-full h-fit gap-5'> 
              {upperFields.map((field, index) => (
                <div key={index} className='w-full flex flex-col gap-3'>
                  <h1 className='text-white'>{field.placeholder}</h1>
                  <Input type={field.type} placeholder={field.placeholder} setFieldState={setFieldState} className=' bg-gray-500/30  rounded-lg shadow-2xl focus:outline-0 text-white' ></Input>
                </div>
              ))}
            </div>
            <div className=' flex-1 w-full flex  flex-col gap-3'>
              {Fields.map((field, index) => (
                <div key={index} className='w-full h-full flex flex-col gap-3'>
                  <h1 className='text-white'>{field.placeholder}</h1>
                  <textarea placeholder='Bio' value={fieldstate[field.placeholder]} onChange={(e) => setFieldState({...fieldstate, [field.placeholder]: e.target.value})}
                  className='w-full h-full p-3 resize-none bg-gray-500/30  rounded-lg shadow-2xl focus:outline-0 text-white px-4 ' >
                  </textarea>
                </div>
              ))}
            </div>
            <button className=' bg-blue-300/40 self-end h-10 rounded-lg w-38  shadow-2xl hover:opacity-70'>Save</button>
          </form>
        </div>
    </div>
  )
}

export default Setting

{/* <div className='  flex flex-col items-center gap-4 justify-center p-10 py-10  w-[1500px] h-[700px] bg-gray-700/65 rounded-lg shadow-2xl'>
          <h1 className='text-3xl font-bold text-white'>Settings</h1>
          <div className='flex flex-col gap-5 items-center justify-start w-full h-full '>
            <div className='flex  relative items-center justify-center   w-full h-1/4 rounded-xl shadow-2xl'>
              <Image src="/avatar.png" width={100} height={100} className=' h-full w-auto shadow-sm  rounded-full hover:opacity-70 absolute left-5 top-1/2 z-10' alt='user avatar'></Image>
              <Image src={"/banner.jpg"} width={100} height={100} className='w-full h-full border shadow-sm rounded-xl hover:opacity-70' alt='user banner'></Image>
            </div>
            <form className=' w-full flex flex-col justify-center items-center gap-5'>
              <div className='flex-1 w-full'>
                <div className='flex  items-start justify-start w-full h-fit gap-5'> 
                  {upperFields.map((field, index) => (
                    <div key={index} className='w-full flex flex-col gap-3'>
                      <h1 className='text-white'>{field.placeholder}</h1>
                      <Input type={field.type} placeholder={field.placeholder} setFieldState={setFieldState} className=' bg-gray-500/30  rounded-lg shadow-2xl focus:outline-0 text-white' ></Input>
                    </div>
                  ))}
                </div>
                <div className='w-full  h-full flex  flex-col gap-3'>
                  {Fields.map((field, index) => (
                    <div key={index} className='w-full h-full flex flex-col gap-3'>
                      <h1 className='text-white'>{field.placeholder}</h1>
                      <textarea placeholder='Bio' value={fieldstate[field.placeholder]} onChange={(e) => setFieldState({...fieldstate, [field.placeholder]: e.target.value})}
                      className='w-full h-full p-2 resize-none bg-gray-500/30  rounded-lg shadow-2xl focus:outline-0 text-white px-4 ' >
                      </textarea>
                    </div>
                  ))}
                </div>
              </div>
              <button className=' self-end h-10 rounded-lg w-38 border'>Save</button>
            </form>
          </div>
      </div> */}