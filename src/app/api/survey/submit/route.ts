import pool from "@/db/connect-db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  // creatin connection for the pool

  const { surveyAnswers, email, organizationInfo } = await req.json();

  const client = await pool.connect();
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  try {
    await client.query("BEGIN");
    //   now add users details

    await client.query(
      `
    INSERT INTO users(session_id,industry,company_size,role_level,email)
    VALUES ($1,$2,$3,$4,$5)
    `,
      [
        sessionId,
        organizationInfo.industry,
        organizationInfo.companySize,
        organizationInfo.roleLevel,
        email,
      ],
    );

    // add users
    for (const [questionId, answerValue] of Object.entries(surveyAnswers)) {
      let jsonValue;

      if (typeof answerValue === "object" && answerValue !== null) {
        // It's already an object (like multiple choice selections)
        jsonValue = JSON.stringify(answerValue);
      } else if (typeof answerValue === "string") {
        // It's a text answer - wrap in object with text field
        jsonValue = JSON.stringify({ text: answerValue });
      } else if (typeof answerValue === "number") {
        // It's a single choice or scale answer - wrap in object with value field
        jsonValue = JSON.stringify({ value: answerValue });
      } else {
        // Fallback
        jsonValue = JSON.stringify({ value: answerValue });
      }

      await client.query(
        `
    INSERT INTO answers (session_id,question_id,answer_value)
    VALUES ($1,$2,$3::jsonb)
    `,
        [sessionId, parseInt(questionId), jsonValue],
      );
    }

    await client.query("COMMIT");

    return NextResponse.json(
      { success: true, message: "successfully added" },
      { status: 201 },
    );
  } catch (error) {
    client.query("ROLLBACK");
    console.log(error);

    return NextResponse.json(
      { success: false, message: "an error occured" },
      { status: 500 },
    );
  } finally {
    client.release();
  }
};
