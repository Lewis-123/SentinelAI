from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session


from backend.database.database import get_db

from backend.database.models import User


from backend.auth.models import (
    UserCreate,
    UserLogin
)


from backend.auth.security import (
    hash_password,
    verify_password,
    create_access_token
)





router = APIRouter(

    prefix="/auth",

    tags=["Authentication"]

)







# =====================================
# Register User
# =====================================

@router.post("/register")
def register(

    user: UserCreate,

    db: Session = Depends(get_db)

):


    existing_user = db.query(User).filter(

        User.username == user.username

    ).first()



    if existing_user:


        raise HTTPException(

            status_code=400,

            detail="Username already exists"

        )





    new_user = User(

        username=user.username,

        password=hash_password(

            user.password

        ),

        role=user.role

    )





    db.add(new_user)

    db.commit()

    db.refresh(new_user)





    return {


        "message":

        "User created successfully",



        "username":

        new_user.username,



        "role":

        new_user.role

    }








# =====================================
# Login User
# =====================================

@router.post("/login")
def login(

    user: UserLogin,

    db: Session = Depends(get_db)

):


    database_user = db.query(User).filter(

        User.username == user.username

    ).first()




    if database_user is None:


        raise HTTPException(

            status_code=401,

            detail="Invalid username or password"

        )






    password_valid = verify_password(

        user.password,

        database_user.password

    )





    if not password_valid:


        raise HTTPException(

            status_code=401,

            detail="Invalid username or password"

        )







    token = create_access_token(

        {


            "sub":

            database_user.username,



            "role":

            database_user.role

        }

    )






    return {


        "access_token":

        token,



        "token_type":

        "bearer",



        "user": {


            "username":

            database_user.username,



            "role":

            database_user.role

        }

    }