from uuid import UUID

from src.domain.receipt import Receipt, ReceiptDTO
from src.infra.ai_repository.types import AIRepository
from src.infra.receipt_repository.types import ReceiptRepository


class ReceiptService:
    def __init__(self):
        pass

    def upload(
        self,
        image: bytes,
        ai_repo: AIRepository,
    ) -> Receipt:
        extracted_data = ai_repo.extract_data(image)

        return extracted_data

    def list_receipts(
        self,
        receipt_repo: ReceiptRepository,
    ) -> list[Receipt]:
        return receipt_repo.list_()

    def delete_receipt(
        self,
        receipt_id: UUID,
        receipt_repo: ReceiptRepository,
    ):
        receipt_repo.delete(receipt_id)

    def create_receipt(
        self,
        data: ReceiptDTO,
        receipt_repo: ReceiptRepository,
    ):
        receipt = Receipt.from_dto(data)

        receipt_repo.save(receipt)

    def update_receipt(
        self,
        id: UUID,
        data: ReceiptDTO,
        receipt_repo: ReceiptRepository,
    ):
        receipt = Receipt.from_dto(data, id)

        receipt_repo.update(receipt)
