<!-- hydration code for the server components is


import React from 'react'
import { Sidebar } from '@/components/sidebar'
import Navbar from '@/components/navbar'


const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <!-- <div className="w-full h-screen flex bg-gray-200"> {/* Add flex here */} -->
      
      {/* Sidebar Section */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] h-full">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] flex flex-col h-full overflow-hidden">
        {/* Navbar Section */}
        <Navbar />
        <div className='flex-1 p-2 overflow-y-scroll'>
          {children}
        </div>
      </div>
      
    </div>
  )
}

export default ProtectedLayout -->

TODO  : remove hydration by creating client component wrapper