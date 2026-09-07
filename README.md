# SentinelAI 🌍🤖

## AI-Powered Environmental Risk Intelligence Platform

SentinelAI is an artificial intelligence-powered environmental monitoring and early warning platform designed to predict, visualize, and analyze environmental risks across Kenya.

The platform combines **machine learning, satellite intelligence, weather data, geospatial mapping, and predictive analytics** to provide actionable insights for communities, organizations, and decision-makers.

---

# 🚀 Live Deployment

## Frontend

```
https://sentinelai-rho.vercel.app/
```

## Backend API

```
https://sentinelai-github-repo.onrender.com
```

## API Documentation

```
https://sentinelai-github-repo.onrender.com/docs
```

---

# 📌 Project Overview

Environmental risks such as droughts, floods, climate changes, and extreme weather events require faster and smarter decision-making.

SentinelAI provides:

- AI-based environmental risk prediction
- Interactive risk visualization maps
- Location-based environmental analysis
- Historical risk tracking
- Automated alerts
- Weather and satellite intelligence integration

The platform allows users to analyze Kenyan locations and receive risk assessments generated through machine learning models.

---

# ✨ Key Features

## 🤖 Artificial Intelligence Risk Prediction

- Machine learning classification model for environmental risk assessment
- Predicts risk levels:
  - Low Risk
  - Medium Risk
  - High Risk
- Provides confidence scores for predictions
- Uses environmental indicators for decision-making

---

## 🗺 Interactive Risk Intelligence Map

Built using Leaflet GIS technology.

Features:

- Kenya-wide environmental visualization
- Location risk markers
- Dynamic risk colors:
  - 🟢 Low
  - 🟡 Medium
  - 🔴 High
- Environmental information popups

Displayed information:

- Risk level
- Risk score
- Temperature
- Rainfall
- Humidity
- NDVI vegetation index
- AI confidence

---

## 📍 AI Location Analyzer

Users can search Kenyan locations and generate environmental assessments.

The analyzer provides:

- Location information
- County details
- Risk score
- Risk classification
- Confidence percentage
- Environmental factors

---

## 🚨 Risk Alerts

SentinelAI monitors environmental changes and generates alerts based on increasing risk levels.

Alert information includes:

- Location
- Previous risk status
- Current risk status
- Risk score
- Detection time

---

## 📊 Risk History Tracking

The system stores previous predictions for analysis.

Users can view:

- Historical predictions
- Risk changes
- Confidence levels
- Prediction dates

---

# 🏗 System Architecture


```
                    User Browser

                         |

                         |

              React + Tailwind Frontend

                         |

                         |

                  FastAPI Backend

                         |

        --------------------------------

        |              |               |

   Database     ML Prediction     Weather Data

        |              |

   SQLAlchemy     Risk Model

        |

   PostgreSQL / SQLite

```


---

# 🛠 Technology Stack


## Frontend

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type safety |
| Vite | Build system |
| Tailwind CSS | Styling |
| React Router | Navigation |
| Leaflet | Interactive maps |
| Recharts | Data visualization |


---

## Backend

| Technology | Purpose |
|---|---|
| FastAPI | REST API framework |
| Python | Backend language |
| SQLAlchemy | Database ORM |
| Pydantic | Data validation |
| JWT | Authentication |
| Uvicorn | API server |


---

## Machine Learning

| Technology | Purpose |
|---|---|
| Scikit-learn | ML algorithms |
| Pandas | Data processing |
| NumPy | Numerical computation |
| Pickle | Model storage |


---

## Deployment

| Platform | Service |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| GitHub | Source control |


---

# 📂 Project Structure


```
SentinelAI/

│

├── backend/

│   ├── api/

│   ├── auth/

│   ├── database/

│   ├── monitoring/

│   ├── services/

│   ├── machine_learning/

│   │     └── models/

│   │          └── risk_classifier.pkl

│   │

│   ├── config.py

│   ├── main.py

│   └── requirements.txt


│

├── frontend/

│   ├── src/

│   │   ├── auth/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── config.ts

│   │   └── App.tsx

│   │

│   ├── package.json

│   └── vite.config.ts


│

├── README.md

└── .gitignore

```

---

# ⚙️ Installation Guide

## Clone Repository

```bash
git clone https://github.com/Lewis-123/SentinelAI.git

cd SentinelAI
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:


Windows:

```bash
venv\Scripts\activate
```


Linux/Mac:

```bash
source venv/bin/activate
```


Install dependencies:

```bash
pip install -r requirements.txt
```

---

## Environment Variables

Create:

```
.env
```

Add:


```env
DATABASE_URL=sqlite:///./sentinelai.db

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

WEATHER_API_KEY=your_api_key

FRONTEND_URL=http://localhost:5173
```


---

## Run Backend


```bash
uvicorn backend.main:app --reload
```


Backend runs:

```
http://127.0.0.1:8000
```

---

# Frontend Setup


Navigate:

```bash
cd frontend
```


Install packages:

```bash
npm install
```


Create:

```
.env
```


Add:

```env
VITE_API_URL=http://127.0.0.1:8000
```


Run:

```bash
npm run dev
```


Frontend runs:

```
http://localhost:5173
```

---

# 🔐 Authentication

SentinelAI uses JWT authentication.

Features:

- User registration
- Secure login
- Protected dashboard routes
- Token-based API access

---

# 📡 API Endpoints


## Health Check

```
GET /health
```


## Authentication


Register:

```
POST /auth/register
```


Login:

```
POST /auth/login
```


## Risk Analysis


Analyze location:

```
GET /analyze/{location}
```


## Risk Map


```
GET /risk-map
```


## Alerts


```
GET /alerts
```


## History


```
GET /history/
```


---

# 🧠 Machine Learning Model

The prediction engine uses a trained classification model:

```
risk_classifier.pkl
```

The model analyzes environmental variables including:

- Temperature
- Rainfall
- Humidity
- Vegetation index
- Historical environmental patterns


The output includes:

```
Risk Level
Risk Score
Prediction Confidence
```

---

# 🔒 Security Features

Implemented security measures:

- JWT authentication
- Protected API routes
- Environment-based configuration
- CORS protection
- Password hashing
- Secure secret management


---

# 🚀 Future Improvements

Planned enhancements:

- Real-time satellite imagery integration
- Deep learning forecasting models
- Mobile application
- SMS emergency alerts
- IoT sensor integration
- Advanced climate prediction models
- PostgreSQL production database
- Automated model retraining pipeline


---

# 👨‍💻 Author

**Lewis**

SentinelAI Environmental Intelligence Platform


---

# 📄 License

This project is developed for educational and research purposes.
