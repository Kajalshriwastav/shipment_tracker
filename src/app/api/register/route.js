import { NextResponse } from "next/server";
import conn from "../../../lib/db";
import bcrypt from "bcrypt";
import { hash } from "bcrypt";

// import bcrypt from "bcryptjs";

// export async function POST(req) {
//     try {
//         const {name,email,password,role} = await req.json();
//         console.log("Name:",name);
//         console.log("Email:",email);
//         console.log("Password:",password);
//         console.log("Role:",role);

//         return NextResponse.json({message:"User Registered."},{status: 201});
//     } catch (error) {

//         return NextResponse.json({message:"An error occurred while registering the user."},{status: 500});
//     }

// }

export async function POST(req, res) {
  const payload = await req.json();
  let client; 

  if (payload.role === "driver") {
    try {
      client = await conn.connect();
      await client.query("BEGIN");

      const hashedPassword = await hash(payload.password, 10);
      const userQuery =
        "INSERT INTO Users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING userid";
      const userValues = [
        payload.username,
        payload.email,
        hashedPassword,
        payload.role,
      ];

      const userResult = await client.query(userQuery, userValues);
      const userId = userResult.rows[0].userid;

      const driverQuery =
        "INSERT INTO drivers (driverid, vehiclenumber, licensenumber, contactnumber) VALUES ($1, $2, $3,$4)";
      const driverValues = [
        userId, // Use the generated userid as the driverid
        payload.vehiclenumber,
        payload.licensenumber,
        payload.contactnumber,
      ];

      await client.query(driverQuery, driverValues);

      await client.query("COMMIT");
      client.release();

      return NextResponse.json(
        { message: "Driver Registered Successfully." },
        { status: 201 }
      );
    } catch (error) {
      if (client) {
        await client.query("ROLLBACK");
        client.release();
      }

      console.error(error);
      return NextResponse.json(
        { message: "An error occurred while registering the  driver." },
        { status: 500 }
      );
    }
  }
  if (payload.role === "admin") {
    try {
      const hashedPassword = await hash(payload.password, 10);
      console.log("req npm", req.body);
      const query =
        "INSERT INTO Users (username, email, password, role) VALUES ($1, $2, $3, $4)";
      const values = [
        payload.username,
        payload.email,
        hashedPassword,
        payload.role,
      ];
      const result = await conn.query(query, values);
      return NextResponse.json(
        { message: "User Registered Successfully." },
        { status: 201 }
      );
      console.log("ttt", result);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "An error occurred while registering the user." },
        { status: 500 }
      );
    }
  }
}
