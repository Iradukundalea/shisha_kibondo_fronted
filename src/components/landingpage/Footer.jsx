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
     <h1 className='w-full text-3xl  ml-12 font-bold text-[#00df9a]'>SHISHA KIBONDO</h1> 
 <p className='py-4 ml-12'>Feed them a healthy, nutrition-filled breakfast. Breakfast is the most important meal of the day, enabling a child to have strength to last them throughout the</p>
     
    
        </div>   
        <div className=' ml-12 flex justify-between'>
            <div>
                <h6 className='font-medium text-gray-400 '>USEFUL LINKS</h6>
                <ul className='py-2 text-sm'>food</ul>
                <ul className='py-2 text-sm'>about us</ul>

                <ul className='py-2 text-sm'>Home</ul>

            </div>
            <div className=''>
                <h6 className='font-medium text-gray-400 '>CONTACT US</h6>
                <ul className='py-2 text-sm'>Kigali-Rwanda</ul>
                <ul className='py-2 text-sm'>+250783540349</ul>
                <ul className='py-2 text-sm'>Email: shishakibondo@gmail.com</ul>

                

            </div>
           


        </div>

        <div className='ml-36'>
            <FaTwitterSquare size={30} />
            <FaInstagram  size={30}/>
            <FaFacebookSquare size={30} />
            <FaDribbbleSquare size={30} />

            </div>
    </div>
  )
}

export default Footer