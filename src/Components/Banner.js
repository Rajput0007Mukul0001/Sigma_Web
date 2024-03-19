import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
// react responsive carasoul use krenge isme hum ok 

function Banner() {
  return (
    <div className='relative'>
       
       {/* imaginary div for the graident purpose only it's a trick */}
       <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20'/>
       
        <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
        >
        {/* teen div le lenge kiyunki teen piche wallpaper thik lagega as a carousel */}
        
        {/* 1 */}

        <div className='carousel-image-container'>
        <img loading="lazy" src='https://links.papareact.com/gi1' style={{  height: '60vh' }} alt=""/>
        </div>
        
        {/* 2 */}

        <div className='carousel-image-container'>
        <img loading="lazy" src='https://links.papareact.com/6ff'  style={{  height: '60vh' }} alt=""/>
        </div>

        {/* 3 */}

        <div className='carousel-image-container'>
        <img loading="lazy" src='https://images.unsplash.com/photo-1584433305355-9cb73387fc61' style={{  height: '60vh' }} alt=""/>
        </div>

        </Carousel>
    </div>
  );
}

export default Banner;