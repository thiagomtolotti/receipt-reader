import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

ROOT_DIR = Path(__file__).parent.parent
DATA_DIR = ROOT_DIR / "data"

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
DB_PATH = DATA_DIR / "db.sqlite"

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set in the environment variables.")
