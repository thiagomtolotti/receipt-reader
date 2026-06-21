from dotenv import load_dotenv
from fastapi import Depends, FastAPI, UploadFile
from scripts.migrate import migrate

from src.application.main import ReceiptService
from src.constants import DB_PATH, GEMINI_API_KEY
from src.infra.ai_repository.gemini import GeminiAIRepository
from src.infra.receipt_repository.sqlite import SQLiteReceiptRepository

load_dotenv()

app = FastAPI()

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set in the environment variables.")

if not DB_PATH.exists():
    migrate()

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
