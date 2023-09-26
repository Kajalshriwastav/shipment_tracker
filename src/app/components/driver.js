"use client";

import React, { useState } from "react";
import Link from "next/link";
import Createdriver from "./createdriver";
import Driverstatus from "./driverstatus";
import Driverlist from "./driverlist";
import Sidebar from "./sidebar";
import { useSession, signOut } from "next-auth/react";


// import { useRouter } from "next/router";
// import { clearAuthToken } from "./auth";

function Driver() {
  const { data: session } = useSession();
  // const router = useRouter();

  let [datas,setDatas] = useState([])
  const onGetvalue = async () => {
    try {
      const res = await fetch('/api/driverstatus', {
        method: 'GET',
      });
  
      if (res.ok) {
        const data = await res.json();
        // console.log('Data found:', data);
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

  const onGetListvalue = async () => {
    try {
      const res = await fetch('/api/driverlist', {
        method: 'GET',
      });
  
      if (res.ok) {
        const data = await res.json();
        // console.log('Data found:', data);
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


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalStatusOpen, setIsModalStatusOpen] = useState(false);
  const [isModalListOpen, setIsModalListOpen] = useState(false);


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
  
  const openModalList = () => {
    setIsModalListOpen(true);
  };

  const closeModalList = () => {
    setIsModalListOpen(false);
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
                  <button  onClick={handleLogout} className="py-3 px-4 font-mullish rounded-sm text-sm 
                  font-bold bg-white text-lightBlue300 border transition-all
                   duration-200 hover:text-lightBlue500 flex">
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
            <div className="p-6">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded justify-between"
                onClick={openModal}
              >
                Create Driver
              </button>

              <Createdriver isOpen={isModalOpen} onClose={closeModal} />
            </div>
            
            <div className="p-6">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                 onClick={() => {
                onGetListvalue();
                openModalList();
              }}
            >
              Driver List
            </button>
            <Driverlist isOpen={isModalListOpen}
            onClose={closeModalList}driverdata={datas}/>

          </div>
            <div className="p-6">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                   onClick={() => {
                  onGetvalue();
                  openModalStatus();
                }}
              >
                Driver Status
              </button>

              <Driverstatus
                isOpen={isModalStatusOpen}
                onClose={closeModalStatus}driverdata={datas}
              />
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Driver;
