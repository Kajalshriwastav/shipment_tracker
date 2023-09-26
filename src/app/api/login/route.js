import { NextResponse } from "next/server";
import conn from "../../../lib/db";

export async function POST(req, res) {
  const payload = await req.json();

  try {
    const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
    const values = [payload.email, payload.password];
    const arr = await conn.query(query, values);

    if (arr.rows.length > 0) {
      const userRole = arr.rows[0].role;

      if (userRole === 'admin') {
        console.log("User is an admin");
        return NextResponse.json(
          { message: "User Login Successfully.", success: true },
          { status: 201 } // Use an object with a "status" property
        );
      } else if (userRole === 'driver') {
        console.log("User is a driver");
        return NextResponse.json(
          { message: "User Login Successfully.", success: true },
          { status: 202 } // Use an object with a "status" property
        );
      }
    } else {
      return NextResponse.json(
        { message: "Data not found.", success: false },
        404 // Set the status code here
      );
    }
  } catch (error) {
    console.error("An error occurred while executing query:", error);
    return NextResponse.json(
      { message: "Database error.", success: false },
      { status: 500 } // Use an object with a "status" property
    );
  }
}
