import moment from 'moment'
import React from 'react'
import Currency from "react-currency-formatter"


function Order({id,amount,amountShipping,items,timestamp,images}) {
  return (
    <div className='relative border rounded-md'>
        <div className='flex items-center space-x-10 p-5 bg-gray-100'>
        <p className='font-blod-text-xs'>ORDER PLACED</p>
        <p>{moment.unix(timestamp).format("DD MM YYYY")}</p>
        
        <div>
            <p className='text-xs font-blod'>Total</p>
            <p>
            <Currency quantity={amount} currency='GBP' />
            Next Day Delivery {" "}
            <Currency quantity={amountShipping} currency='GBP'/>
            </p>
        
        </div>

        <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500'>
        {items.length}
        </p>

        <p className='absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap'> 
        ORDER #{id}
        </p>
        </div>

    <div className='p-5 sm:p-10 overflow-x-aut'>
        <div className=' flex space-x-6'>
        {images.map((image) =>(
            <img src={image} alt="" className='h-20  object-contain sm:h-32'/>
        ))}
        </div>
    </div>

    </div>
  )
}

export default Order