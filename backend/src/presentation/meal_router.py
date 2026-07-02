from fastapi import APIRouter, Depends, UploadFile

from src.application.meal import MealService
from src.dependencies import ai_repo, meal_service
from src.infra.ai_repository.types import AIRepository


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
        ai_repo: AIRepository = Depends(lambda: ai_repo),
    ):
        file_bytes = file.file.read()

        res = service.upload(file_bytes, ai_repo)

        return {"message": res}
