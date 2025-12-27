from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from bson import ObjectId

from app.db import db
from app.models.request import (
    RequestCreate,
    RequestUpdate,
    RequestResponse
)

router = APIRouter(prefix="/requests", tags=["Maintenance Requests"])


# ---------- Helpers ----------

def serialize_team(team):
    return {
        "_id": str(team["_id"]),
        "name": team["name"]
    }


def serialize_user(user):
    return {
        "_id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user["role"]
    }


def serialize_equipment(eq):
    return {
        "_id": str(eq["_id"]),
        "name": eq["name"],
        "serialNumber": eq["serialNumber"],
        "department": eq["department"],
        "location": eq["location"],
        "isScrapped": eq.get("isScrapped", False)
    }


def serialize_request(req):
    equipment = db.equipment.find_one({"_id": req["equipment"]})
    team = db.team.find_one({"_id": req["team"]})
    technician = db.user.find_one({"_id": req["technician"]})

    return {
        "id": str(req["_id"]),
        "subject": req["subject"],
        "equipment": serialize_equipment(equipment),
        "team": serialize_team(team),
        "technician": serialize_user(technician),
        "type": req["type"],
        "status": req["status"],
        "scheduledDate": req.get("scheduledDate"),
        "duration": req.get("duration")
    }


# ---------- Routes ----------

@router.get("", response_model=List[RequestResponse])
def get_all_requests(
    equipmentId: Optional[str] = None,
    type: Optional[str] = None
):
    query = {}

    if equipmentId:
        query["equipment"] = ObjectId(equipmentId)

    if type:
        query["type"] = type

    try:
        requests = db.maintenancerequest.find(query)
        return [serialize_request(req) for req in requests]
    except Exception:
        raise HTTPException(500, "Failed to fetch requests")


@router.get("/{id}", response_model=RequestResponse)
def get_request_by_id(id: str):
    req = db.maintenancerequest.find_one({"_id": ObjectId(id)})
    if not req:
        raise HTTPException(404, "Request not found")
    return serialize_request(req)


@router.post("", status_code=status.HTTP_201_CREATED, response_model=RequestResponse)
def create_request(payload: RequestCreate):
    # Fetch equipment
    equipment = db.equipment.find_one({"_id": ObjectId(payload.equipmentId)})
    if not equipment:
        raise HTTPException(404, "Equipment not found")

    request_doc = {
        "subject": payload.subject,
        "equipment": equipment["_id"],
        "team": equipment["maintenanceTeam"],
        "technician": equipment["defaultTechnician"],
        "type": payload.type,
        "status": "New",
        "scheduledDate": payload.scheduledDate,
        "duration": payload.duration
    }

    result = db.maintenancerequest.insert_one(request_doc)
    created = db.maintenancerequest.find_one({"_id": result.inserted_id})

    return serialize_request(created)


@router.patch("/{id}", response_model=RequestResponse)
def update_request(id: str, payload: RequestUpdate):
    req = db.maintenancerequest.find_one({"_id": ObjectId(id)})
    if not req:
        raise HTTPException(404, "Request not found")

    update_data = {k: v for k, v in payload.dict().items() if v is not None}

    # SCRAP LOGIC
    if payload.status == "Scrap":
        db.equipment.update_one(
            {"_id": req["equipment"]},
            {"$set": {"isScrapped": True}}
        )

    db.maintenancerequest.update_one(
        {"_id": ObjectId(id)},
        {"$set": update_data}
    )

    updated = db.maintenancerequest.find_one({"_id": ObjectId(id)})
    return serialize_request(updated)


@router.delete("/{id}")
def delete_request(id: str):
    result = db.maintenancerequest.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(404, "Request not found")
    return {"message": "Request deleted"}
