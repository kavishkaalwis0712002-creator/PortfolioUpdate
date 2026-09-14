import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { pin } = await req.json();
    const correctPin = process.env.ADMIN_SECRET_PIN || "Kavishka@2026#";

    if (pin !== correctPin) {
      return NextResponse.json({ success: false, message: "Invalid Admin PIN" }, { status: 401 });
    }

    // Set secure auth cookie for 7 days
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated_kavishka_admin", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}