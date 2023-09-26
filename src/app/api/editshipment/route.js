import { NextResponse } from "next/server";
import conn from "../../../lib/db";

export async function PUT(req, res) {
  
    const payload = await req.json();
  
    try {
      const query =
        "UPDATE shipments SET shipmentstatus = $1, actualdeliverydate = $2 WHERE shipmentid = $3";
      const values = [
        payload.shipmentstatus,
        payload.actualdeliverydate,
        payload.shipmentid
      ];
  
      const result = await conn.query(query, values);
  
      console.log("Shipment updated:", result);
  
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
  