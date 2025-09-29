# 🧠 Type → Subcategory AI Post Description Generator (Spring Boot + React + Gemini 2.0)

A minimal full-stack app that turns **Type** (service/product/property) + **Subcategory** (e.g., Car Wash) into a polished **40–50-word** marketing paragraph.  
Backend calls **Gemini 2.0**; your API key stays **server-side**. Frontend is a clean Vite React UI.

---

## 📸 Live Demo Screenshot
<img width="706" height="672" alt="image" src="https://github.com/user-attachments/assets/0a8a0ff6-bfc5-4f1a-bbdb-da6914e9146d" />


---

## 🚀 Features

- ✍️ Generates **one tight paragraph (50–100 words)** from minimal inputs
- 🎛️ Presets for **Tone** (Professional/Friendly/Luxury/Youthful) & **Angle** (Quality/Value/Speed/Trust/Offer/Urgency)
- 🔒 **Backend-only** API key (never exposed to the browser)
- 🧪 **Diagnostics** endpoint to verify key visibility
- 🧯 Helpful error messages (e.g., `Gemini HTTP 401/404`)

---

## 🧰 Tech Stack

| Layer      | Tech                                  |
|------------|---------------------------------------|
| Frontend   | React (Vite, JavaScript)              |
| Backend    | Spring Boot (Java 17+), OkHttp, Jackson |
| AI Model   | Gemini **2.0 Flash** (`gemini-2.0-flash`) |
| Dev Ports  | Frontend **5173**, Backend **8081**   |

---

## 📂 Project Structure

AI-description-demo/
├── backend/
│ ├── pom.xml
│ └── src/
│ └── main/
│ ├── java/com/example/backend/
│ │ ├── BackendApplication.java
│ │ ├── config/CorsConfig.java
│ │ ├── api/
│ │ │ ├── GenerateRequest.java
│ │ │ ├── GenerateResponse.java
│ │ │ ├── GenerateController.java
│ │ │ └── GlobalErrors.java
│ │ └── gemini/GeminiClient.java
│ └── resources/application.properties
├── frontend/
│ ├── .env
│ ├── index.html
│ ├── package.json
│ ├── vite.config.js
│ └── src/
│ ├── main.jsx
│ ├── App.jsx
│ └── index.css
├── screenshot.png # optional UI screenshot
└── README.md
---
## ⚙️ Setup Instructions

### 1️⃣ Backend: Spring Boot (port **8081**)

**Requirements:** Java 17+, Maven (wrapper included)

# Windows PowerShell (set the key for THIS terminal):
$env:GEMINI_API_KEY = "YOUR_REAL_GEMINI_KEY"

# macOS / Linux:
export GEMINI_API_KEY="YOUR_REAL_GEMINI_KEY"

cd backend
./mvnw spring-boot:run         # Windows: .\mvnw.cmd spring-boot:run

Frontend: React (Vite, JavaScript)

Requirements: Node.js 18+ (or 20+)

cd frontend
# point UI to your backend URL/port
echo "VITE_API_BASE=http://localhost:8081" > .env

npm install
npm run dev

🖱️ Usage

Select Type: service | product | property
Enter Subcategory (e.g., Car Wash, Phone Repair, House for Rent)
Pick Tone & Angle
Click Generate → get a 40–50-word paragraph
Minimal mode: the prompt forbids inventing price/time/location since you didn’t supply them.

License
MIT — feel free to use, modify, and ship.

👨‍⚕️ Author
Darko Six_Nimesh Tharaka
AI Engineer | Data Science | Exploring AI, Machine Learning, and Big Data
📧 Gmail-bandaranayakanimesh@gmail.com
🌐 Portfolio-
🔗 LinkedIn-www.linkedin.com/in/nimesh-bandaranayake-0a2912304
