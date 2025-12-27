from fastapi import APIRouter, HTTPException
from app.db import db

router = APIRouter(tags=["Health"])

@router.get("/health")
def health_check():
    try:
        # Simple MongoDB operation
        collections = db.list_collection_names()

        return {
            "status": "success",
            "message": "MongoDB is connected and working!",
            "connectionState": "connected",
            "database": db.name,
            "collections": collections
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": "MongoDB connection failed",
                "error": str(e)
            }
        )
