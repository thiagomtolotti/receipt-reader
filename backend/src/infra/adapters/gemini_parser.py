from typing import Type, TypeVar

from google import genai
from pydantic import BaseModel, Field, TypeAdapter

from src.domain.interfaces import DocumentParser

T = TypeVar("T", bound=BaseModel)


class GeminiResponseSchema[T](BaseModel):
    is_valid: bool = Field(
        description="Set to True if the image corresponds to the expected document type."
    )
    data: T


class GeminiDocumentParser(DocumentParser):
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def parse_image(self, bytes: bytes, target_model: Type[T]) -> T:
        adapter = TypeAdapter(GeminiResponseSchema[target_model])

        response = self.client.models.generate_content(  # type: ignore
            model="gemini-2.5-flash",
            contents=[
                genai.types.Part.from_bytes(
                    data=bytes,
                    mime_type="image/jpeg",
                ),
            ],
            config=genai.types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=adapter.json_schema(),
                temperature=0.0,
            ),
        )

        parsed_data = adapter.validate_python(response.parsed)

        if not parsed_data.is_valid:
            raise ValueError(
                "The provided image does not correspond to the expected document type."
            )

        return parsed_data.data
