import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Equipment from "@/models/Equipment";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const searchParams = req.nextUrl.searchParams;
    const equipmentId = searchParams.get("equipmentId");

    if (equipmentId) {
      const equipment = await Equipment.findById(equipmentId)
        .populate("maintenanceTeam")
        .populate("defaultTechnician");
      return NextResponse.json(equipment);
    }

    const equipment = await Equipment.find({ isScrapped: false })
      .populate("maintenanceTeam")
      .populate("defaultTechnician")
      .sort({ createdAt: -1 });
    return NextResponse.json(equipment);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const equipment = await Equipment.create(body);
    return NextResponse.json(equipment, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

