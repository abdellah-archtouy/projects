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
    className?: string;
}

function Input({type , placeholder, fieldstate, setFieldState, className}: Inputprops) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      className={`w-full h-10 rounded-lg p-2 t   focus:outline-0 text-black/35 ${className}`} 
      placeholder={placeholder}
      // value={value}
      value={fieldstate[placeholder.toLowerCase().replace(/\s+/g, '')]}
      onChange={handleChange}
       />
  )
}

export default Input