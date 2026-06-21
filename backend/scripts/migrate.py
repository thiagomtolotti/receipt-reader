import sqlite3
from pathlib import Path

from src.constants import DB_PATH

MIGRATION_PATH = Path(__file__).parent / "sql" / "0001_db_up.sql"


def migrate():
    print("Migrating database...")

    conn = sqlite3.connect(DB_PATH)

    with open(MIGRATION_PATH, "r") as f:
        sql_script = f.read()

    with conn:
        cursor = conn.cursor()

        cursor.executescript(sql_script)

    print("Migration completed.")
