from abc import ABC, abstractmethod

from ...types import ReceiptData

class ReceiptRepository(ABC):
    @abstractmethod
    def save_receipt(self, data: ReceiptData):
        pass