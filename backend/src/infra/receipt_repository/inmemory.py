from src.types import ReceiptData
from src.infra.receipt_repository.types import ReceiptRepository


class InMemoryReceiptRepository(ReceiptRepository):
    def __init__(self):
        self.receipts: list[ReceiptData] = []

    def save(self, data: ReceiptData):
        self.receipts.append(data)

    def get_all(self) -> list[ReceiptData]:
        return self.receipts
