# 🧬 MedInfo

**MedInfo** is a web-based application that provides comprehensive drug information and recognition.  
It allows users to search for drugs, active ingredients, brand names, and excipients, and also includes a **drug recognition model** trained to identify medications from images.

---

## 🚀 Features

- 🔍 **Drug Search**: Search by drug name, active ingredient, or brand name.  
- 📋 **Drug Details**: View active ingredients, excipients, and brand names.  
- 📷 **Drug Recognition**: Upload an image of a pill or packaging and let the trained model predict the drug.  
- 🌐 **Responsive UI**: Modern and user-friendly interface built with React.  
- ⚙️ **Backend API**: Express.js RESTful API for fast data access.  
- 🗄 **Database**: MongoDB for scalable and flexible storage.  

---

## 🏗 Technologies

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React, Bootstrap |
| **Backend** | Node.js, Express.js, REST API |
| **Database** | MongoDB |
| **Machine Learning** | PyTorch, torchvision (for drug recognition model) |
| **Tools** | Git, GitHub, Postman |

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ozanefeozdemir/MedInfo.git
cd MedInfo
2. Backend Setup
bash
Kodu kopyala
cd backend
npm install
npm start
The server will run at http://localhost:5000.

3. Frontend Setup
bash
Kodu kopyala
cd frontend
npm install
npm start
The React app will run at http://localhost:3000.

🧠 Drug Recognition Model
The project includes a deep learning model trained to identify drugs from images.

Framework: PyTorch

Dataset: Images of pills and packaging (preprocessed with torchvision transforms)

Usage: Upload an image through the frontend → The backend sends it to the model → Model predicts the drug and returns details.

This allows users to identify drugs visually, which is especially helpful for pharmacists and healthcare providers.

📁 Project Structure
graphql
Kodu kopyala
MedInfo/
├─ frontend/       # React application
├─ backend/        # Express API server + ML model
├─ model/          # Trained PyTorch drug recognition model
├─ dataset/        # Images used for training/testing
├─ README.md       # Project documentation
└─ .gitignore
📝 API Endpoints
GET /api/drugs – List all drugs

GET /api/drugs/:id – Get details of a specific drug

POST /api/drugs – Add a new drug (Admin)

PUT /api/drugs/:id – Update drug details (Admin)

DELETE /api/drugs/:id – Delete a drug (Admin)

POST /api/drugs/recognize – Upload an image and get predicted drug

👨‍💻 Contributing
Fork the repository

Create a new branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m "Add some feature")

Push to the branch (git push origin feature/your-feature)

Create a Pull Request

📄 License
This project is licensed under the MIT License.
