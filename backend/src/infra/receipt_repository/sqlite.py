import sqlite3
from datetime import datetime
from pathlib import Path
from uuid import UUID

from src.domain.receipt import Receipt, ReceiptItem

from .types import ReceiptRepository


class SQLiteReceiptRepository(ReceiptRepository):
    def __init__(self, db_path: Path):
        self._db_path = db_path

    def _get_connection(self):
        return sqlite3.connect(self._db_path)

    def save(self, data: Receipt):
        self._save_receipt(data)

        for item in data.items:
            self._save_item(data.id, item)

    def _save_receipt(self, receipt: Receipt):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                    INSERT INTO T001_RECEIPTS 
                        (id, date, store_name, total) 
                    VALUES 
                        (?, ?, ?, ?)
                """,
                (
                    str(receipt.id),
                    receipt.date.isoformat(),
                    receipt.store_name,
                    receipt.total,
                ),
            )
            conn.commit()

    def _save_item(self, receipt_id: UUID, item: ReceiptItem):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                    INSERT INTO T002_RECEIPT_ITEMS 
                        (id, receipt_id, name, price) 
                    VALUES 
                        (?, ?, ?, ?)
                """,
                (
                    str(item.id),
                    str(receipt_id),
                    item.name,
                    item.price,
                ),
            )
            conn.commit()

    def list_(self) -> list[Receipt]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT id, date, store_name, total FROM T001_RECEIPTS",
            )
            rows = cursor.fetchall()  # type: ignore

        res: list[Receipt] = []

        for row in rows:
            receipt_id = UUID(row[0])
            items = self._list_items(receipt_id)

            res.append(
                Receipt(
                    id=receipt_id,
                    date=datetime.fromisoformat(row[1]),
                    store_name=row[2],
                    total=row[3],
                    items=items,
                )
            )

        return res

    def _list_items(self, receipt_id: UUID) -> list[ReceiptItem]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT id, name, price FROM T002_RECEIPT_ITEMS WHERE receipt_id = ?",
                (str(receipt_id),),
            )
            rows = cursor.fetchall()  # type: ignore

        return [
            ReceiptItem(
                id=UUID(row[0]),
                name=row[1],
                price=row[2],
                quantity=1,
            )
            for row in rows
        ]
