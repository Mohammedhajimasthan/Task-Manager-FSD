import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { verifyToken } from "@/middleware/authMiddleware";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const user = await verifyToken();
    if (user instanceof NextResponse) return user;

    const { title, description, status = "pending" } = await req.json();

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!["pending", "in-progress", "completed"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const task = await Task.create({
      title: title.trim(),
      description: description?.toString().trim() || "",
      status,
      userId: user.id
    });

    const taskObj = task.toObject();
    return NextResponse.json(taskObj, { status: 201 });
  } catch (error: any) {
    console.error("Create task error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create task" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const user = await verifyToken();
    if (user instanceof NextResponse) return user;

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = 10;
    const statusFilter = searchParams.get("status");
    const search = searchParams.get("search")?.trim();

    const query: any = { userId: user.id };

    if (statusFilter && ["pending", "in-progress", "completed"].includes(statusFilter)) {
      query.status = statusFilter;
    }

    if (search && search.length > 0) {
      query.title = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;
    
    const [tasks, total] = await Promise.all([
      Task.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Task.countDocuments(query)
    ]);

    const pagination = {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    };

    return NextResponse.json({
      tasks,
      pagination
    });
  } catch (error: any) {
    console.error("Get tasks error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}