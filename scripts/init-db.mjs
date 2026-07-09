import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    link TEXT NOT NULL,
    image_url TEXT NOT NULL DEFAULT '',
    featured BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS content TEXT NOT NULL DEFAULT ''`;

console.log("projects table ready");
