import { NextResponse } from "next/server";
import conn from "../../../lib/db";


export async function PUT(req, res) {
    const payload = await req.json();
  
    try {
      const query =
        "UPDATE shipments SET customername = $1, destinationaddress = $2, shipmentstatus = $3, planneddeliverydate = $4, assigneddriverid = $5 WHERE shipmentid = $6";
      const values = [
        payload.customername,
        payload.destinationaddress,
        payload.shipmentstatus,
        payload.planneddeliverydate,
        payload.assigneddriverid,
        payload.shipmentid, // Assuming you have the shipmentid to identify the shipment to update
      ];

      const result = await conn.query(query, values);
  
      console.log("ttt", result);
  
      return NextResponse.json(
        { message: "Shipment updated Successfully." },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "An error occurred while updating shipment." },
        { status: 500 }
      );
    }
  }
  