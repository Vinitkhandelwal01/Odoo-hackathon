from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo.errors import ConnectionFailure
from app.config import MONGO_URI, DB_NAME

# Create MongoDB client
try:
    client = MongoClient(MONGO_URI, server_api=ServerApi('1'),serverSelectionTimeoutMS=5000)
    # Force connection check
    client.admin.command("ping")
    print("✅ MongoDB connected successfully")
except ConnectionFailure as e:
    print("❌ MongoDB connection failed")
    raise e

# Database reference
db = client[DB_NAME]

# Helper to access DB (optional but clean)
def get_db():
    return db
