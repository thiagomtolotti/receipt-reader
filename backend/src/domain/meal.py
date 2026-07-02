from pydantic import BaseModel


class MealItem(BaseModel):
    name: str
    calories: int


class Meal(BaseModel):
    name: str
    items: list[MealItem]

    @property
    def total_calories(self) -> int:
        return sum(item.calories for item in self.items)
