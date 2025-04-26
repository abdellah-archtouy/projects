"use client";
import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handelRefreshToken } from "@/lib/utils";
import Image from 'next/image';

function Setting() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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
  return (
    <div className=' w-full h-full flex items-center justify-center'>
        <div className='  flex flex-col items-center gap-12 justify-start p-10 w-5/7 h-3/4 bg-gray-700/65 rounded-lg shadow-2xl'>
          <h1 className='text-3xl font-bold text-white'>Settings</h1>
          <div className='flex flex-col items-center justify-start w-full h-full '>
            <div className='flex  relative items-center justify-center w-full h-1/3 rounded-xl shadow-2xl'>
              <Image src="/avatar.png" width={100} height={100} className=' h-full w-auto shadow-sm  rounded-full hover:opacity-70 absolute left-5 top-1/2 z-10' alt='user avatar'></Image>
              <Image src={"/banner.jpg"} width={100} height={100} className='w-full h-full border shadow-sm rounded-xl hover:opacity-70' alt='user banner'></Image>
            </div>

          </div>
      </div>
        
    </div>
  )
}

export default Setting