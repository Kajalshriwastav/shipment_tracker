import React, { useState } from 'react';
import { faEdit, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Editdriver from './editdriver';
import Swal from 'sweetalert2';


function Driverstatus({ isOpen, onClose, driverdata }) {
  const [isModalStatusOpen, setIsModalStatusOpen] = useState(false);

  const openModalStatus = () => {
    setIsModalStatusOpen(true);
  };

  const closeModalStatus = () => {
    setIsModalStatusOpen(false);
  }

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
         
          <div className="overflow-x-auto max-h-96  overflow-Y-auto max-v-96">
            <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
              DRIVER STATUS
            </h1>

            <table className="min-w-full">
              <thead>
                <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Driver ID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Driver Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Driver Email
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle Number
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    License Number
                  </th>

                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Contact Number
                  </th>

                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Shipment Id
                </th>

                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>

                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Destination Address
                  </th>

                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Shipment Status
                  </th>

                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Planned Delivery Date
                  </th>

                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
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
  );
}

export default Driverstatus;
