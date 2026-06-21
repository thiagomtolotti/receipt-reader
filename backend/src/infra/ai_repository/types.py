from abc import ABC, abstractmethod

from src.domain.receipt import Receipt


class AIRepository(ABC):
    @abstractmethod
    def extract_data(self, image: bytes) -> Receipt:
        pass
