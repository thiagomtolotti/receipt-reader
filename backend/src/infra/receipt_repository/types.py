from abc import ABC, abstractmethod

from src.domain.receipt import Receipt


class ReceiptRepository(ABC):
    @abstractmethod
    def save(self, data: Receipt):
        pass

    @abstractmethod
    def get_all(self) -> list[Receipt]:
        pass
