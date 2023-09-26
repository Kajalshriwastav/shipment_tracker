
import { NextResponse } from "next/server";
import conn from "../../../lib/db";

export async function GET() {

    try {
      const query = "SELECT SUM(CASE WHEN shipmentstatus = 'delivered' THEN 1 ELSE 0 END)  DeliveredCount,SUM(CASE WHEN shipmentstatus = 'in transit' THEN 1 ELSE 0 END)  InTransitCount, SUM(CASE WHEN shipmentstatus = 'pending' THEN 1 ELSE 0 END) Pending FROM shipments;"
  
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
  