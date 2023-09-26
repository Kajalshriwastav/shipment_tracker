"use client";

import NextAuth from "next-auth";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import background from "../../../public/bg.png";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Login() {
  const router = useRouter();

  // const value = sessionStorage.getItem('data');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const data = useSession();

  const handleSubmit = async (e) => {
    const credentials = { email, password };
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
      });

      if (res.ok) {
        // const userRole = res.userRole;
        const form = e.target;
        console.log(data.data.user);
        console.log(data.data.user.role);

        Swal.fire("User Login successfully", "", "success");

        if (data.data.user.role === "admin") {
          console.log("User is an admin");
          Swal.fire("User Login successfully", "", "success");
          router.push("/dashboard");
        } else if (data.data.user.role === "driver") {
          console.log("User is a driver");
          Swal.fire("User Login successfully as a driver", "", "success");
          router.push("/viewdriver");
        } else {
          console.log("Data not found.");
          Swal.fire("There is Some Error");
        }
      } else {
        console.log("Data not found.");
        Swal.fire("There is Some Error");
      }
    } catch (error) {
      console.log("Error during Executing: ", error);
    }
  };

  //   const handleSubmit = async(e)=>{

  //     try {

  //     const res = await fetch('api/login',{
  //       method:"POST",
  //       headers:{
  //         "Content-Type": "application/json"
  //       },
  //       body:JSON.stringify({
  //         email,password
  //       }),

  //     });
  //     if(res.ok){
  //       const form = e.target;
  //       console.log("Data found.");
  //       Swal.fire('User Login successfully', '', 'success');
  //       if (res.status ==201) {
  //       router.push('/dashboard');
  //       }else if(res.status ==202){
  //         router.push('/viewdriver');
  //       }
  //       // form.reset()
  //     }else{
  //       console.log("Data not found.");
  //       Swal.fire("There is Some Errore rror");
  //     }
  //   } catch (error) {
  //     console.log("Error during Executing: ",error);

  //   }

  // };

  return (
    <section className="h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src="/om-logistics.png" alt="logo" />
          SHIPMENT TRACKER
        </a>
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
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
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link href={"/forgot"} legacyBehavior>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </a>
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link href={"/signup"} legacyBehavior>
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
