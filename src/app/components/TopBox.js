"use client";

import { useSession, signOut } from "next-auth/react";

const TopBox = () => {

  const { data: session } = useSession();

  const handleLogout = async () => {
    const signoutRes = await signOut({ redirect: false, callbackUrl: "/" });

    if (signoutRes.error) {
     
      console.error("Logout error:", signoutRes.error);
    } else {
      window.location.href = signoutRes.url; 
    }
  };
  return (
    <nav className="bg-green-300">
    <div className="relative w-[1080px] mx-auto flex items-center justify-between">
      <a href="/" className="cursor-pointer py-11 pr-11">
     
      </a>

 
      <h2 className="text-black text-4xl">SHIPMENT TRACKER</h2>

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
)
};

export default TopBox;
