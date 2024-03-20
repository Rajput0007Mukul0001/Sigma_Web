
// Decode the base64 string back to binary data
// const decodedImage = Buffer.from(encodedImage, 'base64');

// Save the binary data to a file/.
// fs.writeFileSync('output.png', decodedImage);


import {signIn,signOut,useSession} from "next-auth/react"

// import { signIn, signOut, useSession } from "next-auth-client"

import Image from 'next/image'
import React from 'react'
// add search functionality on it latter ok 


import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon,
    ArrowRightIcon
} from "@heroicons/react/outline"

import { useRouter } from "next/router";

import { selectItems } from "../slices/basketSlice";

import { useSelector } from "react-redux";

// two variant hai outline and solid ones here

function Header() {

const  { data: session } = useSession();

// we pulling here
const items = useSelector(selectItems);

// session.user
const router = useRouter();
  return (
    <header>
        {/* top nav images wala only search bar as well */}
        <div className="flex items-center bg-amazon_blue p-1 flex-grow full-w py-2 flex-wrap-reverse "> 
            <div onClick={()=> router.push("/")} className="mt-2 flex items-center  flex-grow sm:flex-grow-0 p-4">
                <Image
    
                src="/favicon.ico"
                width = {50}
                height = {50}
                objectFit='contain'
                className='cursor-pointer'
                />
                <p className=' flex  text-white mx-4 md:text-sm font-medium ' >Σ-Kart</p>
            </div>

        {/* search bar here  child of big div */}
        {/* flex-grow property uses */}

        <div className="hidden sm:flex  items-center h-10 rounded-md bg-purple-400 hover:bg-green-500 flex-grow cursor-pointer">
            <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type='text' placeholder='Σ-Kart Search . . . . . . . . .'/>
            <SearchIcon className="h-12 p-4"/>
        </div>
        
{/* "http://localhost:3000/api/auth/signin?error=OAuthSignin" */}

        {/* right part of the navbar */}

        <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
            {/* now here we have three div in containing div */}
            {/* 1 */}
            {/* when we are not sign in then only sign in  */}
            
            <div onClick={!session ? signIn : null} className='link font-bold'>
                <p>
                    {session ? `${session.user.name}`: "Sign In"}
                </p>
                <p className='font-extrabold md:text-sm sm:text-sm'>Account & List</p>
            </div>
            {/* 2 */}
            <div onClick={()=>router.push("/orders")} className='link'>
                <p>Returns</p>
                <p className='items-center font-extrabold md:text-sm sm:text-xs'>& Orders</p>
            </div>
            {/* 3 */}
            <div onClick={()=> router.push("/checkout")} className='relative link flex items-center'>
            <span className='absolute  top-0 right-0 md:right-10 h-4 w-4 bg-green-400 text-center rounded-full text-black font-bold' >
                {items.length}
            </span>

            <ShoppingCartIcon className='h-10' />
            <p className='hidden md:inline font-extrabold md:text-sm sm:text-xs'>Basket</p>
            </div>

            <div onClick={!session ? null : signOut} className="link items-center ">
                <ArrowRightIcon className="relative h-10 p-2 m-1"/>
                <p className='font-extrabold md:text-sm sm:text-xs'>Log Out</p>
            </div>

            {/* end of the container div */}
        </div>


        </div>



        {/* bottom nav */}
        <div className='flex space-x-3 p-2 pl-6 items-center bg-amazon_blue-light bg-purple-400 text-white text-sm border border-gray-700'>
        <p className='link flex items-center'>
        <MenuIcon className='h-6 mr-1 '/> 
         All
        </p>
        <p className='link '>Prime Video</p>
        <p className='link '>E-Business</p>
        <p className='link '>Today's Deals</p>
        <p className='link hidden lg:inline-flex'>Electronics</p>
        <p className='link hidden lg:inline-flex'>Food & Grocery</p>
        <p className='link hidden lg:inline-flex'>Prime</p>
        <p className='link hidden lg:inline-flex'>Buy Again</p>
        <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
        <p className='link hidden lg:inline-flex'>Health & Personal Care</p>
              
        </div>
    </header>
  )
}

export default Header