export type ProjectInput = {
  title: string;
  category: string;
  description: string;
  content: string;
  link: string;
  image_url: string;
  featured: boolean;
  sort_order: number;
};

function isSafeUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateProjectInput(
  body: unknown,
): { ok: true; data: ProjectInput } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body" };
  }
  const b = body as Record<string, unknown>;

  const title = typeof b.title === "string" ? b.title.trim().slice(0, 200) : "";
  if (!title) return { ok: false, error: "Title is required" };

  const link = typeof b.link === "string" ? b.link.trim().slice(0, 500) : "";
  if (!link || !isSafeUrl(link)) {
    return { ok: false, error: "Link must be a valid http(s) URL" };
  }

  const category =
    typeof b.category === "string" ? b.category.trim().slice(0, 100) : "";

  const description =
    typeof b.description === "string"
      ? b.description.trim().slice(0, 2000)
      : "";

  const content =
    typeof b.content === "string" ? b.content.trim().slice(0, 20000) : "";

  let image_url = "";
  if (typeof b.image_url === "string" && b.image_url.trim()) {
    const trimmed = b.image_url.trim().slice(0, 500);
    if (!isSafeUrl(trimmed)) {
      return { ok: false, error: "Image URL must be a valid http(s) URL" };
    }
    image_url = trimmed;
  }

  const featured = typeof b.featured === "boolean" ? b.featured : true;
  const sort_order =
    typeof b.sort_order === "number" && Number.isFinite(b.sort_order)
      ? Math.trunc(b.sort_order)
      : 0;

  return {
    ok: true,
    data: {
      title,
      category,
      description,
      content,
      link,
      image_url,
      featured,
      sort_order,
    },
  };
}
