from fastapi import APIRouter, HTTPException, status
from typing import List

from app.db import db
from app.models.team import TeamCreate, TeamResponse

router = APIRouter(prefix="/teams", tags=["Teams"])


# Helper: Mongo document -> API response
def serialize_team(team) -> dict:
    return {
        "id": str(team["_id"]),
        "name": team["name"],
    }


@router.get("", response_model=List[TeamResponse])
def get_all_teams():
    try:
        teams = db.team.find()
        return [serialize_team(team) for team in teams]
    except Exception:
        raise HTTPException(
            status_code=500,
            detail={"error": "Failed to fetch teams"}
        )


@router.post("", status_code=status.HTTP_201_CREATED, response_model=TeamResponse)
def create_team(payload: TeamCreate):
    try:
        team_doc = payload.dict()
        result = db.team.insert_one(team_doc)
        created_team = db.team.find_one({"_id": result.inserted_id})

        return serialize_team(created_team)

    except Exception:
        raise HTTPException(
            status_code=500,
            detail={"error": "Failed to create team"}
        )
