import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
      index: true 
    },
    title: { 
      type: String, 
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200
    },
    description: { 
      type: String, 
      trim: true,
      maxlength: 1000
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

// Index for better query performance
TaskSchema.index({ userId: 1, status: 1 });
TaskSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);