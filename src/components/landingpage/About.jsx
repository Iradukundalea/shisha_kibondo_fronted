import React from 'react'

function About() {
  return (
    <div className='w-full  bg-white'>
      <h1 className='text-4xl font-bold text-center py-8 mb-4'>About us</h1>
        <div className='max-w-[1240px] mx-auto grid  gap-8  ml-20 mr-20'>
          
          <div className='w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300  '>
          <h2 className='text-2xl font-bold text-center py-8 mb-4'>Services we provide</h2>

            <p className='text-center text-medium '>Helps in building muscles, development, growth, provide energy and builds tissues as well.</p>
             
          </div>
          
          
        </div>
        
    </div>
  )
}

export default About