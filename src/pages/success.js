import { CheckCircleIcon } from "@heroicons/react/outline"
import Header from "../Components/Header"
import { useRouter } from "next/router"

import { useEffect } from 'react';


import axios from 'axios';

function success() {

    const router = useRouter();

    useEffect(() => {
      // Code to execute when the component mounts
      sendEmail(); // Call your function here
  }, []);


  const sendEmail = async () => {
    try {
        await axios.post('/api/sendEmail');
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error Occurs:', error);
    }
};

  return (
    <div className="bg-gray-100 h-screen">
    <Header/>

    <main className="max-w-screen-lg mx-auto"> 
    
    <div className="flex flex-col p-10 bg-white" >
        <div className="flex items-center space-x-2 mb-5">
    <CheckCircleIcon className="text-green-500 h-10"/>
    <h1 className="text-3xl">
    Thank You Your order has been confirmed!
    </h1>
         </div>  
         <p>
           Thank you for shopping with us. we'll send a confirmation of items
           has shipped, if you would like to create the status of 
           orders please press the link below.
         </p>
         <button onClick={()=>router.push("/orders")} className="button mt-8">Go To My Orders</button>
    </div>
    </main>

    </div>
  )
}

export default success