import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Request from "@/models/MaintenanceRequest";
import Equipment from "@/models/Equipment";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const request = await Request.findById(params.id)
      .populate("equipment")
      .populate("team")
      .populate("technician");
    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }
    return NextResponse.json(request);
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

    // If status is being updated to "Scrap", mark equipment as scrapped
    if (body.status === "Scrap") {
      const request = await Request.findById(params.id);
      if (request && request.equipment) {
        await Equipment.findByIdAndUpdate(request.equipment, {
          isScrapped: true,
        });
      }
    }

    const updatedRequest = await Request.findByIdAndUpdate(params.id, body, {
      new: true,
    })
      .populate("equipment")
      .populate("team")
      .populate("technician");

    if (!updatedRequest) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    return NextResponse.json(updatedRequest);
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
    await Request.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Request deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

