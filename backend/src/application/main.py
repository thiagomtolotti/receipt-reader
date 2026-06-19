from src.infra.ai_repository.types import AIRepository
from src.infra.receipt_repository.types import ReceiptRepository

class ReceiptService:
    def __init__(self):
        pass
    
    def upload(self, image: bytes, ai_repo: AIRepository, receipt_repo: ReceiptRepository) :
        # 1.Sends image to AI repository
        extracted_data = ai_repo.extract_data(image)
        
        # 2.Update database with extracted data
        receipt_repo.save_receipt(extracted_data)
    
