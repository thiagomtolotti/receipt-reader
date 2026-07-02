from abc import ABC, abstractmethod
from typing import Type, TypeVar

from pydantic import BaseModel

T = TypeVar("T", bound=BaseModel)


class DocumentParser(ABC):
    @abstractmethod
    def parse_image(self, bytes: bytes, target_model: Type[T]) -> T:
        pass
