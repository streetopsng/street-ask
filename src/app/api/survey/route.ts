import { NextResponse } from "next/server";

import pool from "@/db/connect-db";
// import { Pool } from "pg";

export const GET = async () => {
  // console.log(process.env.DATABASE_URL, "url for db");
  try {
    // await pool.query(`CREATE TABLE IF NOT EXISTS "pay_check-answers" (
    // id SERIAL PRIMARY KEY,
    // session_id VARCHAR(255) NOT NULL,
    // question_id INTEGER NOT NULL,
    // answer_value JSONB NOT NULL,
    //   answer_type VARCHAR(50) NOT NULL,
    //   create_at TIMESTAMP DEFAULT NOW() NOT NULL
    // )`);
    // console.log("success");
    // return NextResponse.json({ success: true });

    // await pool.query(`CREATE TABLE IF NOT EXISTS pay_check_users (
    //   id SERIAL PRIMARY KEY,
    //   email TEXT NOT NULL,
    //   session_id VARCHAR(255) NOT NULL,
    //    industry VARCHAR(100),
    //     company_size VARCHAR(50),
    //     role_level VARCHAR(100),
    //   created_at TIMESTAMP DEFAULT NOW() NOT NULL
    // )`);

    //   await pool.query(`CREATE TABLE IF NOT EXISTS pay_check_user_emails (
    //   id SERIAL PRIMARY KEY,
    //   email TEXT NOT NULL
    // )`);
    //   return NextResponse.json({ success: true });
    // await pool.query(`TRUNCATE TABLE "pay_check-answers", pay_check_users RESTART IDENTITY CASCADE`);

    const response = await pool.query(`
            SELECT COUNT(DISTINCT session_id) FROM "pay_check-answers"
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
    console.log(error);

    return NextResponse.json(
      { success: false, message: "an error occured" },
      { status: 500 },
    );
  }
};

// export const GET = async () => {
//   const client = await pool.connect();

//   try {
//     const res = await client.query("SELECT NOW()");
//     await client.query(`CREATE TABLE IF NOT EXISTS "pay_check-answers" (
//     id SERIAL PRIMARY KEY,
//     session_id VARCHAR(255) NOT NULL,
//     question_id INTEGER NOT NULL,
//     answer_value JSONB NOT NULL,
//       answer_type VARCHAR(50) NOT NULL,
//       create_at TIMESTAMP DEFAULT NOW() NOT NULL
//     )`);

//     return Response.json({
//       success: true,
//       time: res.rows[0],
//     });
//   } catch (error) {
//     console.log("DB connection failed:", error);

//     return Response.json({ success: false, error }, { status: 500 });
//   } finally {
//     client.release();
//   }
// };
