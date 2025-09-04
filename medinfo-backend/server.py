from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pymongo import MongoClient
import io
import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image

app = FastAPI()

# ✅ Modeli yükle (örnek: ResNet50 fine-tuned)
model = torch.load("drug_model.pth", map_location=torch.device("cpu"))
model.eval()

# ✅ Sınıf isimleri (dataset'te eğittiğiniz ilaç isimleri)
client = MongoClient("mongodb://localhost:27017/")
db = client["medinfo"]
collection = db["drugs"]
CLASS_NAMES = [doc["drug_name"] for doc in collection.find({}, {"drug_name": 1, "_id": 0})]

# ✅ Görüntü ön işleme
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

@app.post("/predict")
async def predict(request: Request):
    try:
        body = await request.body()
        image = Image.open(io.BytesIO(body)).convert("RGB")
        img_tensor = transform(image).unsqueeze(0)

        with torch.no_grad():
            outputs = model(img_tensor)
            _, predicted = torch.max(outputs, 1)
            drug_name = CLASS_NAMES[predicted.item()]

        return JSONResponse(content={"drug_name": drug_name})

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=6000)
