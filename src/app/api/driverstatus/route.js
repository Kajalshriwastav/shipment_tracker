import { NextResponse } from "next/server";
import conn from "../../../lib/db";

// export async function GET(req, res) {
//  // Assuming you want to retrieve data based on the username
  
//     try {
//       // Perform a SELECT query to retrieve user and driver data based on the username
//       const query =
//         "SELECT drivers.driverid,Users.username drivername, Users.email driveremail, drivers.vehiclenumber, drivers.licensenumber, drivers.contactnumber FROM Users JOIN drivers ON Users.userid = drivers.driverid";
      
  
//       const result = await conn.query(query, values);
  
//       if (result.rows.length === 0) {
//         return NextResponse.json(
//           { message: "User not found." },
//           { status: 404 }
//         );
//       }
  
//       const userData = result.rows[0]; // Assuming there's only one matching user
  
//       return NextResponse.json(
//         { userData },
//         { status: 200 }
//       );
//     } catch (error) {
//       console.error(error);
//       return NextResponse.json(
//         { message: "An error occurred while retrieving user and driver data." },
//         { status: 500 }
//       );
//     }
//   }

  export async function GET() {

    try {
      const query = "SELECT drivers.driverid, Users.username drivername, Users.email driveremail,drivers.vehiclenumber,drivers.licensenumber,drivers.contactnumber,shipments.shipmentid,shipments.customername, shipments.destinationaddress,shipments.shipmentstatus, shipments.planneddeliverydate, shipments.actualdeliverydate FROM Users JOIN drivers ON Users.userid = drivers.driverid JOIN shipments ON drivers.driverid = shipments.assigneddriverid;";
  
      const { rows } = await conn.query(query);
  
      if (rows.length > 0) {
        return NextResponse.json(
          { message: "Driver Status found.",data:rows, success: true },
          { status: 201 }
        );
      }
      else {
          return NextResponse.json(
            { message: "Data not found.", super: false },
            { status: 404 }
          );
        }
  
    } catch (error) {
      console.error("An error occurred while executing query:", error);
      return NextResponse.json(
        { message: "Database error.", success: false },
        { status: 500 }
      );
    }
  }
  