from pydantic import BaseModel, EmailStr
from typing import Optional

# Used when creating a user
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    role: str   # e.g. "Technician", "Manager"

# Used when returning user data
class UserResponse(BaseModel):
    id: Optional[str] = None
    name: str
    email: EmailStr
    role: str
