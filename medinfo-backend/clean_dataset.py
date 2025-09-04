import os
from PIL import Image

dataset_dir = r"C:\Users\pc\OneDrive\Masaüstü\MedInfo-main\medinfo-backend\dataset"

for root, dirs, files in os.walk(dataset_dir):
    for file in files:
        path = os.path.join(root, file)
        try:
            with Image.open(path) as img:
                img.verify()  # Görselin açılabilir olup olmadığını kontrol eder
        except Exception as e:
            print(f"Deleting broken image: {path} ({e})")
            try:
                os.remove(path)
            except PermissionError:
                print(f"Could not delete {path}, file in use.")
