import { NextResponse } from "next/server";
import conn from "../../../lib/db";

export async function POST(req, res) {
  const payload = await req.json();

  try {
    console.log("req npm", req.body);
    const query =
      "INSERT INTO shipments (customername, destinationaddress, shipmentstatus, planneddeliverydate) VALUES ($1, $2, $3, $4)";
    const values = [
      payload.customername,
      payload.destinationaddress,
      payload.shipmentstatus,
      payload.planneddeliverydate,
    ];
    const result = await conn.query(query, values);
    return NextResponse.json(
      { message: "Shipment added Successfully." },
      { status: 201 }
    );
    console.log("ttt", result);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while adding shipment." },
      { status: 500 }
    );
  }
}
