from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# Used when creating equipment
class EquipmentCreate(BaseModel):
    name: str
    serialNumber: str
    department: str
    location: str
    purchaseDate: datetime
    warrantyEnd: datetime
    maintenanceTeam: str          # Team ObjectId (string)
    defaultTechnician: str        # User ObjectId (string)


# Used when updating equipment (PATCH)
class EquipmentUpdate(BaseModel):
    name: Optional[str] = None
    serialNumber: Optional[str] = None
    department: Optional[str] = None
    location: Optional[str] = None
    purchaseDate: Optional[datetime] = None
    warrantyEnd: Optional[datetime] = None
    maintenanceTeam: Optional[str] = None
    defaultTechnician: Optional[str] = None
    isScrapped: Optional[bool] = None


# Used when returning equipment data
class EquipmentResponse(BaseModel):
    id: Optional[str] = None
    name: str
    serialNumber: str
    department: str
    location: str
    purchaseDate: datetime
    warrantyEnd: datetime
    maintenanceTeam: dict         # populated object
    defaultTechnician: dict       # populated object
    isScrapped: bool
