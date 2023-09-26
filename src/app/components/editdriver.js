import React, { useState } from 'react';
import Swal from 'sweetalert2';

function EditDriver({ isOpen, onClose }) {
  const [shipmentid, setShipmentid] = useState("");
  const [shipmentstatus, setShipmentstatus] = useState("");
  const [actualdeliverydate, setActualDeliverydate] = useState("");

  const handleEditShipment = async () => {
    try {
      const res = await fetch('/api/editshipment', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          shipmentid,
          shipmentstatus,
          actualdeliverydate
        }),
      });

      if (res.ok) {
        
        console.log("Shipment updated successfully");
        Swal.fire('Shipment updated successfully', '', 'success');

      } else {
  
        console.log("Shipment update failed.");
      }
    } catch (error) {
      console.log("Error during shipment update: ", error);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-70"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-50">
        <div className="flex justify-end">
          <button className="text-gray-500 hover:text-red-500" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
                UPDATE DRIVER STATUS
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div className="mb-4">
                  <div className="flex justify-between">
                    <div className="w-1/2 mr-2">
                      <label
                        htmlFor="shipmentid"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Shipment Id
                      </label>
                      <input
                        onChange={(e) => setShipmentid(e.target.value)}
                        type="text"
                        name="shipmentid"
                        id="shipmentid"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Shipment Id"
                        required=""
                      />
                    </div>
                    <div className="w-1/2 mr-2">
                      <label
                        htmlFor="shipmentstatus"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Shipment Status
                      </label>
                      <input
                        onChange={(e) => setShipmentstatus(e.target.value)}
                        type="text"
                        name="shipmentstatus"
                        id="shipmentstatus"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Shipment Status"
                        required=""
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="actualdeliverydate"
                    >
                      Actual Delivery Date
                    </label>
                    <input
                      onChange={(e) => setActualDeliverydate(e.target.value)}
                      type="date"
                      name="actualdeliverydate"
                      id="actualdeliverydate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Actual Delivery Date"
                      required=""
                    />
                  </div>
                </div>
                <button
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={() => handleEditShipment()}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDriver;
