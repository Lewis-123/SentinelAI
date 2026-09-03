from fastapi import APIRouter, HTTPException


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




users = {}





@router.post("/register")

def register(

    user: UserCreate

):


    if user.username in users:

        raise HTTPException(

            status_code=400,

            detail="User already exists"

        )



    users[user.username] = {


        "username": user.username,


        "password":

        hash_password(

            user.password

        ),


        "role":

        user.role

    }



    return {

        "message":

        "User created"

    }





@router.post("/login")

def login(

    user: UserLogin

):


    stored_user = users.get(

        user.username

    )


    if not stored_user:


        raise HTTPException(

            status_code=401,

            detail="Invalid credentials"

        )




    if not verify_password(

        user.password,

        stored_user["password"]

    ):


        raise HTTPException(

            status_code=401,

            detail="Invalid credentials"

        )




    token = create_access_token({

        "sub":

        user.username,


        "role":

        stored_user["role"]

    })



    return {


        "access_token":

        token,


        "token_type":

        "bearer"

    }