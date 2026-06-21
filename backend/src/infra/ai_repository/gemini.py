from typing import Optional

from google import genai
from google.genai import types
from pydantic import BaseModel, Field

from src.types import ReceiptData

from .types import AIRepository


class ReceiptItem(BaseModel):
    description: str
    quantity: int = 1
    price: float


class InvalidReceiptError(Exception):
    pass


class GeminiResponseSchema(BaseModel):
    is_valid_receipt: bool = Field(
        description="Set to True if the image is explicitly a receipt or invoice. Set to False if the image is a car, landscape, person, or anything else."
    )
    data: Optional["ReceiptData"] = Field(
        default=None,
        description="The extracted data from the receipt. This field should be null if is_valid_receipt is false.",
    )


class GeminiAIRepository(AIRepository):
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def extract_data(self, image: bytes) -> ReceiptData:
        response = self.client.models.generate_content(  # type: ignore
            model="gemini-2.5-flash",
            contents=[
                types.Part.from_bytes(
                    data=image,
                    mime_type="image/jpeg",
                ),
                "Return is_valid: false if the data cannot be extracted or the image is not a receipt.",
                "Analyze this receipt image and extract the requested fields precisely.",
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=GeminiResponseSchema,
                temperature=0.1,
            ),
        )

        data: GeminiResponseSchema = response.parsed  # type: ignore

        if not data.is_valid_receipt:
            raise InvalidReceiptError("The provided image is not a valid receipt.")

        if data.data is None:
            raise ValueError(
                "The response indicates a valid receipt, but no data was extracted."
            )

        return data.data
