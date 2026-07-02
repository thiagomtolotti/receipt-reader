from abc import ABC, abstractmethod

from src.domain.meal import Meal
from src.domain.receipt import Receipt


class AIRepository(ABC):
    @abstractmethod
    def extract_receipt_data(self, image: bytes) -> Receipt:
        pass

    @abstractmethod
    def extract_meal_data(self, image: bytes) -> Meal:
        pass
