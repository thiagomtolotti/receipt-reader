from datetime import datetime

from src.domain.receipt import Receipt, ReceiptItem
from src.infra.ai_repository.types import AIRepository


class InMemoryAIRepository(AIRepository):
    def __init__(self):
        self.data = {}

    def extract_data(self, image: bytes) -> Receipt:
        return Receipt(
            date=datetime(2024, 1, 1),
            items=[ReceiptItem(name="Example Item", price=1000, quantity=1)],
            total=1000,
            store_name="Example Store",
        )
