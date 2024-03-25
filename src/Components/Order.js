import moment from 'moment'
import React from 'react'
import Currency from "react-currency-formatter"


function Order({id,amount,amountShipping,items,timestamp,images}) {
  return (
  
<div className='relative border rounded-md '>

<div className='max-w-screen-lg mx-auto bg-white z-1 p-5 bg-gray-300'>

    <div className='flex flex-wrap items-center justify-between'>

        <div className='flex items-center space-x-5'>
            <p className='font-bold text-xs'>ORDER PLACED</p>
            <p>{moment.unix(timestamp).format("DD MM YYYY")}</p>
        </div>
        
        <div className='text-xs p-4 m-auto'>
            <p className='font-bold'>Total</p>
            <p>
                <Currency quantity={amount*105} currency='INR' />
            </p>
        </div>

      
        <p className='text-sm p-2 flex-1 flex-wrap text-right text-blue-500'>
            {items.length}
        </p>

        <p className='truncate p-2 flex-wrap text-xs :w-72'>
            ORDER ID : {id}
        </p>

    </div>
</div>

    <div className='p-5 sm:p-10 overflow-x-auto '>
        <div className='flex space-x-6'>
        {images.map((image) =>(
            <img src={image} alt="" className='h-20 object-contain sm:h-32'/>
        ))}
        </div>
    </div>

    </div>
  )
}

export default Order