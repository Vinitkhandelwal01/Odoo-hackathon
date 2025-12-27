from fastapi import APIRouter
from app.db import db

router = APIRouter(prefix="/setup", tags=["Setup"])


@router.post("")
def setup_initial_data():
    created = {
        "teams": 0,
        "users": 0
    }

    # ----- Teams -----
    if db.team.count_documents({}) == 0:
        teams = [
            {"name": "IT Support"},
            {"name": "Mechanical"},
            {"name": "Electrical"}
        ]
        db.team.insert_many(teams)
        created["teams"] = len(teams)

    # ----- Users -----
    if db.user.count_documents({}) == 0:
        users = [
            {
                "name": "Rahul Sharma",
                "email": "rahul@example.com",
                "role": "Technician"
            },
            {
                "name": "Anita Verma",
                "email": "anita@example.com",
                "role": "Technician"
            },
            {
                "name": "Suresh Kumar",
                "email": "suresh@example.com",
                "role": "Manager"
            }
        ]
        db.user.insert_many(users)
        created["users"] = len(users)

    return {
        "status": "success",
        "message": "Setup completed",
        "created": created
    }
