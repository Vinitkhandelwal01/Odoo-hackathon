from fastapi import FastAPI
from app.db import db
from app.routers import health, user, team, equipment, request, setup

app = FastAPI(title="GearGuard API")

app.include_router(health.router, prefix="/api")
app.include_router(user.router, prefix="/api")
app.include_router(team.router, prefix="/api")
app.include_router(equipment.router, prefix="/api")
app.include_router(request.router, prefix="/api")
app.include_router(setup.router, prefix="/api")

@app.get("/ping")
def ping():
    return {"msg": "api working"}

@app.get('/db_conn')
def db_conn():
    print("Checking database connection...")
    return {"collections": db.list_collection_names()}