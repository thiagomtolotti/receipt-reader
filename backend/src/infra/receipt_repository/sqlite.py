import sqlite3
from pathlib import Path

from src.types import ReceiptData

from .types import ReceiptRepository


class SQLiteReceiptRepository(ReceiptRepository):
    def __init__(self, db_path: Path):
        self._db_path = db_path

    def _get_connection(self):
        return sqlite3.connect(self._db_path)

    def save(self, data: ReceiptData):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                    INSERT INTO receipts 
                        (id, amount, date) 
                    VALUES 
                        (?, ?, ?)
                """,
                (),
            )
            conn.commit()

    def get_all(self) -> list[ReceiptData]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, amount, date FROM receipts")
            rows = cursor.fetchall()  # type: ignore

        return []
