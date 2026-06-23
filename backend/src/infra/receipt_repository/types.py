from abc import ABC, abstractmethod
from uuid import UUID

from src.domain.receipt import Receipt


class ReceiptRepository(ABC):
    @abstractmethod
    def save(self, data: Receipt):
        pass

    @abstractmethod
    def list_(self) -> list[Receipt]:
        pass

    @abstractmethod
    def delete(self, receipt_id: UUID):
        pass

    @abstractmethod
    def update(self, receipt: Receipt):
        pass
