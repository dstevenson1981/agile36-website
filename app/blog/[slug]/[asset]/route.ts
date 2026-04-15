import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getGeneratedBlogAssetPath } from "@/app/lib/generated-blog";

const CONTENT_TYPES: Record<string, string> = {
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

type RouteProps = {
  params: Promise<{ slug: string; asset: string }>;
};

export async function GET(_: Request, { params }: RouteProps) {
  const { slug, asset } = await params;

  if (asset.includes("/") || asset.includes("..")) {
    return new NextResponse("Invalid asset path", { status: 400 });
  }

  const filePath = getGeneratedBlogAssetPath(slug, asset);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = CONTENT_TYPES[ext];

  if (!contentType) {
    return new NextResponse("Unsupported asset type", { status: 404 });
  }

  try {
    const file = await readFile(filePath);
    return new NextResponse(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Asset not found", { status: 404 });
  }
}
