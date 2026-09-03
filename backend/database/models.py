from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime
)

from datetime import datetime


from backend.database.connection import Base




class Alert(Base):


    __tablename__ = "alerts"



    id = Column(

        Integer,

        primary_key=True,

        index=True

    )


    location = Column(

        String

    )


    risk_level = Column(

        String

    )


    severity = Column(

        String

    )


    message = Column(

        String

    )


    timestamp = Column(

        DateTime,

        default=datetime.utcnow

    )






class PredictionHistory(Base):


    __tablename__ = "prediction_history"



    id = Column(

        Integer,

        primary_key=True,

        index=True

    )



    risk_level = Column(

        String

    )



    confidence = Column(

        Float

    )



    rainfall = Column(

        Float

    )



    temperature = Column(

        Float

    )



    humidity = Column(

        Float

    )



    population = Column(

        Integer

    )



    density = Column(

        Float

    )



    poverty_rate = Column(

        Float

    )



    timestamp = Column(

        DateTime,

        default=datetime.utcnow

    )