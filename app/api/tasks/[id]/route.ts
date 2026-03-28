import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/middleware/authMiddleware";

// GET
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await verifyToken(); // ✅ just call it

    const { id } = params;

    return NextResponse.json({
      message: "Task fetched successfully",
      id,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}

// PUT
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await verifyToken();

    const { id } = params;
    const body = await req.json();

    return NextResponse.json({
      message: "Task updated successfully",
      id,
      data: body,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}

// DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await verifyToken();

    const { id } = params;

    return NextResponse.json({
      message: "Task deleted successfully",
      id,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}
