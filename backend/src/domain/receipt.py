from dataclasses import dataclass, field
from datetime import datetime
from uuid import UUID, uuid4


@dataclass(frozen=True)
class ReceiptItemDTO:
    name: str
    price: int
    quantity: int


@dataclass(frozen=True)
class ReceiptDTO:
    date: str
    store_name: str
    items: list[ReceiptItemDTO]
    total: int


@dataclass(frozen=True)
class ReceiptItem:
    name: str
    price: int
    quantity: int
    id: UUID = field(default_factory=uuid4)

    @classmethod
    def from_dto(cls, dto: ReceiptItemDTO) -> "ReceiptItem":
        return cls(
            name=dto.name,
            price=dto.price,
            quantity=dto.quantity,
        )


@dataclass(frozen=True)
class Receipt:
    date: datetime
    store_name: str
    items: list[ReceiptItem]
    total: int
    id: UUID = field(default_factory=uuid4)

    @staticmethod
    def from_dto(dto: ReceiptDTO) -> "Receipt":
        items = [ReceiptItem.from_dto(item) for item in dto.items]

        return Receipt(
            date=datetime.fromisoformat(dto.date),
            store_name=dto.store_name,
            items=items,
            total=dto.total,
        )
