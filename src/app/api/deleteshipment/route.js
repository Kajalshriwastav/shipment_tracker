import { NextResponse } from "next/server";
import conn from "../../../lib/db";

export async function DELETE(req, res) {
    const payload = await req.json();

  try {
   
    const query = "DELETE FROM shipments WHERE shipmentid = $1";
    const values = [
        payload.shipmentid
    ];

    const result = await conn.query(query, values);

    console.log("Shipment deleted:", result);

    return NextResponse.json(
      { message: "Shipment deleted Successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while deleting the shipment." },
      { status: 500 }
    );
  }
}
