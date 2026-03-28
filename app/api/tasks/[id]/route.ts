import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/middleware/authMiddleware";

// GET task
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await verifyToken();

    return NextResponse.json({
      message: "Task fetched successfully",
      id: params.id,
    });
  } catch {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}

// UPDATE task
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await verifyToken();

    const body = await req.json();

    return NextResponse.json({
      message: "Task updated successfully",
      id: params.id,
      data: body,
    });
  } catch {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}

// DELETE task
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await verifyToken();

    return NextResponse.json({
      message: "Task deleted successfully",
      id: params.id,
    });
  } catch {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}
