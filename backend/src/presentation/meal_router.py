from fastapi import APIRouter, Depends, UploadFile

from src.application.meal import MealService
from src.dependencies import document_parser, meal_service
from src.domain.interfaces import DocumentParser


class MealRouter(APIRouter):
    def __init__(self):
        super().__init__(prefix="/meal", tags=["meals"])

        self.add_api_route(
            "/upload",
            self.upload_image,
            methods=["POST"],
        )

    def upload_image(
        self,
        file: UploadFile,
        service: MealService = Depends(lambda: meal_service),
        document_parser: DocumentParser = Depends(lambda: document_parser),
    ):
        file_bytes = file.file.read()

        res = service.upload(file_bytes, document_parser)

        return {"message": res}
