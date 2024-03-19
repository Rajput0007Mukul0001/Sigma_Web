import { buffer } from "micro"
import * as admin from 'firebase-admin'

// special conditions for the admin 
// so the special json file we need 

// toh yahan tk secure ho gya hai apna connections
// secure a connection to firebase from the backend with admin here 

const serviceAccount = require('../../../permissions.json')

const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}): admin.app();


// establish connection to the stripe

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;


const fulfillOrder = async(session)=>{
    console.log('Fulfillinf order',session);

    return app.firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)    
    .set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
    .then(()=>{
        console.log(`SUCCESS : order ${session.id} has been added to the DB`);
    });
}


export default async(req,res)=>{

    if(req.method==="POST"){
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];
        // documentation of stripe on webhooks ok
        // is buffer me ayega sb 

        let event;
        // to check this is same webhooks we getting from stripe ??
         try{
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
         }catch(err){
            console.log('Error!! ', err);
            return res.status(400).send(`Webhooks error : ${err.message}`)
         }


    // handle the checkout.sessions.complete event 

    if(event.type==='checkout.session.completed'){
        const session = event.data.object;

        // after fulfill the order

        return fulfillOrder(session)
        .then(()=> res.status(200))
        .catch((err)=>res.status(400).send(`Webhooks Error!! : ' ${err.message}`));
    }


    }


};

// body parser next format
export const config= {
    api:{
        bodyParser: false,
        externalResolver:true,
    },
};