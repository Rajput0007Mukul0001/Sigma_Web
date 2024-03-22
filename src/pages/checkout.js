import React from 'react'
import Header from '../Components/Header'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'
import CheckoutProduct from '../Components/CheckoutProduct'
import Currency from 'react-currency-formatter'
import { useSession } from 'next-auth/react'
import { selectTotal } from '../slices/basketSlice'
// capital the checkout page
// small in file name bacuase for the url 
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const stripePromise = loadStripe(process.env.stripe_public_key);

export default function Checkout() {

  const items = useSelector(selectItems)
  const {data : session} = useSession();

  const total = useSelector(selectTotal);

  const createCheckoutSessions = async () => {
    try {
      const stripe = await stripePromise;

      if (session && session.user && session.user.email) {
        const checkoutSessionResponse = await axios.post('/api/create-checkout-session', {
          items: items,
          email: session.user.email
        });

        const checkoutSession = checkoutSessionResponse.data;

        const redirectToCheckoutResult = await stripe.redirectToCheckout({
          sessionId: checkoutSession.id
        });

        if (redirectToCheckoutResult.error) {
          throw new Error(redirectToCheckoutResult.error.message);
        }
      } else {
        console.error("Session or user or email is null or undefined");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error.message);
      // You might want to handle the error further or show a user-friendly message
      // Example: set an error state in your component or show a notification to the user
    }
  }

  return (
    <div className='bg-gray-100'>
    <Header/>

    <main className='lg:flex max-w-screen-2xl mx:auto'>
    
    {/* Left  */}
    <div className='flex-grow m-5 shadow-sm'>
    <Image 
    src="https://links.papareact.com/ikj" alt=""
    width={1020}
    height={250}
    objectFit='contain'
    />

    <div className='flex flex-col p=5 space-y-18 bg-white'>
        <h1 className='text-3xl border-b pb-4'>
          {items.length===0 ? "Your Basket Is Empty":`Your Basket has ${items.length} Items`}
        </h1>
        {
          items.map((item,i)=>(
          <CheckoutProduct
          key={i}
          id={item.id}
          title={item.title}
          rating={item.rating}
          price={item.price}
          description={item.description}
          category={item.category}
          image={item.image}
          hasPrime={item.hasPrime}
          />
          ))
        }
    </div>



    </div>

    {/* Right */}
    <div className='flex flex-col bg-white p-10 shadow-md'>
      {items.length>0 && (
        <>
        <h2 className='whitespace-nowrap'>
        SubTotal {items.length} items : {" "}
        <span className='font-bold'>
          <Currency quantity={total*105} currency='INR'/>
        </span>
        </h2>

        <button onClick={createCheckoutSessions} role="link" className={`button mt-2 ${!session ? 'cursor-not-allowed': 'cursor-pointer' } && from-green-300 to-blue-500 border-green-200 text-gray-300 `}>
      
        {!session ? "sign in to checkout" : "Proceed to checkout"}
       
        </button>

        </>
      )}
    </div>
    </main>

    </div>
  )
}
