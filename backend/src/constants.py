import os
from pathlib import Path

ROOT_DIR = Path(__file__).parent.parent
DATA_DIR = ROOT_DIR / "data"

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
DB_PATH = DATA_DIR / "db.sqlite"
