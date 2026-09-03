from sqlalchemy import Column, Integer, String, Float, DateTime

from datetime import datetime


from backend.database.database import Base





class User(Base):

    __tablename__ = "users"


    id = Column(

        Integer,

        primary_key=True,

        index=True

    )


    username = Column(

        String,

        unique=True

    )


    password = Column(

        String

    )


    role = Column(

        String,

        default="community"

    )






class RiskPrediction(Base):

    __tablename__ = "risk_predictions"


    id = Column(

        Integer,

        primary_key=True

    )


    location = Column(

        String

    )


    risk_level = Column(

        String

    )


    risk_score = Column(

        Float

    )


    confidence = Column(

        Float

    )


    created_at = Column(

        DateTime,

        default=datetime.utcnow

    )







class Alert(Base):

    __tablename__ = "alerts"


    id = Column(

        Integer,

        primary_key=True

    )


    location = Column(

        String

    )


    message = Column(

        String

    )


    risk_score = Column(

        Float

    )


    created_at = Column(

        DateTime,

        default=datetime.utcnow

    )