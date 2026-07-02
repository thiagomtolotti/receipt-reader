from uuid import UUID

from fastapi import APIRouter, Depends, UploadFile

from src.application.receipt import ReceiptService
from src.dependencies import receipt_repo, receipt_service
from src.domain.interfaces.document_parser import DocumentParser
from src.domain.interfaces.receipt_repository import ReceiptRepository
from src.domain.receipt import Receipt, ReceiptDTO
from src.presentation.meal_router import document_parser


class ReceiptRouter(APIRouter):
    def __init__(self):
        super().__init__(prefix="/receipt", tags=["Receipt"])

        self.add_api_route(
            "/upload",
            self.upload_image,
            methods=["POST"],
        )

        self.add_api_route(
            "/",
            self.create_,
            methods=["POST"],
        )

        self.add_api_route(
            "/{id}",
            self.update_,
            methods=["PUT"],
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

    def upload_image(
        self,
        file: UploadFile,
        service: ReceiptService = Depends(lambda: receipt_service),
        document_parser: DocumentParser = Depends(lambda: document_parser),
        receipt_repo: ReceiptRepository = Depends(lambda: receipt_repo),
    ) -> ReceiptDTO:
        file_bytes = file.file.read()

        receipt = service.upload(file_bytes, document_parser)

        return Receipt.to_dto(receipt)

    def create_(
        self,
        data: ReceiptDTO,
        service: ReceiptService = Depends(lambda: receipt_service),
        receipt_repo: ReceiptRepository = Depends(lambda: receipt_repo),
    ):
        service.create_receipt(data, receipt_repo)

        return {"message": "Receipt created successfully!"}

    def update_(
        self,
        id: UUID,
        data: ReceiptDTO,
        service: ReceiptService = Depends(lambda: receipt_service),
        receipt_repo: ReceiptRepository = Depends(lambda: receipt_repo),
    ):
        service.update_receipt(id, data, receipt_repo)

        return {"message": "Receipt updated successfully!"}

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
