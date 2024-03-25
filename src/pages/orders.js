// firebase and stripe info will be combined here 

import React from 'react'
import Header from '../Components/Header';

import { getFirestore, collection, doc, getDocs } from 'firebase/firestore';

import { getSession, useSession } from 'next-auth/react';

import {db} from "../../firebase";

import moment from 'moment';
import Order from '../Components/Order';

// const db = require('../../firebasefirebase');

function Orders({orders}) {

const {data : session} = useSession();

console.log(orders);

  return (
    <div>
        <Header/>
        <main className='max-w-screen-lg mx-auto p-10'>
        <h1 className='text-3xl border-b mb-2 pb-1 border-green-400'>
        Your Orders
        </h1>

    {/* if there is a session then only we will show them the orders ok  */}

    {session  ? (
        <h2>x Orders</h2>
    ) : (
        <h2>please sign in to see your orders</h2>
    )
    }

    <div className='mt-5 space-y-4'>
        {orders?.map(({id,amount,amountShipping,items,timestamp,images}) =>(
            <Order
            key={id}
            id={id}
            amount={amount}
            amountShipping={amountShipping}
            items={items}
            timestamp={timestamp}
            images={images}
            />
        ))}
    </div>


        </main>
    </div>
  )
}

export default Orders;

// to fetch the items from data base we have to do the server side render here ok
// because user hit the server first ok 

export async function getServerSideProps(context){

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// get the users logged in credentials here ok 

const session = await getSession(context);

// no session per emty props return krega isme 
if(!session){
    return{
        props:{},
    };
}



// Firebase db
// const userOrdersCollection = collection(db, 'users', session.user.email, 'orders');
// const stripeOrdersSnapshot = await getDocs(userOrdersCollection);

const userOrdersCollection = collection(db, 'users', session.user.email, 'orders');
const stripeOrdersSnapshot = await getDocs(userOrdersCollection);


// Stripe orders
const orders = await Promise.all(
  stripeOrdersSnapshot.docs.map(async (order) => {
    const orderData = order.data();

    return {
      id: order.id,
      amount: orderData.amount,
      amountShipping: orderData.amount_shipping,
      images: orderData.images,
      timestamp: moment(orderData.timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    };
  })
);


// // firebase db
// const stripeOrders = await db.collection("users")
// .doc(session.user.email)
// .collection('orders')
// .orderBy('timestamp','desc')
// .get();

// //stripe orders

// const orders = await Promise.all(
//     stripeOrders.docs.map(async (order)=>({
//         id: order.id,
//         amount: order.data().amount,
//         amountShipping:order.data().amount_shipping,
//         images:order.data().images,
//         timestamp: moment(order.data().timestamp.toDate()).unix(),
//         items:(
//             await stripe.checkout.sessions.listLineItems(order.id, {
//                 limit: 100
//                 })
//             ).data,

//      }))

//     );

    return {
        props:{
            orders,
        }
    }

}