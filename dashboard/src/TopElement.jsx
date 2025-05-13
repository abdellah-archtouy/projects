import React from 'react'
import Cardcomponent from './Cardcomponent'
import { CiSearch } from "react-icons/ci";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import { GrMoney } from "react-icons/gr";
import { RiAiGenerate } from "react-icons/ri";


function TopElement() {
    const data = [
        {
            title: "Page Views ",
            description: "12,450",
            growth: "+5%",
            Image: () =>  <GrFormView className='w-8 h-8'/>
        },
        {
            title: "Total Revenue",
            description: "$369.9",
            growth: "-10%",
            Image: () => <GrMoney />
        },
        {
            title: "Bounce Rate",
            description: "89.12%",
            growth: "+10%",
            Image: () => <RiAiGenerate />
        }
    ];
    const cards = data.map((item, index) => (
        <Cardcomponent 
        key={index}
        Data={item}
        />
    ));
  return (
    <div className='w-full  h-fit bg-transparent flex gap-3 items-center justify-center'>
        <div className=' flex gap-3 p-3 flex-col bg-white/80 rounded-2xl h-[120px] w-1/5'>
            <div className='flex h-fit text-2xl font-bold items-center bg-whit justify-start gap-4'>
                <h1>Trade Analytics</h1>
            </div>
            <div className='flex h-1/2 gap-2.5 items-center justify-start  '>
                <div className=' flex items-center justify-center w-[40px] h-[40px] bg-gray-200 rounded-full p-3'>
                    <CiSearch className='' ></CiSearch>
                </div>
                <div className=' flex items-center justify-center w-[40px] h-[40px] bg-gray-200 rounded-full p-3'>
                    <MdOutlineNotificationsActive className='' ></MdOutlineNotificationsActive>
                </div>
                <div className=' flex items-center justify-center w-[40px] h-[40px] bg-gray-200 rounded-full p-3'>
                    <img className=' w-full h-full ' src="/profile.png" alt="profile" />
                </div>
            </div>
        </div>
        {cards}
    </div>
  )
}

export default TopElement