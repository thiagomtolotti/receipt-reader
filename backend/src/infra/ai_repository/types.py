from abc import ABC, abstractmethod

from ...types import ReceiptData

class AIRepository(ABC):
    @abstractmethod
    def extract_data(self, image: bytes) -> ReceiptData:
        pass
