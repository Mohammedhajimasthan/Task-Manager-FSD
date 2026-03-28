import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/middleware/authMiddleware";

// GET
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await verifyToken();

    return NextResponse.json({
      message: "Task fetched",
      id: params.id,
    });

  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

// PUT
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await verifyToken();
    const body = await req.json();

    return NextResponse.json({
      message: "Task updated",
      id: params.id,
      data: body,
    });

  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

// DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await verifyToken();

    return NextResponse.json({
      message: "Task deleted",
      id: params.id,
    });

  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
