import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: String,
});

export default mongoose.models.Team ||
  mongoose.model("Team", TeamSchema);

