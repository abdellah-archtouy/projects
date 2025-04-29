import React from 'react'
import Input from '@/app/[auth]/Input';


function InformtionForm( {setFieldState, fieldstate, handleSubmit} : any) {
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
  
  const Fields = [
    {
      "type": "text",
      "placeholder": "Bio"
    }
  ]
  return (
    <form action="" method='' onSubmit={handleSubmit} className='flex-1 w-9/10 gap-4  flex flex-col'>
    <div className='flex  items-start flex-col md:flex-row justify-start w-full h-fit gap-5'> 
      {upperFields.map((field, index) => (
        <div key={index} className='w-full flex flex-col gap-3'>
          <h1 className='text-white'>{field.placeholder}</h1>
          <Input type={field.type} placeholder={field.placeholder} fieldstate={fieldstate} setFieldState={setFieldState} className=' bg-gray-500/30  rounded-lg shadow-2xl focus:outline-0 text-white' ></Input>
        </div>
      ))}
    </div>
    <div className=' flex-1 w-full flex  flex-col gap-3'>
      {Fields.map((field, index) => (
        <div key={index} className='w-full h-full flex flex-col gap-3'>
          <h1 className='text-white'>{field.placeholder}</h1>
          <textarea placeholder='Bio' value={fieldstate.bio} onChange={(e) => setFieldState({...fieldstate, 'bio': e.target.value})}
          className='w-full h-full p-3 resize-none bg-gray-500/30  rounded-lg shadow-2xl focus:outline-0 text-white px-4 ' >
          </textarea>
        </div>
      ))}
    </div>
    <button type='submit' className=' bg-blue-300/40 self-end h-10 rounded-lg w-38  shadow-2xl hover:opacity-70'>Save</button>
  </form>
  )
}

export default InformtionForm