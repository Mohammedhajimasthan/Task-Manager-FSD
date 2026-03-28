import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function authMiddleware(req: NextRequest) {
  try {
    // ✅ FIX: await cookies()
    const cookieStore = await cookies();

    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // You can verify token here later

    return NextResponse.next();

  } catch (error) {
    return NextResponse.json(
      { message: "Authentication error" },
      { status: 500 }
    );
  }
}
