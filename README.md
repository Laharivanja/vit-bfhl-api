# VIT BFHL API 🚀

A simple **Node.js + Express** based REST API built for the **Bajaj Finserv Health Limited (BFHL) Assignment**.  
This API processes input data, separates numbers and alphabets, and returns structured responses in JSON format.

---

## 📌 Features
- ✅ REST API with Express
- ✅ Handles **GET** and **POST** requests
- ✅ Classifies input data into:
  - Numbers
  - Alphabets
- ✅ Returns results in clean JSON format

---

## ⚙️ Tech Stack
- **Node.js**
- **Express.js**
- **Body-parser / JSON Handling**
- **cURL / Postman** for testing

---

## 📂 Project Structure
```
vit-bfhl-api/
│── server.js       # Main entry point
│── package.json    # Dependencies & scripts
│── .gitignore      # Ignored files
```

---

## ▶️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/vit-bfhl-api.git
cd vit-bfhl-api
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run the Server
```bash
node server.js
```

Server will start on:  
```
http://localhost:3000
```

---

## 📡 API Endpoints

### **GET /**
Test endpoint to check if API is running.  
```bash
curl http://localhost:3000/
```
**Response:**
```json
{
  "status": "ok",
  "message": "VIT BFHL API running. Use POST /bfhl."
}
```

---

### **POST /bfhl**
Processes the input JSON and separates **numbers** and **alphabets**.

**Request Example:**
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data":["a","1","334","4","R","$"]}'
```

**Response Example:**
```json
{
  "is_success": true,
  "user_id": "yourname_ddmmyyyy",
  "numbers": ["1","334","4"],
  "alphabets": ["a","R"]
}
```

---

## 👨‍💻 Author
- **Your Name** ([@yourgithub](https://github.com/yourgithub))  

---

## 📜 License
This project is licensed under the **MIT License**.
