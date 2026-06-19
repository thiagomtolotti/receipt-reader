from abc import ABC, abstractmethod

from ...types import ReceiptData


class ReceiptRepository(ABC):
    @abstractmethod
    def save(self, data: ReceiptData):
        pass

    @abstractmethod
    def get_all(self) -> list[ReceiptData]:
        pass
