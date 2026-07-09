import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { isAdminRequest } from "@/lib/require-admin";
import { validateProjectInput } from "@/lib/project-validation";

export async function GET() {
  const rows = await sql`
    SELECT id, title, category, description, content, link, image_url, featured, sort_order, created_at
    FROM projects
    ORDER BY sort_order ASC, created_at DESC
  `;
  return NextResponse.json({ projects: rows });
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const result = validateProjectInput(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const {
    title,
    category,
    description,
    content,
    link,
    image_url,
    featured,
    sort_order,
  } = result.data;

  const rows = await sql`
    INSERT INTO projects (title, category, description, content, link, image_url, featured, sort_order)
    VALUES (${title}, ${category}, ${description}, ${content}, ${link}, ${image_url}, ${featured}, ${sort_order})
    RETURNING id, title, category, description, content, link, image_url, featured, sort_order, created_at
  `;

  return NextResponse.json({ project: rows[0] }, { status: 201 });
}
