from dataclasses import dataclass, field
from datetime import datetime
from uuid import UUID, uuid4


@dataclass(frozen=True)
class ReceipItem:
    name: str
    price: int
    quantity: int
    id: UUID = field(default_factory=uuid4)


@dataclass(frozen=True)
class Receipt:
    date: datetime
    store_name: str
    items: list[ReceipItem]
    total: int
    id: UUID = field(default_factory=uuid4)
