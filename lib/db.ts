import "server-only";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export const sql = neon(process.env.DATABASE_URL);

export type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  content: string;
  link: string;
  image_url: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
};
