import os
from icrawler.builtin import GoogleImageCrawler

# İlaç isimleri
drug_names = [
    "Amoxicillin", "Ibuprofen", "Omeprazole",
    "Cetirizine", "Metformin", "Atorvastatin", "Salbutamol",
    "Ranitidine", "Amlodipine", "Levothyroxine"
]

# Ana klasör
root_dir = r"C:\Users\pc\OneDrive\Masaüstü\MedInfo-main\medinfo-backend\dataset"

# Her ilaç için görselleri indir
for drug in drug_names:
    drug_dir = os.path.join(root_dir, drug)
    os.makedirs(drug_dir, exist_ok=True)  # Klasör yoksa oluştur
    crawler = GoogleImageCrawler(storage={'root_dir': drug_dir})
    crawler.crawl(keyword=f'{drug} medicine pill', max_num=50)
    print(f"Downloaded images for {drug} into {drug_dir}")
    # İndirme işlemi tamamlandığında bilgi ver
    print(f"Completed downloading images for {drug}")