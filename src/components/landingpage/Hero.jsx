import React from 'react';
import Typed from 'react-typed';
import pregnant from '../../assets/pregnant.jpg';

export const Hero = () => {
  return (
    <div className='text-white bg-black h-3/4'>
      <div className='flex'>
        <div className='max-w-[800px] mt-[96px] w-1/2 mx-auto text-center flex flex-col justify-center'>
          <p className='#00df9a front-bold p-2'>TAKE CARE KIDS</p>
          <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Growing data</h1>
          <div className=''>
            <p className='md:text-5xl sm:text-4xl text-xl font-bold'>To have children with good health need to take</p>
            <Typed className='md:text-5xl sm:text-4xl text-xl font-bold pl-2' strings={['Body-building-food', 'Body-protecting-food', 'Energy-giving-food']} typeSpeed={120} backSpeed={140} loop />
            <p className='md:text-2xl text-xl font-bold text-gray-600 py-4'>
              Mother take care yourself from the first day of pregnant it will help your children to grow well
            </p>
            <button className='bg-[#00df9a] w-[200px] mt-5 rounded font-medium my-6 mx-auto py-3 text-black'>Welcome</button>
          </div>
        </div>
        <div className='w-1/2 bg-black flex items-center justify-center'>
          
          <img className='max-w-full h-auto rounded-full cursor-pointer' src={pregnant} alt='' />
        </div>
      </div>
    </div>
  );
};
