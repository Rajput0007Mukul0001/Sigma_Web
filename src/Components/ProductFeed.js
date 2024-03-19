import React from 'react'
import Product from './Product';

function ProductFeed({products}) {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 xs:grid-cols-1 sm:grid-cols-1 sm:pl-5 sm:pr-5'>
        {/* products we can map thorugh to show them */}

        {products.map(({id,title,price,description,category,image}) =>(
            
            // <p>{title}</p>  this will only give title so how the all elements (problem ??)
            <Product 
                // key is from product.js component ok here we are giving the props 
                key={id}
                id={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
                
                
            />
            ))}

    </div>
  )
}

// NOTE : key in react is very important it telling us which element we are talking in here

export default ProductFeed;