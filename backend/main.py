from fastapi import FastAPI, UploadFile

app = FastAPI()

@app.get("/")
def ping():
    return {"message": "Service is alive!"}

@app.post("/receipt")
def upload_receipt(file: UploadFile):
    print(f"Received file: {file.filename}")
    
    return {"message": f"File '{file.filename}' uploaded successfully!"}