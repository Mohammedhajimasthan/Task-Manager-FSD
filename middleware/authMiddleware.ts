import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// ✅ VERIFY TOKEN (USED IN API ROUTES)
export async function verifyToken() {
  const cookieStore = await cookies(); // ✅ Next.js 14+ compatible
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  return token;
}

// ✅ OPTIONAL MIDDLEWARE
export async function authMiddleware(req: NextRequest) {
  try {
    await verifyToken();
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}
