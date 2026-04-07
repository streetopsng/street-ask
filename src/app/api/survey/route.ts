import pool from "@/db/connect-db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const client = await pool.connect();

    const response = await client.query(`
            SELECT COUNT(DISTINCT session_id) FROM answers 
            `);
    console.log(response.rows.length, "total lenght");

    return NextResponse.json(
      {
        success: true,
        message: "success",
        data: response.rows[0],
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "an error occured" },
      { status: 500 },
    );
  }
};
