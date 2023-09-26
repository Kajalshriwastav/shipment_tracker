import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Createdriver({ isOpen, onClose }) {

  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehiclenumber, setVehiclenumber] = useState("");
  const [licensenumber, setLicensenumber] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  // const [error, setError] = useState("");


  const handleSubmit = async(e)=>{
    e.preventDefault();

    // if(!username || !email  || !password || !vehiclenumber){
    //   setError("All fields are necessary");
    //   return;
    // }

      try {

      const res = await fetch('api/createdriver',{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          username,email,password,vehiclenumber,licensenumber,contactnumber
        }),
        
      });
      if(res.ok){
        const form = e.target;
        Swal.fire('Driver Registered successfully', '', 'success');
        console.log("Driver Registered successfully.");
        form.reset()
      }else{
        console.log("Driver Registration failed.");
        Swal.fire("There is Some Errore rror");
      }
    } catch (error) {
      console.log("Error during registration: ",error);
      

      
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
              {/* Add your modal content here */}
              <div className="w-full max-w-md mx-auto">
      <form 
       className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex justify-between">
            <div className="w-1/2 mr-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Driver Name
              </label>
              <input onChange={(e) => setName(e.target.value)}
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your name"
              required=""
            />
            </div>

           
            <div className="w-1/2 ml-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
               Driver Email
              </label>
              <input onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required=""
            />
            </div>
          </div>
        </div>

        <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input onChange={(e) => setPassword(e.target.value)}
        type="password"
        name="password"
        id="password"
        placeholder="••••••••"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required=""
      />
      </div>


      <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactnumber">
        Contact Number
      </label>
      <input onChange={(e) => setContactnumber(e.target.value)}
      type="text"
      name="contactnumber"
      id="contactnumber"
      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="contact number"
      required=""
    />
    </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehiclenumber">
            Vehicle Number
          </label>
          <input onChange={(e) => setVehiclenumber(e.target.value)}
          type="text"
          name="vehiclenumber"
          id="vehiclenumber"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="vehicle number"
          required=""
        />
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="licensenumber">
          License Number
        </label>
        <input onChange={(e) => setLicensenumber(e.target.value)}
        type="text"
        name="licensenumber"
        id="licensenumber"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="licensenumber number"
        required=""
      />
      </div>
       
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
            </div>
          </div>
        </div>
      );
    }
    

export default Createdriver
