const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async(req,res)=>{
    // end point of next.js here
    const {items,email} = req.body;
    
    // to show in vs code terminal that this is working here ok 
    // console.log(items);
    // console.log(email);
    // stripe kis fromat me lega 


try{

    const transfromedItems = items.map(item => ({
        // description: item.description,
        quantity: 1,
        // price:item.priceID,
        price_data: {
            currency: 'INR',
            unit_amount: item.price*100*105,
            product_data: {
                name: item.title,
                images: [item.image],
            },
        },
    }));


    // stripe account per we have create the shipping_product also get the shipping ID from there ok
    // try {
      // allowed_countries: ['GB', 'US', 'CA', 'IN'],

        const checkoutSession = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
        //   shipping_rates: ['shr_1Or0euSDysHtItdlEF2oND55'],
          shipping_address_collection: {
            allowed_countries: ['IN'],
          },
          line_items: transfromedItems,
          mode: 'payment',
          success_url: `${process.env.HOST}/success`,
          cancel_url: `${process.env.HOST}/checkout`,
          metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image)),
          },
          
            // name: 'Xyz to go there',
            // address: {
            //   line1: '510 Townsend St',
            //   postal_code: '256843843',
            //   city: 'Bdbfdb',
            //   state: 'Uttar Pradesh',
            //   country: 'IN',
            // },
          
        //   shipping_options: [
        //     {
        //       shipping_rate_data: ['shr_1Or0euSDysHtItdlEF2oND55'],
        //     },
        //   ],

    

        });
    
        res.status(200).json({ id: checkoutSession.id });
      } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };



    /**
     * 
     * 
     solve it by giving 
     
     NEXTAUTH_SECRET to the .env_local here
    
     [next-auth][error][JWT_SESSION_ERROR] 
https://next-auth.js.org/errors#jwt_session_error decryption operation failed {
  message: 'decryption operation failed',
  stack: 'JWEDecryptionFailed: decryption operation failed\n' +    
    '    at gcmDecrypt (C:\\Users\\Krishna Enterprises\\sigma_web\\node_modules\\jose\\dist\\node\\cjs\\runtime\\decrypt.js:67:15)\n' +
    '    at decrypt (C:\\Users\\Krishna Enterprises\\sigma_web\\node_modules\\jose\\dist\\node\\cjs\\runtime\\decrypt.js:92:20)\n' +  
    '    at flattenedDecrypt (C:\\Users\\Krishna Enterprises\\sigma_web\\node_modules\\jose\\dist\\node\\cjs\\jwe\\flattened\\decrypt.js:143:52)\n' +
    '    at async compactDecrypt (C:\\Users\\Krishna Enterprises\\sigma_web\\node_modules\\jose\\dist\\node\\cjs\\jwe\\compact\\decrypt.js:18:23)\n' +
    '    at async jwtDecrypt (C:\\Users\\Krishna Enterprises\\sigma_web\\node_modules\\jose\\dist\\node\\cjs\\jwt\\decrypt.js:8:23)\n' +
    '    at async Object.decode (C:\\Users\\Krishna Enterprises\\sigma_web\\node_modules\\next-auth\\jwt\\index.js:66:7)\n' +
    '    at async Object.session (C:\\Users\\Krishna Enterprises\\sigma_web\\node_modules\\next-auth\\core\\routes\\session.js:43:28)\n' +
    '    at async AuthHandler (C:\\Users\\Krishna Enterprises\\sigma_web\\node_modules\\next-auth\\core\\index.js:165:27)\n' +        
    '    at async NextAuthApiHandler (C:\\Users\\Krishna Enterprises\\sigma_web\\node_modules\\next-auth\\next\\index.js:22:19)\n' +  
    '    at async NextAuth._args$ (C:\\Users\\Krishna Enterprises\\sigma_web\\node_modules\\next-auth\\next\\index.js:108:14)\n' +    
    '    at async K (C:\\Users\\Krishna Enterprises\\sigma_web\\node_modules\\next\\dist\\compiled\\next-server\\pages-api.runtime.dev.js:21:2946)\n' +
    '    at async U.render (C:\\Users\\Krishna Enterprises\\sigma_web\\node_modules\\next\\dist\\compiled\\next-server\\pages-api.runtime.dev.js:21:3827)\n' +
    '    at async DevServer.runApi (C:\\Users\\Krishna Enterprises\\sigma_web\\node_modules\\next\\dist\\server\\next-server.js:556:9)\n' +
    '    at async NextNodeServer.handleCatchallRenderRequest (C:\\Users\\Krishna Enterprises\\sigma_web\\node_modules\\next\\dist\\server\\next-server.js:268:37)\n' +
    '    at async DevServer.handleRequestImpl (C:\\Users\\Krishna Enterprises\\sigma_web\\node_modules\\next\\dist\\server\\base-server.js:807:17)',
  name: 'JWEDecryptionFailed'
     */