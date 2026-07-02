from dataclasses import dataclass


@dataclass(frozen=True)
class MealItem:
    name: str
    calories: int


@dataclass(frozen=True)
class Meal:
    name: str
    items: list[MealItem]

    @property
    def total_calories(self) -> int:
        return sum(item.calories for item in self.items)
