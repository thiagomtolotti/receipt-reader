from fastapi import APIRouter, UploadFile


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
    ):
        return {"message": f"Image {file.filename} uploaded successfully"}
