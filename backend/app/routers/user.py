from fastapi import APIRouter, HTTPException, status
from typing import List
from bson import ObjectId

from app.db import db
from app.models.user import UserCreate, UserResponse

router = APIRouter(prefix="/users", tags=["Users"])


# Helper: Mongo document -> API response
def serialize_user(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
    }


@router.get("", response_model=List[UserResponse])
def get_all_users():
    try:
        users = db.user.find()
        return [serialize_user(user) for user in users]
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={"error": "Failed to fetch users"}
        )


@router.post("", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
def create_user(payload: UserCreate):
    try:
        user_doc = payload.dict()

        result = db.user.insert_one(user_doc)
        created_user = db.user.find_one({"_id": result.inserted_id})

        return serialize_user(created_user)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={"error": "Failed to create user"}
        )
