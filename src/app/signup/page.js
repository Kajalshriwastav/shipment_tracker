/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useState } from 'react'
import Link from "next/link";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';


export default function signup() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehiclenumber, setVehiclenumber] = useState("");
  const [licensenumber, setLicensenumber] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [role, setRole] = useState("admin"); // Default to admin
  const [error, setError] = useState("");



  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(!username || !email  || !password || !role){
      setError("All fields are necessary");
      return;
    }
    if (role === 'driver') {
      try {

      const res = await fetch('api/register',{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          username,email,password,role,vehiclenumber,licensenumber,contactnumber
        }),
        
      });
      if(res.ok){
        const form = e.target;
        console.log("Driver register successfully.");
        
        Swal.fire('Driver Registered successfully', '', 'success');
        form.reset()
      }else{
        console.log("Driver registration failed.");
        Swal.fire("There is Some Errore rror");
      }
    } catch (error) {
      console.log("Error during registration: ",error);

      
    }
    
  }
  if (role === 'admin') {
    try {

      const res = await fetch('api/register',{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          username,email,password,role
        }),
        
      });
      if(res.ok){
        const form = e.target;
        console.log("User register successfully.");
        
        Swal.fire('User Registered successfully', '', 'success');
        form.reset()
      }else{
        console.log("User registration failed.");
        Swal.fire("There is Some Errore rror");
      }
    } catch (error) {
      console.log("Error during registration: ",error);

      
    }
  }

  };


  return (
    <section className="h-screen">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a
      href="#"
      className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    >
    <img
    className="w-8 h-8 mr-2"
    src="/om-logistics.png"
    alt="logo"
  />
  SHIPMENT TRACKER
    </a>
      <div
        className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">

        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="w-full"
            alt="Phone image" />
        </div>
  

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
              register to your account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
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
              <div>
              <label
              htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
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
              <div>
                <label
                htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
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

              <div>
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Role
              </label>
              <select
                onChange={(e) => setRole(e.target.value)}
                value={role}
                name="role"
                id="role"
                placeholder="role"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              >
                <option value="admin">Admin</option>
                <option value="driver">Driver</option>
              </select>
            </div>
        
            {role === 'driver' && (
              <>
              <div>
              <label
                htmlFor="vehiclenumber" 
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
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

            
            <div>
            <label
              htmlFor="licensenumber" 
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
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
          
          <div>
          <label
            htmlFor="contactnumber" 
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
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
        </>
        )}

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Register
              </button>
              {error && (
                <div className='bg-red-500 text-white W-fit
                text-sm py-1 px-3 rounded-md mt-2'>{error}
                </div>
              )}

        
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link href={'/login'}legacyBehavior><a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Log in
                </a></Link>
              </p>
            </form>
          </div>
        </div>
      </div>


    
    </div>
  </section>
  )
}
