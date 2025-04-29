import React from 'react'
import Input from '@/app/[auth]/Input';


function Passwordform({setFieldState, fieldstate, handleSubmit} : any) {
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
  return (
    <form action="" method='' onSubmit={handleSubmit} className='flex-1 w-9/10 gap-2  flex flex-col'>
    <div className='flex flex-1 flex-col items-start   justify-start w-full gap-2'> 
      {passwordFields.map((field, index) => (
        <div key={index} className='w-full flex flex-col gap-3'>
          <h1 className='text-white'>{field.placeholder}</h1>
          <Input type={field.type} placeholder={field.placeholder} fieldstate={fieldstate} setFieldState={setFieldState} className=' bg-gray-500/30  rounded-lg shadow-2xl focus:outline-0 text-white' ></Input>
        </div>
      ))}
    </div>
    <button type='submit' className=' bg-blue-300/40 self-end h-10 rounded-lg w-38  shadow-2xl hover:opacity-70'>Save</button>
  </form>
  )
}

export default Passwordform