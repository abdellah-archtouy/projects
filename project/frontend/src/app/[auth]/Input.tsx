"use client"
import React from 'react'
import { useState } from 'react'
interface FormState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface Inputprops{
    type: string;
    placeholder: string;
    setFieldState: React.Dispatch<React.SetStateAction<FormState>>;
}

function Input({type , placeholder, setFieldState}: Inputprops) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // const [fieldName, setFieldName] = useState('');
    placeholder = placeholder.toLowerCase();
    placeholder = placeholder.replace(/\s+/g, '');
    setFieldState(prev => ({
      ...prev,
      [placeholder]: e.target.value
    }));
  };
  return (
    <input 
      type={type} 
      className=' bg-white w-full h-10 rounded-lg p-2 focus:outline-0 text-black/35' 
      placeholder={placeholder}
      // value={value}
      onChange={handleChange}
       />
  )
}

export default Input