import React from 'react'
import { IoMdTrendingUp } from "react-icons/io";
import { IoMdTrendingDown } from "react-icons/io";

function Cardcomponent( Data) {
    const growth = (Data.Data.growth || "").slice(1)
  return (
    <div className='h-[120px] p-3  w-1/4 bg-white/80 rounded-2xl  flex flex-col items-center justify-center'>
        <div className='flex items-center justify-between w-full h-1/2'>
            <h1 className='text-xl font-bold'>{Data.Data.title}</h1>
            <div className='w-8 border flex items-center justify-center rounded-lg bg-black/5  h-8'>
                <Data.Data.Image className=" h-10 w-10"/>
            </div>
        </div>
        <div className='flex items-center justify-between  h-1/2 pr-8 w-full'>
            <p className='text-2xl font-bold'>{Data.Data.description}</p>
            <div className={`flex w-16 border ${Data.Data?.growth[0] === '+' ? "border-green-600 bg-green-600/20" : "border-red-600 bg-red-600/20"} rounded-lg  items-center justify-center`}>
                <p>{growth}</p>
                {
                    Data.Data?.growth[0] === '+' ?(<IoMdTrendingUp></IoMdTrendingUp>) :(<IoMdTrendingDown></IoMdTrendingDown>)
                }
            </div>
        </div>
    </div>
  )
}

export default Cardcomponent