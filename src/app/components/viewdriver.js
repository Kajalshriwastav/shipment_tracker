"use client"


import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { faEdit, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Editdriver from './editdriver';
import { useSession, signOut } from "next-auth/react";


export default function Viewdriver() {
    const [isModalStatusOpen, setIsModalStatusOpen] = useState(false);
    const [driverdata, setDriverData] = useState([]);

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
        fetch('/api/driverstatus')
          .then((response) => response.json())
          .then((data) => {
            let arr = data.data;
            setDriverData(arr);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);

      const { data: session } = useSession(); // Access the session data
    

    const openModalStatus = () => {
      setIsModalStatusOpen(true);
    };
  
    const closeModalStatus = () => {
      setIsModalStatusOpen(false);
    }
  

  return (
    <div>
    <div className="h-screen">
          <nav className="bg-green-300">
            <div className="relative w-[1080px] mx-auto flex items-center justify-between">
              <a href="/" className="cursor-pointer py-7 pr-7"></a>

              <h2 className="text-white text-2xl">SHIPMENT TRACKER</h2>

              <div className="flex space-x-6">
              <h3>Driver Dashboard</h3>
                <Link href={"/login"}>
                  <button  onClick={handleLogout} className="py-3 px-4 font-mullish rounded-sm text-sm font-bold bg-white text-lightBlue300 border transition-all duration-200 hover:text-lightBlue500 flex">
                    Log out
                    <svg
                      viewBox="0 0 24 24"
                      focusable="false"
                      className="w-[14px] h-[14px] ml-4"
                    >
                      <path
                        fill="currentColor"
                        d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                      ></path>
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </nav>
          <div className="mt-4">
         
          <div className="overflow-x-auto max-h-96  overflow-Y-auto max-v-96">
            <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
              DRIVER STATUS
            </h1>

            <table className="min-w-full">
              <thead>
                <tr>
                <th className="px-6 py-3  bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
                  <th className="px-6 py-3  bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Driver ID
                  </th>
                  <th className="px-6 py-3  bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Driver Name
                  </th>
                  <th className="px-6 py-3  bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Driver Email
                  </th>
                  <th className="px-6 py-3  bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle Number
                  </th>
                  <th className="px-6 py-3   bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    License Number
                  </th>

                  <th className="px-6 py-3   bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Contact Number
                  </th>

                  <th className="px-6 py-3   bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Shipment Id
                </th>

                  <th className="px-6 py-3   bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>

                  <th className="px-6 py-3   bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Destination Address
                  </th>

                  <th className="px-6 py-3   bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Shipment Status
                  </th>

                  <th className="px-6 py-3  bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Planned Delivery Date
                  </th>

                  <th className="px-6 py-3  bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Actual Delivery Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {driverdata.map((res) => (
                  <tr key={res.driverid}>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                  <button
                  className="text-green-500 hover:text-green-700 mr-2"
                  onClick={openModalStatus}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <Editdriver
                isOpen={isModalStatusOpen} onClose={closeModalStatus}
/>
                  </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                      {res.driverid}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                      {res.drivername}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                      {res.driveremail}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {res.vehiclenumber}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {res.licensenumber}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {res.contactnumber}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {res.shipmentid}
                  </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {res.customername}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {res.destinationaddress}
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {res.shipmentstatus}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {res.planneddeliverydate}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {res.actualdeliverydate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
          </div>
      

          </div>
  )
}
