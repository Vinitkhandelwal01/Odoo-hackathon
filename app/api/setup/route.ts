import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Team from "@/models/Team";
import User from "@/models/User";

export async function POST() {
  try {
    await connectDB();

    // Create sample teams
    const teams = await Team.find();
    if (teams.length === 0) {
      await Team.create([
        { name: "Electrical Team" },
        { name: "Mechanical Team" },
        { name: "IT Support Team" },
      ]);
    }

    // Create sample users
    const users = await User.find();
    if (users.length === 0) {
      await User.create([
        { name: "John Doe", email: "john@example.com", role: "Technician" },
        { name: "Jane Smith", email: "jane@example.com", role: "Technician" },
        { name: "Bob Johnson", email: "bob@example.com", role: "Technician" },
      ]);
    }

    return NextResponse.json({
      message: "Setup completed successfully",
      teams: await Team.find(),
      users: await User.find(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

