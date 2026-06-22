from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scripts.migrate import migrate

from src.constants import DB_PATH
from src.presentation.receipt_router import ReceiptRouter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if not DB_PATH.exists():
    migrate()


@app.get("/")
def ping():
    return {"message": "Receipt service is alive!"}


receipt_router = ReceiptRouter()
app.include_router(receipt_router)
