from datetime import datetime
from typing import Optional

from google import genai
from google.genai import types
from pydantic import BaseModel, Field

from src.domain.receipt import Receipt, ReceiptItem

from .types import AIRepository


class InvalidReceiptError(Exception):
    pass


class GeminiReceiptItem(BaseModel):
    description: str
    quantity: int = 1
    price: float


class GeminiReceiptDTO(BaseModel):
    date: datetime = Field(..., description="The date when the receipt was issued.")
    store_name: str = Field(
        ..., description="The name of the store where the receipt was issued."
    )
    items: list[GeminiReceiptItem] = Field(
        ..., description="A list of items on the receipt."
    )
    total: int = Field(..., description="The total amount of the receipt in cents.")


class GeminiResponseSchema(BaseModel):
    is_valid_receipt: bool = Field(
        description="Set to True if the image is explicitly a receipt or invoice. Set to False if the image is a car, landscape, person, or anything else."
    )
    data: Optional["GeminiReceiptDTO"] = Field(
        default=None,
        description="The extracted data from the receipt. This field should be null if is_valid_receipt is false.",
    )


class GeminiAIRepository(AIRepository):
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def extract_data(self, image: bytes) -> Receipt:
        response = self.client.models.generate_content(  # type: ignore
            model="gemini-2.5-flash-lite",
            contents=[
                types.Part.from_bytes(
                    data=image,
                    mime_type="image/jpeg",
                ),
                "Return is_valid: false if the data cannot be extracted or the image is not a receipt.",
                "Analyze this receipt image and extract the requested fields precisely.",
                "If items appear double-counted, only include them once in the items list, adjust quantity as necessary.",
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

        return Receipt(
            date=data.data.date,
            store_name=data.data.store_name,
            items=[
                ReceiptItem(
                    name=item.description,
                    price=int(item.price * 100),  # Convert dollars to cents
                    quantity=item.quantity,
                )
                for item in data.data.items
            ],
            total=data.data.total,
        )
