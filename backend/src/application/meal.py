class MealService:
    def __init__(self):
        pass

    def upload(self, file_bytes: bytes) -> str:
        # Implement the logic to handle the uploaded image
        # For now, just return a success message
        return f"Image uploaded successfully with {len(file_bytes)} bytes!"
