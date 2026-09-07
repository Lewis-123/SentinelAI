from sqlalchemy import create_engine


from sqlalchemy.orm import (

    sessionmaker,

    declarative_base

)


from backend.config import DATABASE_URL







# =====================================
# Normalize Database URL
# =====================================


database_url = DATABASE_URL






# Render sometimes provides postgres://
# SQLAlchemy requires postgresql://


if database_url.startswith(

    "postgres://"

):


    database_url = database_url.replace(

        "postgres://",

        "postgresql://",

        1

    )









# =====================================
# Database Engine Configuration
# =====================================


connect_args = {}



engine_options = {

    "pool_pre_ping": True

}








# =====================================
# SQLite Development
# =====================================


if database_url.startswith(

    "sqlite"

):


    connect_args = {


        "check_same_thread": False


    }








# =====================================
# PostgreSQL Production
# =====================================


elif database_url.startswith(

    "postgresql"

):


    connect_args = {


        "sslmode": "require"


    }



    engine_options.update({


        "pool_size": 5,


        "max_overflow": 10,


        "pool_recycle": 300



    })









# =====================================
# Create Database Engine
# =====================================


engine = create_engine(



    database_url,



    connect_args=connect_args,



    **engine_options



)









# =====================================
# Database Sessions
# =====================================


SessionLocal = sessionmaker(



    autocommit=False,



    autoflush=False,



    bind=engine



)









# =====================================
# Declarative Base
# =====================================


Base = declarative_base()









# =====================================
# FastAPI Database Dependency
# =====================================


def get_db():



    db = SessionLocal()



    try:



        yield db



    finally:



        db.close()