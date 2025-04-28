import React from 'react'
import { Sidebar } from '@/components/sidebar'
import Navbar from '@/components/navbar'


const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-full min-h-screen flex bg-gray-200"> 
      
      {/* Sidebar Section */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] flex flex-col">
        {/* Navbar Section */}
        <Navbar />
        <div className='flex-1 p-2 overflow-y-auto'>
          {children}
        </div>
      </div>
      
    </div>
  )
}

export default ProtectedLayout