from src.infra.ai_repository.types import AIRepository
from src.types import ReceiptData


class InMemoryAIRepository(AIRepository):
    def __init__(self):
        self.data = {}

    def extract_data(self, image: bytes) -> ReceiptData:
        return {"extracted_data": "This is a simulated response."}