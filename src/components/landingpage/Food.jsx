import React from 'react'
import building from '../../assets/building.jpg'
import energy from '../../assets/energy.jpg'
import protecting from '../../assets/protecting.jpg'
import { Link, Navigate } from 'react-router-dom'

const Food = () => {
  const handleBodyBuilding = ()=>{
    return <Navigate to='/bodybuilding' />
  }
  return (
    <div className='w-full  bg-white'>
      <h1 className='text-4xl font-bold text-center py-8 mb-4'>Example of food helps child in growth</h1>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8  ml-20 mr-20'>
          
          <div className='w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300  '>
          <h2 className='text-2xl font-bold text-center py-8 mb-4'>Body building food</h2>

            <img className=' mx-auto h-19 mt-[-3rem] bg-white ' src={building} alt=""/>
            <p className='text-center text-medium '>Helps in building muscles, development, growth, provide energy and builds tissues as well.</p>
             {/* <center><button className='bg-[#00df9a] w-[200px] rounded font-medium my-6 mx-auto py-3 text-black'>Read More</button></center> */}
             
          </div>
          <div className='w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 '>
          <h2 className='text-2xl font-bold text-center py-8 mb-4'>Energy giving food</h2>

            <img className=' mx-auto  mt-[-3rem] bg-white ' src={energy} alt=""/>
            <p className='text-center text-medium '>hose that supply the body with energy to accomplish work after getting digested. They have a relatively higher sugar content than the other kinds of food.</p>
             {/* <center><button className='bg-[#00df9a] w-[200px] rounded font-medium my-6 mx-auto py-3 text-black' onClick={handleBodyBuilding}>Read More</button></center> */}
             
          </div>
          <div className='w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 '>
          <h2 className='text-2xl font-bold text-center py-8 mb-4'>Body protecting food</h2>

            <img className=' mx-auto h-19 mt-[-3rem] bg-white ' src={protecting} alt=""/>
            <p className='text-center text-medium '>Helps in building muscles, development, growth, provide energy and builds tissues as well.</p>
             {/* <center><button className='bg-[#00df9a] w-[200px] rounded font-medium my-6 mx-auto py-3 text-black'>Read More</button></center> */}
             
          </div>
        </div>
        
    </div>
  )
}

export default Food