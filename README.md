# MedInfo 💊🩺

**MedInfo** is a modern web application that provides detailed information about medicines. Users can search for drugs by name or upload a photo of a pill/package to get comprehensive drug information, including ingredients, usage, side effects, and official documentation.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Search by drug name**: Instantly find drugs using generic or brand names.
- **Photo recognition**: Upload a pill/package image to identify the drug.
- **Detailed drug info**:
  - Active ingredients & excipients
  - Indications & usage
  - Dosage & administration
  - Side effects & warnings
  - Drug interactions
  - Official leaflets or PDF links
- **Interactive Q&A**: Ask natural language questions about drug safety and interactions.
- **Favorites & history**: Save frequently used drugs.
- **Mobile-friendly**: Fully responsive design.
- **Reliable sources**: Information verified from official health authorities.

---

## Demo

_Placeholder for live demo link (if deployed)_  
https://comprehensive-drug-i-e3pj.bolt.host/

---

## Tech Stack

- **Frontend**: React.js / Next.js, TailwindCSS  
- **Backend**: Node.js + Express.js (or Python Django/Flask)  
- **Database**: PostgreSQL or MongoDB  
- **AI Features**: Image recognition & NLP (e.g., via Bolt AI)  
- **Hosting**: Vercel / Netlify / AWS  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ozanefeozdemir/MedInfo.git
cd MedInfo
Install dependencies:

bash
Kopyala
Düzenle
npm install
Configure environment variables in a .env file:

ini
Kopyala
Düzenle
REACT_APP_API_KEY=your_bolt_ai_key
DATABASE_URL=your_database_url
Run the development server:

bash
Kopyala
Düzenle
npm run dev
Usage
Search drugs by typing the name.

Upload a drug image to identify it.

Ask questions using natural language about side effects or interactions.

Save favorites for easy reference.

Project Structure
csharp
Kopyala
Düzenle
MedInfo/
│
├─ backend/           # Server, APIs, database models
├─ frontend/          # React / Next.js UI
├─ public/            # Static files
├─ components/        # React components
├─ pages/             # Frontend pages
├─ utils/             # Helper functions
├─ README.md
└─ package.json
Contributing
Contributions are welcome!

Fork the repo

Create a branch: git checkout -b feature-name

Make your changes and commit: git commit -m "Add feature"

Push to the branch: git push origin feature-name

Open a pull request

License
This project is licensed under the MIT License. See the LICENSE file for details.