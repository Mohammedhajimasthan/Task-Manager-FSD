import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// ✅ Verify token
export async function verifyToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  return token;
}

// ✅ Middleware (optional)
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
