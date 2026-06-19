from fastapi import Depends, FastAPI, UploadFile

from src.application.main import ReceiptService
from src.infra.ai_repository.inmemory import InMemoryAIRepository
from src.infra.receipt_repository.inmemory import InMemoryReceiptRepository

app = FastAPI()

ai_repo = InMemoryAIRepository()
receipt_repo = InMemoryReceiptRepository()
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
