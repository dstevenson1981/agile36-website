import { createClient } from "@/app/lib/supabase/server";
import {
  AI_PM_COURSEBOOK,
  hasAiProductManagementCourseAccess,
} from "@/app/lib/course-materials";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Serves the AI Product Management coursebook to enrolled learners only. */
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const login = new URL("/account/login", request.url);
    login.searchParams.set("next", AI_PM_COURSEBOOK.apiPath);
    return NextResponse.redirect(login);
  }

  const hasAccess = await hasAiProductManagementCourseAccess();
  if (!hasAccess) {
    return NextResponse.json(
      {
        error:
          "Coursebook access requires enrollment in Certified AI Product Manager.",
      },
      { status: 403 }
    );
  }

  try {
    const data = await fs.readFile(AI_PM_COURSEBOOK.absolutePath);
    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${AI_PM_COURSEBOOK.downloadName}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Coursebook file is temporarily unavailable." },
      { status: 404 }
    );
  }
}
