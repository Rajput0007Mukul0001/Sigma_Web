import React from 'react'
import Image from 'next/image'
import {useState,useEffect} from "react"
import { StarIcon } from '@heroicons/react/outline';
import Currency from "react-currency-formatter"
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';

function Product({id,title,price,description,category,image}) {
    
    const MAX_RATING=5;
    const MIN_RATING=1;

    const [rating, setRating] = useState(0);

    const [hasPrime,setPrime] = useState(0);


    const dispatch = useDispatch();

    const addItemToBasket = ()=>{

    //  add krne ke liye we need a dispatch    
        // product toh aah rha hai props se obj
        const product = {
            id,
            title,
            price,
            description,
            category,
            rating,
            hasPrime,
            image
        };

        // sending the product as an action to the redux store .... the basket slice 
        dispatch(addToBasket(product))

    };

    // const [rating] = useState(
    //     Math.floor(Math.random()*(MAX_RATING - MIN_RATING +1 )) + MIN_RATING
    // );

    // useEffect solved hydrated mismatch as it only re-render the changed component only (problem solved)

    useEffect(() => {
      const randomRating = Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING;
      setRating(randomRating);

      const randomPrime = (Math.random()<0.5);
      setPrime(randomPrime);

    }, []);




    // whatever number we pass in the useState same number of starts it will generate there
  
    return (
        
    <div className='relative max-w-screen-lg mx-auto flex flex-col m-5 bg-white z-30 p-10 bg-gradient-to-b from-transparent to-gray-400 sm:w-full sm:max-w-xs sm:mx-auto xs:max-w-full xs:w-full'  >
       
        <p className='absolute top-2 right-2 text-xs italic text-gray-400'>
            {category}
        </p>
        
        <Image src={image} height={200} width={200} objectFit="contain" alt="image of product"/>

        <h4 className='my-3'>{title}</h4>

        <div className='flex'>
        {Array(rating)
        .fill()
        .map((_,i)=>(
            <StarIcon key={i} className='h-5 text-yellow-800' />
        ))}
        </div>
        
    
        {/* <p className='left-2 text-xs  mx-2 line-clamp-3 sm:line-clamp-1 sm:hidden  md:line-clamp-2 '>{description}</p> */}


        <div className='mb-5'>
        <Currency quantity={price*105} currency='INR'/>
        </div>

        {hasPrime && (
        <div className='flex items-center space-x-2 -mt-5'>
            <img className="w-12 p-1 m-1" src="https://th.bing.com/th/id/OIP.bFa4AJt4Kh3NA1cY2aFlmQHaHa?w=189&h=189&c=7&r=0&o=5&pid=1.7" alt="prime"/>
            <p className='text-xs text-gray-500'>FREE DELIVERY</p>
        </div>
        )}

    {/* button class is not in tailwind so we add check in global css  */}
    {/* onClick={addItemToBasket}  */}
    <button onClick={addItemToBasket} className='mt-auto button '>Add To Cart</button>

    </div>
  )
}

export default Product