import pool from "@/db/connect-db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const client = await pool.connect();

  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 },
      );
    }

    // Check if email already exists
    const checkResult = await client.query(
      `SELECT id FROM user_emails WHERE email = $1`,
      [email],
    );

    if (checkResult.rows.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Email already subscribed",
        alreadyExists: true,
      });
    }

    // Insert new email
    await client.query(`INSERT INTO user_emails (email) VALUES ($1)`, [email]);

    return NextResponse.json({
      success: true,
      message: "Email subscribed successfully",
    });
  } catch (error) {
    console.error("Email submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save email" },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
