"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from 'next/navigation';



export default function Home() {
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
      router.push("/dashboard");
    } catch (error) {
      // console.error("Error fetching users:", error);
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      hello
      {/* {user.map((user, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center w-full h-20 bg-gray-500/30 rounded-lg shadow-2xl"
        >
          <h1 className="text-2xl font-bold text-white">{user.username}</h1>
          <p className="text-sm text-gray-300">{user.email}</p>
        </div>
      ))} */}
    </div>
  );
}
