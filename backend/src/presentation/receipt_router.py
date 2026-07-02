from uuid import UUID

from fastapi import APIRouter, Depends, UploadFile

from src.application.receipt import ReceiptService
from src.dependencies import receipt_service
from src.domain.receipt import Receipt, ReceiptDTO


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
    ) -> ReceiptDTO:
        file_bytes = file.file.read()

        receipt = service.upload(file_bytes)

        return Receipt.to_dto(receipt)

    def create_(
        self,
        data: ReceiptDTO,
        service: ReceiptService = Depends(lambda: receipt_service),
    ):
        service.create_receipt(data)

        return {"message": "Receipt created successfully!"}

    def update_(
        self,
        id: UUID,
        data: ReceiptDTO,
        service: ReceiptService = Depends(lambda: receipt_service),
    ):
        service.update_receipt(id, data)

        return {"message": "Receipt updated successfully!"}

    def list_(
        self,
        service: ReceiptService = Depends(lambda: receipt_service),
    ):
        receipts = service.list_receipts()

        return {"receipts": receipts}

    def delete_(
        self,
        receipt_id: UUID,
        service: ReceiptService = Depends(lambda: receipt_service),
    ):
        service.delete_receipt(receipt_id)

        return {"message": f"Receipt with ID '{receipt_id}' deleted successfully!"}
