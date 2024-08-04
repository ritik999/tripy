import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-26 gap-5'>
        <h1 className='font-extrabold text-[30px] text-center mt-12'>
        <span className='text-red-400'>Discover Your Next Adventure with AI:</span> 
        <br></br>
        Personalized Itineraries at Your Fingertips
        </h1>
        <p className='text-center text-xl text-gray-500'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
        <Link to={'/create-trip'}>
        <Button>Get Started,It's Free</Button></Link>

        <img src='/landing.png' className='h-1/6' />
    </div>
  )
}

export default Hero