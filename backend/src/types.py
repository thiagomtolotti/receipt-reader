from dataclasses import dataclass
from datetime import datetime


@dataclass
class ReceiptDataItem:
    name: str
    price: int  # in cents
    quantity: int


@dataclass
class ReceiptData:
    date: datetime
    store_name: str
    items: list[ReceiptDataItem]
    total: int  # in cents
