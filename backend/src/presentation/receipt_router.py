from uuid import UUID

from fastapi import APIRouter, Depends, UploadFile

from src.application.main import ReceiptService
from src.dependencies import ai_repo, receipt_repo, receipt_service
from src.infra.ai_repository.types import AIRepository
from src.infra.receipt_repository.types import ReceiptRepository


class ReceiptRouter(APIRouter):
    def __init__(self):
        super().__init__(prefix="/receipt", tags=["Receipt"])

        self.add_api_route(
            "/",
            self.upload_,
            methods=["POST"],
        )

        self.add_api_route(
            "/",
            self.list_,
            methods=["GET"],
        )

        self.add_api_route(
            "/{receipt_id}",
            self.delete_,
            methods=["DELETE"],
        )

    def upload_(
        self,
        file: UploadFile,
        service: ReceiptService = Depends(lambda: receipt_service),
        ai_repo: AIRepository = Depends(lambda: ai_repo),
        receipt_repo: ReceiptRepository = Depends(lambda: receipt_repo),
    ):
        file_bytes = file.file.read()

        service.upload(file_bytes, ai_repo, receipt_repo)

        return {"message": f"File '{file.filename}' uploaded successfully!"}

    def list_(
        self,
        service: ReceiptService = Depends(lambda: receipt_service),
    ):
        receipts = service.list_receipts(receipt_repo)

        return {"receipts": receipts}

    def delete_(
        self,
        receipt_id: UUID,
        service: ReceiptService = Depends(lambda: receipt_service),
    ):
        service.delete_receipt(receipt_id, receipt_repo)

        return {"message": f"Receipt with ID '{receipt_id}' deleted successfully!"}
