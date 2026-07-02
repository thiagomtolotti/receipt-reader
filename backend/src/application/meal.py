from src.application.main import AIRepository
from src.domain.meal import Meal


class MealService:
    def __init__(self):
        pass

    def upload(self, file_bytes: bytes, ai_repo: AIRepository) -> Meal:
        extracted_data = ai_repo.extract_meal_data(file_bytes)

        return extracted_data
