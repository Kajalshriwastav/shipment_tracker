import React from 'react'
import Shipmentstatus from '../components/shipmentstatus';


function page({ rows }) {
    return (
    <div className="flex justify-center items-center h-screen">
      <Shipmentstatus />
    </div>
    )
};

// export async function getServerSideProps() {
// try {
//   const response = await fetch('/api/shipmentstatus');
//   const rows = await response.json();

//   return {
//     props: { rows },
//   };
// } catch (error) {
//   console.error('Error fetching data:', error);
//   return {
//     props: { rows: [] }, // Return an empty array if an error occurs
//   };
// }
// }
export default page;
