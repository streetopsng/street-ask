// app/api/admin/survey/route.ts
import pool from "@/db/connect-db";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await pool.connect();

  try {
    // Get total responses count
    const totalResult = await client.query(`
      SELECT COUNT(DISTINCT session_id) as total FROM users
    `);

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

    // Your actual 13 questions
    const questions = [1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 14, 15, 16];
    const analytics: { [key: number]: any[] } = {};

    for (const questionId of questions) {
      // For single answer questions (store as number in JSONB)
      if ([1, 2, 3, 5, 7, 8, 10, 11, 12, 14, 15, 16].includes(questionId)) {
        const result = await client.query(
          `
          SELECT 
            answer_value->>'value' as answer_key,
            COUNT(*) as count,
            ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as percentage
          FROM answers
          WHERE question_id = $1
          GROUP BY answer_value->>'value'
          ORDER BY count DESC
          `,
          [questionId],
        );

        analytics[questionId] = result.rows.map((row) => ({
          answerValue: parseInt(row.answer_key),
          count: parseInt(row.count),
          percentage: parseFloat(row.percentage),
        }));
      }

      // For multiple choice question (id 6)
      else if (questionId === 6) {
        const result = await client.query(
          `
          SELECT 
            answer_value,
            COUNT(*) as count
          FROM answers
          WHERE question_id = $1
          GROUP BY answer_value
          `,
          [questionId],
        );

        // Process multiple choice - count each option separately
        const optionCounts: { [key: number]: number } = {};
        let totalResponsesForQuestion = 0;

        for (const row of result.rows) {
          totalResponsesForQuestion += parseInt(row.count);
          const answerObj = row.answer_value;
          for (const [key, value] of Object.entries(answerObj)) {
            if (value === true) {
              const optionKey = parseInt(key);
              optionCounts[optionKey] =
                (optionCounts[optionKey] || 0) + parseInt(row.count);
            }
          }
        }

        analytics[questionId] = Object.entries(optionCounts).map(
          ([key, count]) => ({
            answerValue: parseInt(key),
            count: count,
            percentage: parseFloat(
              ((count / totalResponsesForQuestion) * 100).toFixed(1),
            ),
          }),
        );
      }
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
