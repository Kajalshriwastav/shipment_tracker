import React, { useState } from "react";
import Swal from 'sweetalert2';


function Createshipment({ isOpen, onClose }) {
  const [customername, setCustomername] = useState("");
  const [destinationaddress, setShipmentdestination] = useState("");
  const [shipmentstatus, setShipmentstatus] = useState("");
  const [planneddeliverydate, setplannedDeliverydate] = useState("");
  const [error, setError] = useState("");

  // const [formData, setFormData] = useState({
  //   customername: '',
  //   destinationaddress: '',
  //   shipmentstatus: '',
  //   planneddeliverydate: '',
  //   });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !customername ||
      !destinationaddress ||
      !shipmentstatus ||
      !planneddeliverydate
    ) {
      setError("All fields are necessary");
      return;
    }

    try {
      const res = await fetch("api/createshipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customername,
          destinationaddress,
          shipmentstatus,
          planneddeliverydate,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        console.log("Shipment added successfully");
        Swal.fire('Shipment added successfully', '', 'success');
      } else {
        console.log("Shipment adding failed.");
      }
    } catch (error) {
      console.log("Error during shipment adding: ", error);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-70"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-50">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={onClose}
          >
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
                ADD SHIPMENT
              </h1>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div className="mb-4">
                  <div className="flex justify-between">
                    <div className="w-1/2 mr-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="customername"
                      >
                        Customer name
                      </label>
                      <input
                        onChange={(e) => setCustomername(e.target.value)}
                        type="text"
                        name="customername"
                        id="customername"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Customer name"
                        required=""
                      />
                    </div>
                    <div className="w-1/2 mr-2">
                      <label
                        htmlFor="destinationaddress"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Shipment Destination
                      </label>
                      <input
                        onChange={(e) => setShipmentdestination(e.target.value)}
                        type="destinationaddress"
                        name="text"
                        id="destinationaddress"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="shipment address"
                        required=""
                      />
                    </div>
                  </div>
                </div>
                <div>
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
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <div>
                  <label
                    htmlFor="planneddeliverydate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Planned Delivery Date
                  </label>
                  <input
                    onChange={(e) => setplannedDeliverydate(e.target.value)}
                    type="date"
                    name="planneddeliverydate"
                    id="planneddeliverydate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Date"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  ADD
                </button>
                {error && (
                  <div
                    className="bg-red-500 text-white W-fit
                    text-sm py-1 px-3 rounded-md mt-2"
                  >
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createshipment;
