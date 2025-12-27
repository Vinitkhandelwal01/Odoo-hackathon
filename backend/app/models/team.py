from pydantic import BaseModel
from typing import Optional

# Used when creating a team
class TeamCreate(BaseModel):
    name: str

# Used when returning team data
class TeamResponse(BaseModel):
    id: Optional[str] = None
    name: str
