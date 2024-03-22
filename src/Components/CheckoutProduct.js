import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/outline'
import Currency from 'react-currency-formatter'
import { useDispatch } from 'react-redux'
import { addToBasket } from '../slices/basketSlice'
import { removeFromBasket } from '../slices/basketSlice'
// need some props for the produc 

function CheckoutProduct({id,title,price,description,category,image,hasPrime,rating}) {
  
    const dispatch = useDispatch();

    const addItemToBasket = ()=> {
        
        const product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            image,
            hasPrime
        };

        dispatch(addToBasket(product))
    }
  
    const removeItemFromBasket = ()=>{
        // remove from the redux store
        dispatch(removeFromBasket({id}))

    }


    return (

    <div className='grid grid-cols-5 m-2'>
    <Image
    src={image}
    height={200}
    width={200}
    objectFit='contain'
    />
    
    {/* middle portion here 3 elements is there */}
    <div className='col-span-3 mx-5'>
    <p>{title}</p>

    <div className='flex'>
        {Array(rating)
        .fill()
        .map((_,i)=>(
            <StarIcon key={i} className='h-5 text-yellow-800' />
        ))}
        </div>

    <p className='text-xs my-2 mt-2 mb-2 line-clamp-3 sm:line-clamp-2 truncate'>{description}</p>

    <Currency quantity={price*105} currency='INR'/>

    {hasPrime &&(
        <div className='flex items-center space-x-2'>
        <img src='https://links.papareact.com/fdw' 
         alt=''
         className='w-12'
        loading='lazy'
        />
        <p className='text-xs text-gray-500'>FREE DELIVERY</p>
        </div>
    )}
    </div>

    <div className='flex flex-col space-y-2 my-auto justify-self-end'>
    
    <button onClick={addItemToBasket} className='button mt-auto'>Add to Basket</button>
    <button onClick={removeItemFromBasket} className='button mt-auto'>Remove from Basket</button>

    </div>

    </div>
  )
}

export default CheckoutProduct