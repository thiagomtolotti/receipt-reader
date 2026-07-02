from typing import Self

from pydantic import BaseModel


class MealItemDTO(BaseModel):
    name: str
    calories: int


class MealDTO(BaseModel):
    name: str
    items: list[MealItemDTO]
    total_calories: int


class MealItem(BaseModel):
    name: str
    calories: int

    @classmethod
    def from_dto(cls, dto: MealItemDTO) -> Self:
        return cls(
            name=dto.name,
            calories=dto.calories,
        )


class Meal(BaseModel):
    name: str
    items: list[MealItem]

    @property
    def total_calories(self) -> int:
        return sum(item.calories for item in self.items)

    @classmethod
    def from_dto(cls, dto: MealDTO) -> Self:
        items = [MealItem.from_dto(item) for item in dto.items]

        return cls(
            name=dto.name,
            items=items,
        )

    @classmethod
    def to_dto(cls, meal: Self) -> MealDTO:
        items_dto = [
            MealItemDTO(name=item.name, calories=item.calories) for item in meal.items
        ]

        return MealDTO(
            name=meal.name,
            items=items_dto,
            total_calories=meal.total_calories,
        )
