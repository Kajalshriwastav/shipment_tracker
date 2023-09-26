import React, { useState, useEffect } from "react";

import { faEdit, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Modal from "react-modal";
import Editshipment from './editshipment';

// Modal.setAppElement("#root");

// if (typeof document !== "undefined") {
//   Modal.setAppElement("#root");
// }



function Shipmentstatus({ isOpen, onClose, shipmentdata }) {
  const [assignedDriverId, setAssignedDriverId] = useState("");
  const [isAssigningDriver, setIsAssigningDriver] = useState(false);
  const [isModalStatusOpen, setIsModalStatusOpen] = useState(false);

  const openModalStatus = () => {
    setIsModalStatusOpen(true);
  };

  const closeModalStatus = () => {
    setIsModalStatusOpen(false);
  };
  // const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  // const [editedData, setEditedData] = useState({
  //   customername: "",
  //   destinationaddress: "",
  // });

  // const [selectedShipmentId, setSelectedShipmentId] = useState(null);

  // useEffect(() => {
  //   // Make sure to execute this code only on the client-side
  //   if (typeof document !== "undefined") {
  //     Modal.setAppElement(document.getElementById('root'));
  //   }
  // }, []);

  // const handleEditShipment = (shipmentId) => {
  //   console.log("gfjfhg");
  //   setEditModalIsOpen(true);
  //   setSelectedShipmentId(shipmentId);
  //   const shipmentToUpdate = shipmentdata.find(
  //     (shipment) => shipment.shipmentid === shipmentId
  //   );

  //   if (!shipmentToUpdate) {
  //     alert("Shipment not found.");
  //     return;
  //   }

  //   setEditedData({
  //     customername: shipmentToUpdate.customername,
  //     destinationaddress: shipmentToUpdate.destinationaddress,
  //   });

   
  // };

  // const saveEditedData = async () => {
  //   // Validate the edited data, you can add more validation logic here

  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/api/updateshipment`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           shipmentid: selectedShipmentId,
  //           customername: editedData.customername,
  //           destinationaddress: editedData.destinationaddress,
  //         }),
  //       }
  //     );

  //     if (response.status === 200) {
  //       alert("Shipment updated successfully!");
  //       // Close the edit modal
  //       setEditModalIsOpen(false);
  //     } else {
  //       alert("Failed to update shipment. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error editing shipment:", error);
  //     alert(
  //       "An error occurred while editing the shipment. Please try again later."
  //     );
  //   }
  // };

  // ...
  

  const handleAssignDriver = async (shipmentId) => {
    // Prompt the user to enter the driver ID for assignment
    const driverId = prompt("Enter the Driver ID for assignment:");

    if (driverId !== null) {
      try {
        setIsAssigningDriver(true);

        const shipmentToUpdate = shipmentdata.find(
          (shipment) => shipment.shipmentid === shipmentId
        );

        if (!shipmentToUpdate) {
          alert("Shipment not found.");
          return;
        }

        const response = await fetch(
          `http://localhost:3000/api/assignshipment`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              shipmentid: shipmentToUpdate.shipmentid,
              customername: shipmentToUpdate.customername,
              destinationaddress: shipmentToUpdate.destinationaddress,
              shipmentstatus: shipmentToUpdate.shipmentstatus,
              planneddeliverydate: shipmentToUpdate.planneddeliverydate,
              assigneddriverid: driverId,
            }),
          }
        );

        if (response.status === 200) {
          // Update the assigned driver ID in the local state
          setAssignedDriverId(driverId);
          alert("Driver assigned successfully!");
        } else {
          alert("Failed to assign driver. Please try again.");
        }
      } catch (error) {
        console.error("Error assigning driver:", error);
        alert(
          "An error occurred while assigning the driver. Please try again later."
        );
      } finally {
        setIsAssigningDriver(false);
      }
    }
  };

  // ...

  const handleDeleteShipment = async (shipmentId) => {
    if (window.confirm("Are you sure you want to delete this shipment?")) {
      try {
        const shipmentToUpdate = shipmentdata.find(
          (shipment) => shipment.shipmentid === shipmentId
        );

        const response = await fetch(`/api/deleteshipment`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shipmentid: shipmentToUpdate.shipmentid,
          }),
        });

        if (response.status === 200) {
          console.log("Shipment deleted successfully!");
        } else {
          console.error("Failed to delete shipment.");
        }
      } catch (error) {
        console.error("Error deleting shipment:", error);
      }
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
        <div className="overflow-x-auto overflow-y-auto">
          <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
            SHIPMENT STATUS
          </h1>
      
          <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Shipment ID
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
                    AssignDriver
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {shipmentdata.map((res) => (
                  <tr key={res.shipmentid}>
                    <td>
                    <button
                    className="text-green-500 hover:text-green-700 mr-2"
                    onClick={openModalStatus}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <Editshipment
                  isOpen={isModalStatusOpen} onClose={closeModalStatus}
/>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteShipment(res.shipmentid)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                      {res.shipmentid}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                      {res.customername}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                      {res.destinationaddress}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {res.shipmentstatus}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {res.planneddeliverydate}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {isAssigningDriver &&
                      res.shipmentid === assignedDriverId ? (
                        "Assigning..."
                      ) : (
                        <button
                          className="text-blue-500 hover:text-blue-700 mr-2"
                          onClick={() => handleAssignDriver(res.shipmentid)}
                          disabled={isAssigningDriver}
                        >
                          <FontAwesomeIcon icon={faUserPlus} />
                        </button>
                      )}
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

export default Shipmentstatus;
