"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import {  useEffect } from "react";
import { ParallaxScroll } from "../../../components/ui/parallax-scroll";


function Dashboard() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:14100/api/users", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUser(response.data);
    } catch (error) {
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  

  return (
      <ParallaxScroll users={user}></ParallaxScroll>
  )
}

export default Dashboard