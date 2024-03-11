import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowBarLeft } from 'react-icons/bs'

const BackButton = ({destination = '/'}) => {
  return (
    <div className='flex'>
        <Link 
        to={destination}
        className='bg-sky-1600 text-black px-4 py-1 rounded-lg w-fit'
        >
            <BsArrowBarLeft className='text-2x1' />
        </Link>
        </div>
  )
}

export default BackButton