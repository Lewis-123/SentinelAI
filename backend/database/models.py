from sqlalchemy import Column, Integer, String, DateTime

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