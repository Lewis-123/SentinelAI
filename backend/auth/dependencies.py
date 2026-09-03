from fastapi import Depends, HTTPException, status

from fastapi.security import OAuth2PasswordBearer

from jose import jwt, JWTError


from backend.auth.security import (
    SECRET_KEY,
    ALGORITHM
)



oauth2_scheme = OAuth2PasswordBearer(

    tokenUrl="/auth/login"

)





def get_current_user(

    token: str = Depends(oauth2_scheme)

):


    credentials_exception = HTTPException(

        status_code=status.HTTP_401_UNAUTHORIZED,

        detail="Invalid authentication token"

    )



    try:


        payload = jwt.decode(

            token,

            SECRET_KEY,

            algorithms=[ALGORITHM]

        )



        username = payload.get(

            "sub"

        )



        role = payload.get(

            "role"

        )



        if username is None:


            raise credentials_exception




        return {


            "username": username,

            "role": role

        }




    except JWTError:


        raise credentials_exception