import sqlite3
from datetime import datetime
from pathlib import Path

from src.domain.receipt import Receipt

from .types import ReceiptRepository


class SQLiteReceiptRepository(ReceiptRepository):
    def __init__(self, db_path: Path):
        self._db_path = db_path

    def _get_connection(self):
        return sqlite3.connect(self._db_path)

    def save(self, data: Receipt):
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
                    str(data.id),
                    data.date.isoformat(),
                    data.store_name,
                    data.total,
                ),
            )
            conn.commit()

    def get_all(self) -> list[Receipt]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT id, date, store_name, total FROM T001_RECEIPTS",
            )
            rows = cursor.fetchall()  # type: ignore

        return [
            Receipt(
                id=row[0],
                date=datetime.fromisoformat(row[1]),
                store_name=row[2],
                total=row[3],
                items=[],
            )
            for row in rows
        ]
