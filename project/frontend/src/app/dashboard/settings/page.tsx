"use client";
import React from 'react'
import axios from 'axios';
import { useState , useRef} from 'react';
import { useRouter } from 'next/navigation';
import { handelRefreshToken } from "@/lib/utils";
import Image from 'next/image';
import { AiOutlineCloudUpload } from "react-icons/ai";
import InformtionForm from './InformtionForm';
import Passwordform from './Passwordform';

function Setting() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [ishovered, setIsHovered] = useState(false);
  const [formselected, setFormSelected] = useState("user");
  const [isbannerHovered, setIsBannerHovered] = useState(false);
  const fileInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [fieldstate , setFieldState] = useState({
    firstname: "",
    lastname: "",
    username: "",
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
    password: "",
    avatar: null,
    banner: null,
    bio: "",
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
  
  const handelavatarchange = (e :any)=>{
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFieldState({...fieldstate, avatar: selectedFile});
  }
  const handelbannerchange = (e :any)=>{
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFieldState({...fieldstate, banner: selectedFile});
  }
  const handleSubmit = async (e :any) => {
    e.preventDefault();
    const { avatar, banner, ...rest } = fieldstate;
    if (!avatar && !banner && !rest.firstname && !rest.lastname && !rest.username && !rest.oldPassword && !rest.newPassword && !rest.confirmPassword && !rest.password && !rest.bio) {
      alert("Please fill in at least one field");
      return;
    }
    try {
      const response = await axios.post("http://localhost:14100/api/settings", fieldstate, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Bearer": localStorage.getItem("token") || "",
        },
      });
      console.log(response);
      //clear fileds
      setFieldState({
        firstname: "",
        lastname: "",
        username: "",
        oldpassword: "",
        newpassword: "",
        confirmpassword: "",
        password: "",
        avatar: null,
        banner: null,
        bio: "",
      });
    } catch (error : any) {
      if (error.status === 401) {
        console.log("refresh token");
      }
      else
        router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=' w-full h-full flex-col gap-5 flex items-center  justify-center'>
           <h1 className='text-3xl font-bold text-white'>Settings</h1>
        <div className='lg:w-5/7 lg:h-3/4 md:w-7/10 md:h-8/10 flex flex-col p-5 pt-10 items-center gap-8 justify-around h-8/10 w-9/10 bg-gray-700/65 rounded-lg shadow-3xl'>
           <div className='flex  relative items-center justify-center  sm:mb-12 w-9/10 lg:h-1/4 rounded-xl shadow-2xl'>
            <div  onClick={() => bannerInputRef?.current?.click()} 
              onMouseEnter={() =>{
                setIsBannerHovered(true);
              }} 
              onMouseLeave={() =>{
                setIsBannerHovered(false);
              }} 
              className='w-full h-full  relative shadow-sm rounded-xl hover:opacity-70'>
              <Image src={"/banner.jpg"} width={100} height={100} className={`w-full h-full  shadow-sm rounded-xl ${ isbannerHovered ? "opacity-70" : ''} `} alt='user banner'></Image>
              <input 
              ref={bannerInputRef}
              onChange={handelbannerchange}
              className='hidden' 
              type="file" />
              <div className={`w-full h-full   top-0 absolute ${isbannerHovered ? 'flex' : 'hidden ' }  items-center justify-center `}>
                <AiOutlineCloudUpload className=' font-bold h-1/4 w-auto '/>
              </div>
            </div>
            <div
            onClick={() => fileInputRef?.current?.click()} 
            onMouseEnter={() =>{
                setIsHovered(true);
              }} onMouseLeave={() =>{
                setIsHovered(false);}}  className=' h-full flex shadow-sm   rounded-full  absolute  sm:right-5 right-2 sm:top-1/2 z-10'>
              <Image src="/avatar.png" width={100} height={100} className={` h-full w-auto ${ishovered ? 'opacity-60' : ' '}   rounded-full `} alt='user avatar'>
              </Image>
              <input 
              ref={fileInputRef}
              onChange={handelavatarchange}
              className='hidden' 
              type="file" />
              <div className={`w-full h-full   absolute ${ishovered ? 'flex' : 'hidden ' }  items-center justify-center rounded-full`}>
                <AiOutlineCloudUpload className=' font-bold h-1/4 w-auto '/>
              </div>
            </div>
          </div>
            <div className='flex items-center justify-between gap-3 w-9/10 h-10'>
                <button onClick={(e)=>{
                  e.preventDefault();
                  setFormSelected("user");
                }}  className={`flex-1 ${formselected === "user" ? 'text-blue-300/40 border-b ' : 'text-white'} cursor-pointer`} >
                  User Info 
                </button>
                <button onClick={(e)=>{
                  e.preventDefault();
                  setFormSelected("pass");
                }} 
                className={`flex-1 ${formselected !== "user" ? 'text-blue-300/40 border-b ' : 'text-white'} cursor-pointer`}>
                  Password information
                </button>
            </div>
            {formselected === "user" ?
             <InformtionForm setFieldState={setFieldState} fieldstate={fieldstate} handleSubmit={handleSubmit}></InformtionForm>
              :
              <Passwordform setFieldState={setFieldState} fieldstate={fieldstate} handleSubmit={handleSubmit}></Passwordform>
            }
        </div>
    </div>
  )
}

export default Setting