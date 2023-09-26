
import Link from 'next/link';
import { FaHome, FaUser } from 'react-icons/fa'; // Import icons

const Sidebar = () => {
  return (
    <>
    <aside className="bg-green-300 text-black h-screen w-1/6 p-4 ">
  
      <div className="flex items-center   mb-4 mt-9">
        {/* <img
          src="/logo.svg" // Replace with the path to your logo image
          alt="Logo"
          className="w-8 h-8 mr-2" // Adjust the size and margin as needed
        /> */}
        <h1 className="text-xl font-semibold mx-5">Admin Dashboard</h1>
      </div>

          <ul>
        <li>
          <Link href="/home">
            <p className="flex items-center py-2 px-4 hover:bg-gray-600">
              <FaHome className="mr-2" /> 
              Home
            </p>
          </Link>
        </li>
        <li>
          <Link href="/driver">
            <p className="flex items-center py-2 px-4 hover:bg-gray-600">
              <FaUser className="mr-2" /> 
              Driver Management
            </p>
          </Link>
        </li>
        <li>
          <Link href="/shipment">
            <p className="flex items-center py-2 px-4 hover:bg-gray-600">
              <FaUser className="mr-2" /> 
              Shipment Management
            </p>
          </Link>
        </li>
      </ul>
    </aside>
    <div className="flex-grow">
        <img
          src="/shipment.png" // Replace with the path to your shipment tracker image
          alt="Shipment Tracker"
          className="w-hal h-half object-cover"
        />
      </div>

      </>
    
  );
};

export default Sidebar;

