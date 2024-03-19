// it's a standard inbuilt path we used to get for the convineince 


import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"
// import { Provider } from "next-auth/providers"
// updated documentaion me ye support ni krta hai 

import GoogleProvider from "next-auth/providers/google"


// Provider mtlb kha se provide kra rahe hai ya ho rha hai 


export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // Provider.Google({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          },pages: {
            signIn: '/auth/signin',
            signOut: '/auth/signout',
            error: '/auth/error', // Error code passed in query string as ?error=
            verifyRequest: '/auth/verify-request', // (used for check email message)
            newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
          }
      
    }),
    // ...add more providers here
  ],

}


export default NextAuth(authOptions)
