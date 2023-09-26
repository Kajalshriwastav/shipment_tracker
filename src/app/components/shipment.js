"use client"

import React, { useState } from 'react';
import Createshipment from './createshipment';
import Shipmentstatus from './shipmentstatus';
import Sidebar from "./sidebar";
import { useSession, signOut } from "next-auth/react";


function Shipment() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    const signoutRes = await signOut({ redirect: false, callbackUrl: "/" });

    if (signoutRes.error) {
     
      console.error("Logout error:", signoutRes.error);
    } else {
      window.location.href = signoutRes.url; 
    }
  };
  
let [datas,setDatas] = useState([])
  const onGetvalue = async () => {
    try {
      const res = await fetch('/api/shipmentstatus', {
        method: 'GET',
      });
  
      if (res.ok) {
        const data = await res.json();
       
        datas = data.data;
        setDatas(datas)
        console.log(datas,"datat");
      } else {
        console.log('Data not found.');
      }
    } catch (error) {
      console.error('Error during execution:', error);
    }
  };
  
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isModalStatusOpen, setIsModalStatusOpen] = useState(false);


    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const openModalStatus = () => {
        setIsModalStatusOpen(true);
      };
    
      const closeModalStatus = () => {
        setIsModalStatusOpen(false);
      };
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
           
                  <button onClick={handleLogout} className="py-3 px-4 font-mullish rounded-sm text-sm font-bold bg-white text-lightBlue300 border transition-all duration-200 hover:text-lightBlue500 flex">
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
          <div className="p-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={openModal}
          >
            Create Shipment
          </button>
  

          <Createshipment isOpen={isModalOpen} onClose={closeModal} />
          
        </div>

        <div className="p-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            onGetvalue();
            openModalStatus();
          }}
        >
         Shipment Status
        </button>

<Shipmentstatus isOpen={isModalStatusOpen} onClose={closeModalStatus} shipmentdata={datas}/>
        
        
      </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shipment;
