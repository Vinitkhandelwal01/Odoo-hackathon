from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# Used when creating a maintenance request
class RequestCreate(BaseModel):
    subject: str
    equipmentId: str                   # Equipment ObjectId (string)
    type: str                          # "Corrective" | "Preventive"
    scheduledDate: Optional[datetime] = None
    duration: Optional[int] = None     # hours


# Used when updating a request (PATCH)
class RequestUpdate(BaseModel):
    subject: Optional[str] = None
    status: Optional[str] = None       # "New" | "In Progress" | "Repaired" | "Scrap"
    scheduledDate: Optional[datetime] = None
    duration: Optional[int] = None


# Used when returning request data
class RequestResponse(BaseModel):
    id: Optional[str] = None
    subject: str
    equipment: dict
    team: dict
    technician: dict
    type: str
    status: str
    scheduledDate: Optional[datetime] = None
    duration: Optional[int] = None
