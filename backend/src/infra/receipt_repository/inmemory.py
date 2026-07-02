from src.domain.receipt import Receipt
from src.infra.receipt_repository.sqlite import ReceiptRepository


class InMemoryReceiptRepository(ReceiptRepository):
    def __init__(self):
        self.receipts: list[Receipt] = []

    def save(self, data: Receipt):
        self.receipts.append(data)

    def list_(self) -> list[Receipt]:
        return self.receipts
