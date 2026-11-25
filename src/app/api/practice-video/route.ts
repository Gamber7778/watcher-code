import { NextResponse } from "next/server";

// Public metadata only. A local cover remains available when Vimeo keeps the
// video private or its metadata service is unavailable.
export async function GET() {
  try {
    const response = await fetch(
      "https://vimeo.com/api/oembed.json?url=https%3A%2F%2Fvimeo.com%2F1249935380&width=1280",
      { next: { revalidate: 300 }, signal: AbortSignal.timeout(4000) },
    );
    if (!response.ok) throw new Error("Video metadata unavailable");
    const data = await response.json();
    const thumbnail = new URL(data.thumbnail_url);
    if (thumbnail.protocol !== "https:" || !thumbnail.hostname.endsWith(".vimeocdn.com")) {
      throw new Error("Unexpected thumbnail host");
    }
    return NextResponse.json(
      { thumbnailUrl: thumbnail.href, duration: Number(data.duration) || 0 },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=300" } },
    );
  } catch {
    return NextResponse.json(
      { thumbnailUrl: null, duration: 0 },
      { headers: { "Cache-Control": "public, s-maxage=60" } },
    );
  }
}
