🧬 MedInfo

MedInfo is a web-based application designed to manage and provide comprehensive information about medications.
The system allows users to quickly search for drugs, active ingredients, brand names, and excipients, making medical information easily accessible.

🚀 Features

🔍 Drug Search: Search by drug name, active ingredient, or brand name.

📋 Drug Details: View active ingredients, excipients, and brand names.

🌐 Responsive UI: Clean and modern interface built with React.

⚙️ Backend API: RESTful API built with Express.js for fast and reliable data access.

🗄 Database: MongoDB for scalable and flexible data storage.

🛠 Future Enhancements:

User registration and login system

Favorite drug lists

Admin panel for pharmacists or doctors

🏗 Technologies
Layer	Technologies
Frontend	React, Bootstrap / TailwindCSS
Backend	Node.js, Express.js, REST API
Database	MongoDB
Tools	Git, GitHub, Postman
⚡ Getting Started
1. Clone the repository
git clone https://github.com/ozanefeozdemir/MedInfo.git
cd MedInfo

2. Backend Setup
cd backend
npm install
npm start


The server will run at http://localhost:5000 by default.

3. Frontend Setup
cd frontend
npm install
npm start


The React app will run at http://localhost:3000.

📁 Project Structure
MedInfo/
├─ frontend/       # React application
├─ backend/        # Express API server
├─ README.md       # Project documentation
└─ .gitignore

📝 API Endpoints

GET /api/drugs – List all drugs

GET /api/drugs/:id – Get details of a specific drug

POST /api/drugs – Add a new drug (Admin)

PUT /api/drugs/:id – Update drug details (Admin)

DELETE /api/drugs/:id – Delete a drug (Admin)

👨‍💻 Contributing

Fork the repository

Create a new branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m "Add some feature")

Push to the branch (git push origin feature/your-feature)

Create a Pull Request

📄 License

This project is licensed under the MIT License.
