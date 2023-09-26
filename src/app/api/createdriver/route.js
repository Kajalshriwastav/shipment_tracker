import { NextResponse } from "next/server";
import conn from "../../../lib/db";
import bcrypt from "bcrypt";
import { hash } from "bcrypt";

export async function POST(req, res) {
  const payload = await req.json();
  let client;

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
      userId,
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
