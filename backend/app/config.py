import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

MONGO_USR = os.getenv("MONGO_USR")
MONGO_PWD = os.getenv("MONGO_PWD")

# MongoDB connection
MONGO_URI: str = f"mongodb+srv://{MONGO_USR}:{MONGO_PWD}@cluster0.gqrhlgl.mongodb.net/?appName=Cluster0"

# Database name (as per documentation)
DB_NAME: str = "gear-guard"

# Basic validation (fail fast)
if not MONGO_URI:
    raise RuntimeError("MONGO_URI is not set in .env file")
