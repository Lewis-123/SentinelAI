import os


from sqlalchemy import create_engine


from sqlalchemy.orm import (

    sessionmaker,

    declarative_base

)



from backend.config import DATABASE_URL







# =====================================
# Database Configuration
# =====================================


connect_args = {}





# SQLite Development Mode

if DATABASE_URL.startswith(

    "sqlite"

):


    connect_args = {


        "check_same_thread": False


    }







# PostgreSQL Production Mode

elif DATABASE_URL.startswith(

    "postgres"

):


    connect_args = {


        "sslmode": "require"


    }









# =====================================
# Database Engine
# =====================================


engine = create_engine(


    DATABASE_URL,


    connect_args=connect_args,


    pool_pre_ping=True,


    pool_recycle=300


)









# =====================================
# Session Factory
# =====================================


SessionLocal = sessionmaker(


    autocommit=False,


    autoflush=False,


    bind=engine


)









# =====================================
# Base Model
# =====================================


Base = declarative_base()









# =====================================
# Database Dependency
# =====================================


def get_db():


    db = SessionLocal()


    try:


        yield db


    finally:


        db.close()