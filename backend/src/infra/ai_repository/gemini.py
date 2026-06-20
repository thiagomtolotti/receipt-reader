import datetime

from google import genai
from google.genai import types

from src.types import ReceiptDataItem

from .types import AIRepository, ReceiptData


class GeminiAIRepository(AIRepository):
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def extract_data(self, image: bytes):
        response = self.client.models.generate_content(  # type: ignore
            model="gemini-2.5-flash",
            contents=[
                types.Part.from_bytes(
                    data=image,
                    mime_type="image/jpeg",
                ),
                "Analyze this receipt image and extract the requested fields precisely.",
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=ReceiptData,
                temperature=0.1,
            ),
        )

        print("Gemini response:", response.text)

        return ReceiptData(
            date=datetime.datetime(2024, 1, 1),
            items=[ReceiptDataItem(name="Example Item", price=1000, quantity=1)],
            total=1000,
        )
