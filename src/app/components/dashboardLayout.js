import React from 'react'
import Sidebar from './sidebar';
import TopBox from './TopBox';
import Navbar from './navbar';

const DashboardLayout = ({ children }) => { 
     return (
      <>
        
          <div className="h-screen">
          <TopBox/>
          <div className="flex h-screen">
          <Sidebar/>
          </div>
          <main className="w-3/4 p-4">
            {children}
          </main>
          </div>
        </>
        );
}
export default DashboardLayout;
