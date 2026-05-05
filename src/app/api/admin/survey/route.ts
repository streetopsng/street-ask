// app/api/admin/survey/route.ts
import pool from "@/db/connect-db";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await pool.connect();

  try {
    // Get total responses count from pay_check-answers
    const totalResult = await client.query(`
      SELECT COUNT(DISTINCT session_id) as total FROM "pay_check-answers"
    `);

    console.log("Total responses:", totalResult.rows[0]?.total);

    // Check if pay_check-answers table has data
    const answersCount = await client.query(`
      SELECT COUNT(*) as total FROM "pay_check-answers"
    `);
    console.log(
      "Total answers in pay_check-answers:",
      answersCount.rows[0]?.total,
    );

    // Get demographics
    const demographics = await client.query(`
      SELECT 
        'industry' as type, 
        industry as name, 
        COUNT(*) as count,
        ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as percentage
      FROM pay_check_users 
      WHERE industry IS NOT NULL AND industry != ''
      GROUP BY industry
      UNION ALL
      SELECT 
        'company_size' as type, 
        company_size as name, 
        COUNT(*) as count,
        ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as percentage
      FROM pay_check_users 
      WHERE company_size IS NOT NULL AND company_size != ''
      GROUP BY company_size
      UNION ALL
      SELECT 
        'role_level' as type, 
        role_level as name, 
        COUNT(*) as count,
        ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as percentage
      FROM pay_check_users 
      WHERE role_level IS NOT NULL AND role_level != ''
      GROUP BY role_level
    `);

    console.log("Demographics rows:", demographics.rows);

    // All questions: 15 single-answer + 8 text questions
    const multipleChoiceQuestions = Array.from(
      { length: 15 },
      (_, index) => index + 1,
    );
    const textQuestions = Array.from({ length: 8 }, (_, index) => index + 16);
    const analytics: { [key: number]: any[] } = {};
    const textResponses: { [key: number]: any[] } = {};

    // Check raw data
    const rawData = await client.query(`
      SELECT question_id, answer_type, answer_value FROM "pay_check-answers" LIMIT 10
    `);
    console.log("Sample raw data from pay_check-answers:", rawData.rows);

    // Handle multiple choice questions
    for (const questionId of multipleChoiceQuestions) {
      const result = await client.query(
        `
          SELECT 
            answer_value->>'value' as answer_key,
            COUNT(*) as count,
            ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as percentage
          FROM "pay_check-answers"
          WHERE question_id = $1 AND answer_type = 'single_answer'
          GROUP BY answer_value->>'value'
          ORDER BY CAST(answer_value->>'value' AS INTEGER)
          `,
        [questionId],
      );

      console.log(`Question ${questionId} results:`, result.rows);
      analytics[questionId] = result.rows.map((row) => ({
        answerValue: parseInt(row.answer_key),
        count: parseInt(row.count),
        percentage: parseFloat(row.percentage),
      }));
    }

    // Handle text questions - get all responses
    for (const questionId of textQuestions) {
      const result = await client.query(
        `
          SELECT 
            answer_value->>'text' as text_response,
            create_at as submitted_at
          FROM "pay_check-answers"
          WHERE question_id = $1 AND answer_type = 'single_answer'
          ORDER BY create_at DESC
          `,
        [questionId],
      );

      textResponses[questionId] = result.rows.map((row) => ({
        text: row.text_response,
        submittedAt: row.submitted_at,
      }));
    }

    return NextResponse.json({
      success: true,
      data: {
        analytics,
        textResponses,
        totalResponses: parseInt(totalResult.rows[0]?.total || 0),
        demographics: demographics.rows,
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
