from datetime import datetime

from src.infra.ai_repository.types import AIRepository
from src.types import ReceiptData, ReceiptDataItem


class InMemoryAIRepository(AIRepository):
    def __init__(self):
        self.data = {}

    def extract_data(self, image: bytes) -> ReceiptData:
        return ReceiptData(
            date=datetime(2024, 1, 1),
            items=[ReceiptDataItem(name="Example Item", price=1000, quantity=1)],
            total=1000,
        )
