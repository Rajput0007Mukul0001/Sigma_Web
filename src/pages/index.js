import Head from "next/head";
import Header from "../Components/Header";
import Banner from "../Components/Banner";
import ProductFeed from "../Components/ProductFeed";
import { getSession } from "next-auth/react";
import '../../tailwind.config';
import '../styles/globals.css';

// here we pass props or can de-structure it 

export default function Home({products}) {
  return (
    <div className="bg-gray-300 ">
      <Head>
        <title>Σ-Kart</title>
      </Head>

    {/* <h1>Header Component</h1> */}
      {/* header */}
      <Header/>

    <main className="max-w-screen-2xl mx-auto">

    {/* Banner  */}
    
    <Banner/>

    {/* ProductFeed */}

    <ProductFeed products={products} />

    {/* pass this as a prop to get from the productFeed.js okay */}

    {/* <p>{products}</p>  this will give error as it is only json here (this problem solved)*/}

    </main>

    </div>
  );
}


export async function getServerSideProps(context){
 
 const session = await getSession(context);

  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
    );

    // here we got the data from the server then how to just pass it to the component here
    // so we return them as a props because of Es6 features here (problem solved)

    return {
      props:{
        products,
        session
    }
  };

  }

// GET-> https://fakestoreapi.com/products