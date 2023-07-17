import React,{useState, useRef} from 'react'
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'
import shisha from '../../assets/shisha.png';
import { Link as LinkScroll } from 'react-scroll';
import { Link } from 'react-router-dom';

const Navbar = ({ scrollToSection }) => {
    const [nav, setNav]=useState(false)
    const handleNav=()=>{
        setNav(!nav)
    }

    const linkStyles = {
      cursor: 'pointer',
    };


  return (
    <div className='text-white flex justify-between  max-w-[1240px] mx-auto px-4 items-center  h-24'>
          <img className='h-10 rounded-full cursor-pointer' src={shisha} alt='' />
      
      <h1 className='w-full text-3xl ml-1 font-bold text-[#00df9a]'>SHISHA KIBONDO PROGRAM</h1> 
      <ul className='hidden md:flex'>
        <li className='p-5 text-black' style={linkStyles}>HOME</li>
        <li className='p-5 text-black'></li>
        <LinkScroll to="food" smooth={true} onClick={() => scrollToSection('food')} style={linkStyles}>
          <li className='p-5 text-black'>FOOD</li>
        </LinkScroll>
        <LinkScroll to="about" smooth={true} onClick={() => scrollToSection('about')} style={linkStyles}>
          <li className='p-5 text-black'>ABOUT</li>
        </LinkScroll>
        <Link to="/login">
          <li className='p-5 text-black'>LOGIN</li>
        </Link>
        </ul> 
        <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20}/>:<AiOutlineMenu size={20} /> }
        
        </div>

        <div className={nav ? 'fixed left-0 top-0 w-[60%]   border-r-grey-900 h-full bg-[#000300] ease-in-out duration-500': 'fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-[#00df9a] mr-4'>SHISHA</h1> 
 
            <ul className='pt-24 uppercase p-4'>
            <li className='p-4 border-b border-gray-600'>HOME</li>
            <li className='p-4 border-b border-gray-600'>FOOD</li>
            <li className='p-4 border-b border-gray-600' >ABOUT</li>
            <li className='p-4'>LOGIN</li>  
            </ul>
        </div>
    </div>
    
  )
}

export default Navbar