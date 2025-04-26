import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handelRefreshToken = async (fetchUsers : any) => {
  try {
    const response = await axios.post("http://localhost:14100/api/auth/refresh", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchUsers();
  } catch (error : any) {
    if (axios.isAxiosError(error)) {
      console.error('Error:', error.response?.data?.message || error.message);
    }
  }
};