from fastapi import APIRouter, Depends, UploadFile

from src.application.meal import MealService
from src.dependencies import meal_service
from src.domain.meal import Meal, MealDTO


class MealRouter(APIRouter):
    def __init__(self):
        super().__init__(prefix="/meal", tags=["meals"])

        self.add_api_route(
            "/upload",
            self.upload_image,
            methods=["POST"],
            response_model=MealDTO,
        )

    def upload_image(
        self,
        file: UploadFile,
        service: MealService = Depends(lambda: meal_service),
    ):
        file_bytes = file.file.read()

        res = service.upload(file_bytes)

        return Meal.to_dto(res)
