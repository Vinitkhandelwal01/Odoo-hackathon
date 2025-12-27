import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Equipment from "@/models/Equipment";
import Request from "@/models/MaintenanceRequest";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const searchParams = req.nextUrl.searchParams;
    const equipmentId = searchParams.get("equipmentId");
    const type = searchParams.get("type");

    const query: any = {};
    if (equipmentId) {
      query.equipment = equipmentId;
    }
    if (type) {
      query.type = type;
    }

    const requests = await Request.find(query)
      .populate("equipment")
      .populate("team")
      .populate("technician")
      .sort({ scheduledDate: -1 });

    return NextResponse.json(requests);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const equipment = await Equipment.findById(body.equipmentId);

    if (!equipment) {
      return NextResponse.json({ error: "Equipment not found" }, { status: 404 });
    }

    const newRequest = await Request.create({
      subject: body.subject,
      equipment: body.equipmentId,
      team: equipment.maintenanceTeam,
      technician: equipment.defaultTechnician,
      type: body.type,
      scheduledDate: body.scheduledDate,
      duration: body.duration,
    });

    const populatedRequest = await Request.findById(newRequest._id)
      .populate("equipment")
      .populate("team")
      .populate("technician");

    return NextResponse.json(populatedRequest, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

