import React from 'react'
import {

    FaDribbbleSquare,
    FaFacebookSquare,
    FaInstagram,
    FaTwitterSquare
 } from 'react-icons/fa'

function Footer() {
  return (
    <div className=' mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300 bg-black w-full'>

     <div>
     <h1 className='w-full text-3xl font-bold text-[#00df9a]'>SHISHA KIBONDO</h1> 
 <p className='py-4 '>Feed them a healthy, nutrition-filled breakfast. Breakfast is the most important meal of the day, enabling a child to have strength to last them throughout the</p>
     
     <div className='flex md:w-[75%] my-6 justify-between'>
        <FaDribbbleSquare size={30} />
        <FaFacebookSquare size={30} />
        <FaInstagram  size={30}/>
        <FaTwitterSquare size={30} />

     </div>
        </div>   
        <div className='lg:col-span-2 flex justify-between'>
            <div>
                <h6 className='font-medium text-gray-400'>solutions</h6>
                <ul className='py-2 text-sm'>analytics</ul>
                <ul className='py-2 text-sm'>analytics</ul>

                <ul className='py-2 text-sm'>analytics</ul>

            </div>
            <div>
                <h6 className='font-medium text-gray-400'>support</h6>
                <ul className='py-2 text-sm'>documentation</ul>
                <ul className='py-2 text-sm'>gguides</ul>

                

            </div><div>
                <h6 className='font-medium text-gray-400'>solutions</h6>
                <ul className='py-2 text-sm'>about</ul>
                <ul className='py-2 text-sm'>job</ul>


            </div>

        </div>

    </div>
  )
}

export default Footer