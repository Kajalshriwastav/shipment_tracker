"use client";
// import Image from "next/image";
import React, { useEffect } from 'react';
// import styles from "../page.module.css";
// import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import './navbar.css'
import $ from 'jquery';
// import LoginPage from "../login/page";
import {usePathname} from 'next/navigation'
// import Driver from "../driver/page";
import Login from "../login/page";

export default function Navbar() {
    const path  = usePathname();
    const arr = path
    const ToggleMenu = () => {
        useEffect(() => {
          // Place your jQuery code here
          $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClassName("toggled");
          });
        }, []);
      
        return null; // Since this component only handles side effects, it doesn't render anything
      };
    return (
        <>
        <body>


<div id="wrapper" className="toggled">

    <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
            <li className="sidebar-brand">
                <a href="#">
                    SHIPMENT TRACKER
                </a>
            </li>
            <li>
                <a href="#">Dashboard</a>
            </li>
            <li>
                <a href="#">Driver</a>
            </li>
            <li>
                <a href="#">Shipment Assign</a>
            </li>
            <li>
                <a href="#">Shipment Track</a>
            </li>
            <li>
                <a href="#">Add</a>
            </li>
            <li>
                <a href="#">Services</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </ul>
    </div>
    {(() => {
      if (path == '/login'){
          return (
           <Login></Login>
          )
      } 
      else{
  
      }
      
      return null;
    })()}
    {
        // path == "/login" ? <LoginPage></LoginPage> :null
    }
    {
        // path == "/driver" ? <Driver></Driver> :null
    }
    {/* <div id="page-content-wrapper">
        <div class="container-fluid">
            <h1>Simple Sidebar</h1>
            <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will appear/disappear. On small screens, the page content will be pushed off canvas.</p>
            <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>.</p>
            <a href="#menu-toggle" class="btn btn-secondary" id="menu-toggle">Toggle Menu</a>
        </div>
    </div> */}

</div>

{/* <script>
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
</script> */}


</body>
        </>


    )
}
