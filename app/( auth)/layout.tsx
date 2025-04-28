import Image from 'next/image'
import React from 'react'

const AuthLayout = ({children}:{children: React.ReactNode}) => {
  return <div className='w-full h-screen flex flex-row items-center justify-center'>
    <div className='w-1/2 h-full flex justify-center items-center'>{children} </div>
    <div className='w-1/2 h-full relative hidden md:block'>
      <Image 
      className='hidden md:block'
      src='https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg' 
      alt='healthcare management system'
      fill
      priority
      />
    </div>
  </div>
}

export default AuthLayout
//45.00