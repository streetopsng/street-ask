// app/api/admin/survey/route.ts
import pool from "@/db/connect-db";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await pool.connect();

  try {
    // Get total responses count from answers
    const totalResult = await client.query(`
      SELECT COUNT(DISTINCT session_id) as total FROM "answers"
    `);

    console.log("Total responses:", totalResult.rows[0]?.total);

    // Check if answers table has data
    const answersCount = await client.query(`
      SELECT COUNT(*) as total FROM "answers"
    `);
    console.log(
      "Total answers in answers:",
      answersCount.rows[0]?.total,
    );

    // Get demographics
    const demographics = await client.query(`
      SELECT 
        'industry' as type, 
        industry as name, 
        COUNT(*) as count,
        ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as percentage
      FROM users 
      WHERE industry IS NOT NULL AND industry != ''
      GROUP BY industry
      UNION ALL
      SELECT 
        'company_size' as type, 
        company_size as name, 
        COUNT(*) as count,
        ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as percentage
      FROM users 
      WHERE company_size IS NOT NULL AND company_size != ''
      GROUP BY company_size
      UNION ALL
      SELECT 
        'role_level' as type, 
        role_level as name, 
        COUNT(*) as count,
        ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as percentage
      FROM users 
      WHERE role_level IS NOT NULL AND role_level != ''
      GROUP BY role_level
    `);

    console.log("Demographics rows:", demographics.rows);

    // All 20 multiple choice questions
    const multipleChoiceQuestions = Array.from(
      { length: 20 },
      (_, index) => index + 1,
    );
    const analytics: { [key: number]: any[] } = {};

    // Check raw data
    const rawData = await client.query(`
      SELECT question_id, answer_type, answer_value FROM "answers" LIMIT 10
    `);
    console.log("Sample raw data from answers:", rawData.rows);

    // Handle multiple choice questions
    for (const questionId of multipleChoiceQuestions) {
      const result = await client.query(
        `
          SELECT 
            answer_value->>'value' as answer_key,
            COUNT(*) as count,
            ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as percentage
          FROM "answers"
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

    return NextResponse.json({
      success: true,
      data: {
        analytics,
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
