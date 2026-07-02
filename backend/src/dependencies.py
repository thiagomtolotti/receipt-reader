from src.application.meal import MealService
from src.application.receipt import ReceiptService
from src.constants import DB_PATH, GEMINI_API_KEY
from src.domain.interfaces.document_parser import DocumentParser
from src.infra.adapters.gemini_parser import GeminiDocumentParser
from src.infra.receipt_repository.sqlite import SQLiteReceiptRepository

document_parser: DocumentParser = GeminiDocumentParser(api_key=GEMINI_API_KEY)

receipt_repo = SQLiteReceiptRepository(db_path=DB_PATH)
receipt_service = ReceiptService()

meal_service = MealService()
