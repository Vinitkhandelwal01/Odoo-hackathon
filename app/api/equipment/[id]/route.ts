import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Equipment from "@/models/Equipment";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const equipment = await Equipment.findById(params.id)
      .populate("maintenanceTeam")
      .populate("defaultTechnician");
    if (!equipment) {
      return NextResponse.json({ error: "Equipment not found" }, { status: 404 });
    }
    return NextResponse.json(equipment);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await req.json();
    const equipment = await Equipment.findByIdAndUpdate(params.id, body, {
      new: true,
    })
      .populate("maintenanceTeam")
      .populate("defaultTechnician");
    if (!equipment) {
      return NextResponse.json({ error: "Equipment not found" }, { status: 404 });
    }
    return NextResponse.json(equipment);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    await Equipment.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Equipment deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

