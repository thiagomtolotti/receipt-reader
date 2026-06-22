import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

ROOT_DIR = Path(__file__).parent.parent
DATA_DIR = ROOT_DIR / "data"

DB_PATH = DATA_DIR / "db.sqlite"

if not DATA_DIR.exists():
    DATA_DIR.mkdir(parents=True, exist_ok=True)


def _get_gemini_api_key():
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set in the environment variables.")

    return api_key


GEMINI_API_KEY = _get_gemini_api_key()
