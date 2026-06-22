from typing import Any

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from scripts.migrate import migrate

from src.constants import DB_PATH
from src.infra.ai_repository.gemini import InvalidReceiptError
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


def invalid_receipt_exception_handler(_: Any, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"detail": str(exc)},
    )


app.add_exception_handler(InvalidReceiptError, invalid_receipt_exception_handler)
