import pool from "@/db/connect-db";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await pool.connect();

  try {
    // Get ALL questions percentages in ONE query
    // This query calculates percentage for every answer option across all questions
    const result = await client.query(`
      SELECT 
        question_id,
        answer_value,
        COUNT(*) as count,
        ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY question_id), 1) as percentage
      FROM answers
      GROUP BY question_id, answer_value
      ORDER BY question_id, count DESC
    `);

    // Organize data by question
    const analytics: { [key: number]: any[] } = {};
    for (const row of result.rows) {
      if (!analytics[row.question_id]) {
        analytics[row.question_id] = [];
      }
      analytics[row.question_id].push({
        answerValue: row.answer_value,
        count: parseInt(row.count),
        percentage: parseFloat(row.percentage),
      });
    }

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
