import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, UploadFile

from src.application.main import ReceiptService
from src.infra.ai_repository.gemini import GeminiAIRepository
from src.infra.receipt_repository.sqlite import SQLiteReceiptRepository

load_dotenv()

app = FastAPI()

ROOT_DIR = Path(__file__).parent.parent
DATA_DIR = ROOT_DIR / "data"

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
DB_PATH = DATA_DIR / "db.sqlite"

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set in the environment variables.")

ai_repo = GeminiAIRepository(api_key=GEMINI_API_KEY)
receipt_repo = SQLiteReceiptRepository(db_path=DB_PATH)
receipt_service = ReceiptService()


@app.get("/")
def ping():
    return {"message": "Service is alive!"}


@app.post("/receipt")
def upload_receipt(
    file: UploadFile, receipt_service: ReceiptService = Depends(lambda: receipt_service)
):
    file_bytes = file.file.read()

    receipt_service.upload(file_bytes, ai_repo, receipt_repo)

    return {"message": f"File '{file.filename}' uploaded successfully!"}


@app.get("/receipts")
def get_receipts(receipt_service: ReceiptService = Depends(lambda: receipt_service)):
    receipts = receipt_service.list_receipts(receipt_repo)

    return {"receipts": receipts}
