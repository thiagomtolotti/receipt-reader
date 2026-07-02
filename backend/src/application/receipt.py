from uuid import UUID

from src.domain.interfaces.document_parser import DocumentParser
from src.domain.receipt import Receipt, ReceiptDTO
from src.infra.persistence.receipt.inmemory import ReceiptRepository


class ReceiptService:
    def __init__(self, parser: DocumentParser, repository: ReceiptRepository):
        self.parser = parser
        self.repository = repository

    def upload(self, image: bytes) -> Receipt:
        extracted_data = self.parser.parse_image(image, Receipt)

        return extracted_data

    def list_receipts(
        self,
    ) -> list[Receipt]:
        return self.repository.list_()

    def delete_receipt(
        self,
        receipt_id: UUID,
    ):
        self.repository.delete(receipt_id)

    def create_receipt(
        self,
        data: ReceiptDTO,
    ):
        receipt = Receipt.from_dto(data)

        self.repository.save(receipt)

    def update_receipt(
        self,
        id: UUID,
        data: ReceiptDTO,
    ):
        receipt = Receipt.from_dto(data, id)

        self.repository.update(receipt)
