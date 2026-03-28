import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/middleware/authMiddleware";

// GET all tasks
export async function GET(req: NextRequest) {
  try {
    await verifyToken();

    return NextResponse.json({
      message: "All tasks fetched successfully",
    });
  } catch {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}

// CREATE task
export async function POST(req: NextRequest) {
  try {
    await verifyToken();

    const { title, description, status = "pending" } = await req.json();

    return NextResponse.json({
      message: "Task created successfully",
      task: { title, description, status },
    });
  } catch {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}
