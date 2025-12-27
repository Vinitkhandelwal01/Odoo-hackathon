import mongoose from "mongoose";

const EquipmentSchema = new mongoose.Schema({
  name: String,
  serialNumber: String,
  department: String,
  location: String,
  purchaseDate: Date,
  warrantyEnd: Date,
  maintenanceTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  defaultTechnician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isScrapped: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Equipment ||
  mongoose.model("Equipment", EquipmentSchema);

