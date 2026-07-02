from src.domain.interfaces.document_parser import DocumentParser
from src.domain.meal import Meal


class MealService:
    def __init__(self, document_parser: DocumentParser):
        self.document_parser = document_parser

    def upload(self, file_bytes: bytes) -> Meal:
        extracted_data = self.document_parser.parse_image(file_bytes, Meal)

        return extracted_data
