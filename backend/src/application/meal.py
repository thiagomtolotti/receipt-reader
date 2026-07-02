from src.domain.interfaces import DocumentParser
from src.domain.meal import Meal


class MealService:
    def __init__(self):
        pass

    def upload(self, file_bytes: bytes, parser: DocumentParser) -> Meal:
        extracted_data = parser.parse_image(file_bytes, Meal)

        return extracted_data
