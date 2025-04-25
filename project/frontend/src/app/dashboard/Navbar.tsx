"use client";
import React, { useState } from "react";
import { IoLogOut } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

function Navbar() {
    const router = useRouter();
    const  handellogout = async (e :any) => {
        e.preventDefault();

        try{
            const response = await axios.get("http://localhost:14100/api/auth/logout", {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            router.push("/auth/login");
            console.log(response.data);
        }
        catch (error : any) {
            if (error.status === 401) {
                router.push("/auth/login");
            }
        }
    };
  return (
    <div className='flex items-center justify-center px-6 w-[95%] h-20 bg-gray-500/30 rounded-3xl shadow-2xl'>
        <div className='flex items-center justify-between w-1/2 h-full gap-4'>
            <Link href="/dashboard" className='text-3xl font-bold text-white'>Dashboard</Link>
        </div>
        <div className='flex items-center justify-end w-1/2 h-full gap-4'>
            <Link href="/dashboard/profile" className='flex items-center justify-center gap-2 '>
                <div className='w-[50px] h-[50px] bg-amber-800 rounded-full'></div>
                {/* <Image src="" width={50} height={50} alt='avatar' className='w-[50px] h-[50px] bg-amber-800 rounded-full'></Image> */}
                <h1 className='text-xl font-bold text-white'>Profile</h1>
            </Link>
            <Link href="/dashboard/settings" className='flex items-center justify-center gap-2'>
                <IoSettings size={30} color="white" />
            </Link>
            <button onClick={handellogout} className='flex items-center justify-center gap-2'>
                <IoLogOut size={30} color="white" />
            </button>
        </div>

    </div>
  )
}

export default Navbar
