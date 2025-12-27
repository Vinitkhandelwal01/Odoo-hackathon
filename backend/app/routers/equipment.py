from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from bson import ObjectId

from app.db import db
from app.models.equipment import (
    EquipmentCreate,
    EquipmentUpdate,
    EquipmentResponse,
)

router = APIRouter(prefix="/equipment", tags=["Equipment"])


# ---------- Helpers ----------

def serialize_team(team):
    if not team:
        return None
    return {
        "_id": str(team["_id"]),
        "name": team["name"],
    }


def serialize_user(user):
    if not user:
        return None
    return {
        "_id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
    }


def serialize_equipment(eq):
    team = db.team.find_one({"_id": eq["maintenanceTeam"]})
    technician = db.user.find_one({"_id": eq["defaultTechnician"]})

    return {
        "id": str(eq["_id"]),
        "name": eq["name"],
        "serialNumber": eq["serialNumber"],
        "department": eq["department"],
        "location": eq["location"],
        "purchaseDate": eq["purchaseDate"],
        "warrantyEnd": eq["warrantyEnd"],
        "maintenanceTeam": serialize_team(team),
        "defaultTechnician": serialize_user(technician),
        "isScrapped": eq.get("isScrapped", False),
    }


# ---------- Routes ----------

@router.get("", response_model=List[EquipmentResponse])
def get_all_equipment(equipmentId: Optional[str] = None):
    try:
        if equipmentId:
            eq = db.equipment.find_one({"_id": ObjectId(equipmentId)})
            if not eq:
                raise HTTPException(404, "Equipment not found")
            return [serialize_equipment(eq)]

        equipment_list = db.equipment.find()
        return [serialize_equipment(eq) for eq in equipment_list]

    except Exception:
        raise HTTPException(500, "Failed to fetch equipment")


@router.get("/{id}", response_model=EquipmentResponse)
def get_equipment_by_id(id: str):
    eq = db.equipment.find_one({"_id": ObjectId(id)})
    if not eq:
        raise HTTPException(404, "Equipment not found")
    return serialize_equipment(eq)


@router.post("", status_code=status.HTTP_201_CREATED, response_model=EquipmentResponse)
def create_equipment(payload: EquipmentCreate):
    try:
        equipment_doc = payload.dict()
        equipment_doc["maintenanceTeam"] = ObjectId(payload.maintenanceTeam)
        equipment_doc["defaultTechnician"] = ObjectId(payload.defaultTechnician)
        equipment_doc["isScrapped"] = False

        result = db.equipment.insert_one(equipment_doc)
        created = db.equipment.find_one({"_id": result.inserted_id})

        return serialize_equipment(created)

    except Exception:
        raise HTTPException(500, "Failed to create equipment")


@router.patch("/{id}", response_model=EquipmentResponse)
def update_equipment(id: str, payload: EquipmentUpdate):
    update_data = {k: v for k, v in payload.dict().items() if v is not None}

    if "maintenanceTeam" in update_data:
        update_data["maintenanceTeam"] = ObjectId(update_data["maintenanceTeam"])

    if "defaultTechnician" in update_data:
        update_data["defaultTechnician"] = ObjectId(update_data["defaultTechnician"])

    result = db.equipment.update_one(
        {"_id": ObjectId(id)},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(404, "Equipment not found")

    updated = db.equipment.find_one({"_id": ObjectId(id)})
    return serialize_equipment(updated)


@router.delete("/{id}")
def delete_equipment(id: str):
    result = db.equipment.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(404, "Equipment not found")
    return {"message": "Equipment deleted"}
