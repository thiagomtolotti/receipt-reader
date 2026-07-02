from abc import ABC, abstractmethod
from uuid import UUID

from ..meal import Meal


class MealRepository(ABC):
    @abstractmethod
    def save(self, data: Meal):
        pass

    @abstractmethod
    def list_(self) -> list[Meal]:
        pass

    @abstractmethod
    def delete(self, meal_id: UUID):
        pass

    @abstractmethod
    def update(self, meal: Meal):
        pass
