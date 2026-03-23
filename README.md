
# 🧪 Ingredient Hazard Detection App

An AI-powered mobile application that analyzes food and personal care products to detect harmful ingredients using barcode scanning and OCR.

---

## 🚀 Features

* 📷 **Barcode Scanning**

  * Fetches product data from OpenFoodFacts / OpenBeautyFacts
  * Extracts ingredient list automatically

* 🖼️ **OCR Image Scan**

  * Upload product image
  * Extract ingredients using OCR (EasyOCR)

* 🤖 **AI-Based Hazard Detection**

  * Detects:

    * Added Sugar
    * Preservatives
    * Artificial Colors
    * Emulsifiers
    * Processed Fats
    * Artificial Sweeteners
    * Flavor Enhancers

* 🧴 **Dual Mode Support**

  * Food Products
  * Personal Care Products

* ⚡ **Real-time Analysis**

  * FastAPI backend with Transformer models

---

## 🏗️ Tech Stack

* **Frontend:** React Native (Expo)
* **Backend:** FastAPI (Python)
* **ML Models:** DistilBERT (HuggingFace Transformers)
* **OCR:** EasyOCR
* **APIs:** OpenFoodFacts

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ingredient-hazard-detection.git
cd ingredient-hazard-detection
```

---

### 2️⃣ Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt
```

---

### 3️⃣ Run Backend Server

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

### 4️⃣ Frontend Setup

```bash
npm install
npx expo start
```

---

### 5️⃣ Configure API URL

Update:

```
constants/api.ts
```

```ts
const API_BASE_URL = "http://YOUR_IP:8000";
```

---

## 🔄 System Flow

1. User scans barcode OR uploads image
2. Ingredients extracted (API / OCR)
3. Text preprocessing
4. Passed to ML model
5. Risk analysis generated
6. Results displayed in app

---

## ⚠️ Notes

* Ensure phone and backend are on same network (for local testing)
* First model load may take time (downloads from HuggingFace)
  
---


## 📄 License

This project is for academic and research purposes.

