from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    Boolean
)


from datetime import datetime


from backend.database.database import Base





# =====================================
# Users Table
# =====================================

class User(Base):

    __tablename__ = "users"



    id = Column(

        Integer,

        primary_key=True,

        index=True

    )



    username = Column(

        String,

        unique=True,

        index=True,

        nullable=False

    )



    password = Column(

        String,

        nullable=False

    )



    role = Column(

        String,

        default="community"

    )



    created_at = Column(

        DateTime,

        default=datetime.utcnow

    )







# =====================================
# Risk Prediction History Table
# =====================================

class RiskPrediction(Base):

    __tablename__ = "risk_predictions"



    id = Column(

        Integer,

        primary_key=True,

        index=True

    )



    location = Column(

        String,

        nullable=False

    )



    risk_level = Column(

        String,

        nullable=False

    )



    risk_score = Column(

        Float,

        nullable=False

    )



    confidence = Column(

        Float,

        nullable=True

    )



    temperature = Column(

        Float,

        nullable=True

    )



    rainfall = Column(

        Float,

        nullable=True

    )



    humidity = Column(

        Float,

        nullable=True

    )



    ndvi = Column(

        Float,

        nullable=True

    )



    rainfall_anomaly = Column(

        Float,

        nullable=True

    )



    created_at = Column(

        DateTime,

        default=datetime.utcnow

    )







# =====================================
# Alerts Table
# =====================================

class Alert(Base):

    __tablename__ = "alerts"



    id = Column(

        Integer,

        primary_key=True,

        index=True

    )



    location = Column(

        String,

        nullable=False

    )



    previous_risk = Column(

        String,

        nullable=True

    )



    current_risk = Column(

        String,

        nullable=False

    )



    risk_score = Column(

        Float,

        nullable=False

    )



    message = Column(

        String,

        nullable=False

    )



    resolved = Column(

        Boolean,

        default=False

    )



    created_at = Column(

        DateTime,

        default=datetime.utcnow

    )







# =====================================
# Notification History Table
# =====================================

class Notification(Base):

    __tablename__ = "notifications"



    id = Column(

        Integer,

        primary_key=True,

        index=True

    )



    user = Column(

        String,

        nullable=True

    )



    notification_type = Column(

        String,

        nullable=False

    )



    message = Column(

        String,

        nullable=False

    )



    sent = Column(

        Boolean,

        default=False

    )



    created_at = Column(

        DateTime,

        default=datetime.utcnow

    )