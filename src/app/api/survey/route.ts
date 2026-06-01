import { NextResponse } from "next/server";

import pool from "@/db/connect-db";
// import { Pool } from "pg";

export const GET = async () => {
  try {
    // --- Table model definitions (CREATE IF NOT EXISTS - safe to run) ---

    await pool.query(`CREATE TABLE IF NOT EXISTS answers (
      id SERIAL PRIMARY KEY,
      session_id VARCHAR(255) NOT NULL,
      question_id INTEGER NOT NULL,
      answer_value JSONB NOT NULL,
      answer_type VARCHAR(50) NOT NULL,
      create_at TIMESTAMP DEFAULT NOW() NOT NULL
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      session_id VARCHAR(255) NOT NULL,
      industry VARCHAR(100),
      company_size VARCHAR(50),
      role_level VARCHAR(100),
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS user_emails (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL
    )`);

    // --- Get total distinct session count ---
    const response = await pool.query(`
      SELECT COUNT(DISTINCT session_id) FROM answers
    `);

    return NextResponse.json(
      {
        success: true,
        message: "success",
        data: response.rows[0],
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "an error occured" },
      { status: 500 },
    );
  }
};
