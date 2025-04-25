"use client";
import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
  users,
  className,
}: {
    users: any[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(users.length / 3);

  const firstPart = users.slice(0, third);
  const secondPart = users.slice(third, 2 * third);
  const thirdPart = users.slice(2 * third);

  return (
    <div
      className={cn(" h-full w-full flex   justify-center gap-4 p-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-start overflow-y-auto", className)}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 h-full w-full  md:grid-cols-2 lg:grid-cols-3 items-start   gap-10"
        ref={gridRef}
      >
        <div className="grid  gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }} // Apply the translateY motion value here
              key={"grid-1" + idx}
                className="flex flex-col items-center justify-center w-full  h-[350px] bg-gray-500/30 rounded-lg shadow-2xl"
            >
                <h1 className="text-2xl font-bold text-white">{el.username}</h1>
                <p className="text-sm text-gray-300">{el.email}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid  gap-10">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }}
                className="flex flex-col items-center justify-center w-full h-[350px] bg-gray-500/30 rounded-lg shadow-2xl"
             key={"grid-2" + idx}>
                <h1 className="text-2xl font-bold text-white">{el.username}</h1>
                <p className="text-sm text-gray-300">{el.email}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} 
            className="flex flex-col items-center justify-center w-full h-[350px] bg-gray-500/30 rounded-lg shadow-2xl"
            key={"grid-3" + idx}>
                <h1 className="text-2xl font-bold text-white">{el.username}</h1>
                <p className="text-sm text-gray-300">{el.email}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
