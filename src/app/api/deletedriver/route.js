import { NextResponse } from "next/server";
import conn from "../../../lib/db";

export async function DELETE(req, res) {
    const payload = await req.json();

  try {
   
    const query = "DELETE FROM drivers WHERE driverid = $1";
    const values = [
        payload.driverid
    ];

    const result = await conn.query(query, values);

    console.log("Driver Details deleted:", result);

    return NextResponse.json(
      { message: "Driver Details Successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while deleting the Driver Details." },
      { status: 500 }
    );
  }
}
