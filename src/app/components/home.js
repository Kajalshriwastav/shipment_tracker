"use client"

import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";


export default function Home() {
  const [shipmentStatusCounts, setShipmentStatusCounts] = useState([]);

  const { data: session } = useSession(); 

  const handleLogout = async () => {
    const signoutRes = await signOut({ redirect: false, callbackUrl: "/" });

    if (signoutRes.error) {
      // Handle logout error
      console.error("Logout error:", signoutRes.error);
    } else {
      // Redirect or perform other actions after successful logout
      window.location.href = signoutRes.url; // Redirect to the specified URL
    }
  };



  useEffect(() => {
    fetch('/api/totshipmentstatus')
      .then((response) => response.json())
      .then((data) => {
        let arr = data.data;
        setShipmentStatusCounts(arr);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
    

        <div className="h-screen">
          <nav className="bg-green-300">
            <div className="relative w-[1080px] mx-auto flex items-center justify-between">
              <a href="/" className="cursor-pointer py-7 pr-7"></a>

              <h2 className="text-black text-2xl">SHIPMENT TRACKER</h2>

              <div className="flex space-x-6">
              {session ? (
                <div className="text-lightBlue300 text-sm">
                  Hello, {session.user.username}
                </div>
              ) : null}
                  <button  onClick={handleLogout} className="py-3 px-4 font-mullish rounded-sm text-sm font-bold bg-white text-lightBlue300 border transition-all duration-200 hover:text-lightBlue500 flex">
                    Log out
                    <svg
                      viewBox="0 0 24 24"
                      focusable="false"
                      className="w-[14px] h-[14px] ml-3"
                    >
                      <path
                        fill="currentColor"
                        d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                      ></path>
                    </svg>
                  </button>
              </div>
            </div>
          </nav>
          <div className="flex h-screen">
          <Sidebar />
          <div className="flex">
            {shipmentStatusCounts.map((statusCount) => (
              
                <div className="p-4" key={statusCount.status}>
                  <div className="bg-gray-200 shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      Transit Shipment
                    </h2>
                    <p className="text-gray-600">Total count: {statusCount.intransitcount}</p>
                  </div>
                </div>     ))}

                 {shipmentStatusCounts.map((statusCount) => (
              
                  <div className="p-4" key={statusCount.status}>
                  <div className="bg-gray-200 shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      Delivered Shipment
                    </h2>
                    {/* You should display relevant data here */}
                    <p className="text-gray-600">Total count: {statusCount.deliveredcount}</p>
                  </div>
                </div>))}

                {shipmentStatusCounts.map((statusCount) => (
              
                  <div className="p-4" key={statusCount.status}>
                  <div className="bg-gray-200 shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      Pending Shipment
                    </h2>
                    {/* You should display relevant data here */}
                    <p className="text-gray-600">Total count: {statusCount.pending}</p>
                  </div>
                </div>))}
              </div>
        
          </div>
       
      </div>
    </>
  );
}
