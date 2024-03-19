import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import '../../global.css'
import '../../tailwind.config'
// import { Provider as AuthProvider } from "next-auth/react";
import { SessionProvider } from 'next-auth/react';
const MyApp = ({ Component, pageProps }) => {
  return (
   <SessionProvider session={pageProps.session}>
    <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
   </SessionProvider>
  )
}

{/* <Provider store={store}> */}
{/* <Component {...pageProps} /> */}
{/* </Provider> */}

export default MyApp
