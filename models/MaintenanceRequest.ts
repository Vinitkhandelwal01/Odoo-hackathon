import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
  subject: String,
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment",
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["Corrective", "Preventive"],
  },
  status: {
    type: String,
    enum: ["New", "In Progress", "Repaired", "Scrap"],
    default: "New",
  },
  scheduledDate: Date,
  duration: Number,
});

export default mongoose.models.MaintenanceRequest ||
  mongoose.model("MaintenanceRequest", RequestSchema);

