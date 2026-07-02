from src.application.main import ReceiptService
from src.application.meal import MealService
from src.constants import DB_PATH, GEMINI_API_KEY
from src.infra.ai_repository.gemini import GeminiAIRepository
from src.infra.receipt_repository.sqlite import SQLiteReceiptRepository

ai_repo = GeminiAIRepository(api_key=GEMINI_API_KEY)
receipt_repo = SQLiteReceiptRepository(db_path=DB_PATH)
receipt_service = ReceiptService()

meal_service = MealService()
