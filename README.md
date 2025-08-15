# Health-Assistant
Book Appointment in your nearby hospitals , and as an admin , add your hospital. More than that , predict disease based on your symptoms and get treatment based on your disease. A well functioning website , connecting both hospitals and users. IT IS JUST A PROTOTYPE , NO VERIFICARION PROCESS FOR HOSPITALS HAS BEEN ADDED YET.
# Health Assistant

**Health Assistant** is a full-stack health recommendation system built using **MERN (MongoDB, Express, React, Node.js)** for the frontend/backend and **Flask + Machine Learning** for symptom-based disease prediction and treatment suggestions. Users can input symptoms to get possible diseases and recommended treatments, while the system can be extended to include hospital search, health checkups, and more.

---

## **Features**

- Predict diseases based on user-inputted symptoms.
- Suggest treatments for diseases using ML embeddings and similarity scoring.
- MERN stack frontend for user interaction.
- Flask backend serving ML models via REST API.
- Easy to extend with hospital management and health checkup recommendations.

---

## **Project Structure**


Health-Assistant/
├── backend/ # Flask + ML backend
│ ├── app.py
│ ├── train_models.py
│ ├── rf_disease_model_health.pkl
│ ├── label_encoder_health.pkl
│ ├── feature_names_health.pkl
│ ├── disease_treatment_model.pkl
│ ├── datasets/
│ ├── requirements.txt
│ └── .env
├── frontend/ # React frontend
│ ├── package.json
│ ├── src/
│ └── public/
├── .gitignore
└── LICENSE

yaml
Copy
Edit

---

## **Getting Started**

### **Prerequisites**
- Python 3.8+  
- Node.js & npm  
- MongoDB (local or cloud)  

---

### **Backend Setup (Flask + ML)**
1. Navigate to backend folder:
```bash
cd backend
Create a virtual environment and activate it:

bash
Copy
Edit
python -m venv venv
source venv/bin/activate      # Linux/Mac
venv\Scripts\activate         # Windows
Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Run the Flask server:

bash
Copy
Edit
python app.py
Frontend Setup (React)
Navigate to frontend folder:

bash
Copy
Edit
cd frontend
Install dependencies:

bash
Copy
Edit
npm install
Run the React app:

bash
Copy
Edit
npm start
Environment Variables
Create a .env file in backend/ with required keys:

ini
Copy
Edit
MONGO_URI=your_mongodb_uri
SECRET_KEY=your_secret_key
API_KEY=your_api_key
You can use .env.example as a template.

Usage
Open the frontend in the browser.

Input symptoms and get disease predictions.

Retrieve suggested treatments from the backend API.

License
This project is licensed under the MIT License. See LICENSE for details.

Acknowledgements
Flask for the backend API

React for the frontend

scikit-learn & Sentence-Transformers for ML

yaml
Copy
Edit

---


